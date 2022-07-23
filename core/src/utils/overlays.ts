import { HTMLGascoOverlayElement } from "./overlays-interface";

import type { OverlayInterface } from "./overlays-interface";
import { getElementRoot, focusElement, componentOnReady, addEventListener, removeEventListener } from '../utils/helpers';
import type {
  Animation,
  AnimationBuilder,
  BackButtonEvent,
  ToastOptions,
} from '../interface';
// import { GascoConfig } from "./config";

export const activeAnimations = new WeakMap<OverlayInterface, Animation[]>();

let lastId = 0;
const OVERLAY_BACK_BUTTON_PRIORITY = 100;

const createController = <Opts extends object, HTMLElm>(tagName: string) => {
  return {
    create(options: Opts): Promise<HTMLElm> {
      return createOverlay(tagName, options) as any;
    },
    dismiss(data?: any, role?: string, id?: string) {
      return dismissOverlay(document, data, role, tagName, id);
    },
    async getTop(): Promise<HTMLElm | undefined> {
      return getOverlay(document, tagName) as any;
    },
  };
};

export const toastController = /*@__PURE__*/ createController<ToastOptions, HTMLGascoToastElement>('gasco-toast');

export const dismiss = async (
  overlay: OverlayInterface,
  data: any | undefined,
  role: string | undefined,
  // name: keyof GascoConfig,
  LeaveAnimation: AnimationBuilder,
  opts?: any
): Promise<boolean> => {
  if (!overlay.presented) {
    return false;
  }

  setRootAriaHidden(false);

  overlay.presented = false;

  try {
    // Overlay contents should not be clickable during dismiss
    overlay.el.style.setProperty('pointer-events', 'none');
    overlay.willDismiss.emit({ data, role });
    overlay.willDismissShorthand?.emit({ data, role });

    const animationBuilder = overlay.leaveAnimation && LeaveAnimation
    // If dismissed via gesture, no need to play leaving animation again
    if (role !== 'gesture') {
      await overlayAnimation(overlay, animationBuilder, overlay.el, opts);
    }
    overlay.didDismiss.emit({ data, role });
    overlay.didDismissShorthand?.emit({ data, role });

    activeAnimations.delete(overlay);

    /**
     * Make overlay hidden again in case it is being reused.
     * We can safely remove pointer-events: none as
     * overlay-hidden will set display: none.
     */
    overlay.el.classList.add('overlay-hidden');
    overlay.el.style.removeProperty('pointer-events');
  } catch (err) {
    console.error(err);
  }

  overlay.el.remove();
  return true;
};

export const setRootAriaHidden = (hidden = false) => {
  const root = getAppRoot(document);
  const viewContainer = root.querySelector('gasco-router-outlet, gasco-nav');

  if (!viewContainer) {
    return;
  }

  if (hidden) {
    viewContainer.setAttribute('aria-hidden', 'true');
  } else {
    viewContainer.removeAttribute('aria-hidden');
  }
};

const overlayAnimation = async (
  overlay: OverlayInterface,
  animationBuilder: AnimationBuilder,
  baseEl: any,
  opts: any
): Promise<boolean> => {
  // Make overlay visible in case it's hidden
  baseEl.classList.remove('overlay-hidden');

  const aniRoot = overlay.el;
  const animation = animationBuilder(aniRoot, opts);

  if (overlay.keyboardClose) {
    animation.beforeAddWrite(() => {
      const activeElement = baseEl.ownerDocument!.activeElement as HTMLElement;
      if (activeElement?.matches('input,gasco-input')) {
        activeElement.blur();
      }
    });
  }

  const activeAni = activeAnimations.get(overlay) || [];
  activeAnimations.set(overlay, [...activeAni, animation]);

  await animation.play();

  return true;
};


export const eventMethod = <T>(element: HTMLElement, eventName: string): Promise<T> => {
  let resolve: (detail: T) => void;
  const promise = new Promise<T>((r) => (resolve = r));
  onceEvent(element, eventName, (event: any) => {
    resolve(event.detail);
  });
  return promise;
};

export const onceEvent = (element: HTMLElement, eventName: string, callback: (ev: Event) => void) => {
  const handler = (ev: Event) => {
    removeEventListener(element, eventName, handler);
    callback(ev);
  };
  addEventListener(element, eventName, handler);
};

export const isCancel = (role: string | undefined): boolean => {
  return role === 'cancel' || role === BACKDROP;
};

export const present = async (
  overlay: OverlayInterface,
  // name: keyof GascoConfig,
  EnterAnimation: AnimationBuilder,
  opts?: any
) => {
  if (overlay.presented) {
    return;
  }

  setRootAriaHidden(true);

  overlay.presented = true;
  overlay.willPresent.emit();
  overlay.willPresentShorthand?.emit();

  // get the user's animation fn if one was provided
  const animationBuilder = overlay.enterAnimation && EnterAnimation;

  const completed = await overlayAnimation(overlay, animationBuilder, overlay.el, opts);
  if (completed) {
    overlay.didPresent.emit();
    overlay.didPresentShorthand?.emit();
  }

  /**
   * When an overlay that steals focus
   * is dismissed, focus should be returned
   * to the element that was focused
   * prior to the overlay opening. Toast
   * does not steal focus and is excluded
   * from returning focus as a result.
   */
  if (overlay.el.tagName !== 'GASCO-TOAST') {
    focusPreviousElementOnDismiss(overlay.el);
  }

  /**
   * If the focused element is already
   * inside the overlay component then
   * focus should not be moved from that
   * to the overlay container.
   */
  if (overlay.keyboardClose && (document.activeElement === null || !overlay.el.contains(document.activeElement))) {
    overlay.el.focus();
  }
};

const focusPreviousElementOnDismiss = async (overlayEl: any) => {
  let previousElement = document.activeElement as HTMLElement | null;
  if (!previousElement) {
    return;
  }

  const shadowRoot = previousElement?.shadowRoot;
  if (shadowRoot) {
    // If there are no inner focusable elements, just focus the host element.
    previousElement = shadowRoot.querySelector(focusableQueryString) || previousElement;
  }

  await overlayEl.onDidDismiss();
  previousElement.focus();
};

export const createOverlay = <T extends HTMLGascoOverlayElement>(
  tagName: string,
  opts: object | undefined
): Promise<T> => {
  if (typeof window !== 'undefined' && typeof window.customElements !== 'undefined') {
    return window.customElements.whenDefined(tagName).then(() => {
      const element = document.createElement(tagName) as HTMLGascoOverlayElement;
      element.classList.add('overlay-hidden');

      /**
       * Convert the passed in overlay options into props
       * that get passed down into the new overlay.
       */
      Object.assign(element, { ...opts, hasController: true });

      // append the overlay element to the document body
      getAppRoot(document).appendChild(element);

      return new Promise((resolve) => componentOnReady(element, resolve));
    });
  }
  return Promise.resolve() as any;
};

const getAppRoot = (doc: Document) => {
  return doc.querySelector('gasco-app') || doc.body;
};

export const focusFirstDescendant = (ref: Element, overlay: HTMLGascoOverlayElement) => {
  let firstInput = ref.querySelector(focusableQueryString) as HTMLElement | null;

  const shadowRoot = firstInput?.shadowRoot;
  if (shadowRoot) {
    // If there are no inner focusable elements, just focus the host element.
    firstInput = shadowRoot.querySelector(focusableQueryString) || firstInput;
  }

  if (firstInput) {
    focusElement(firstInput);
  } else {
    // Focus overlay instead of letting focus escape
    overlay.focus();
  }
};

const isOverlayHidden = (overlay: Element) => overlay.classList.contains('overlay-hidden');

const focusLastDescendant = (ref: Element, overlay: HTMLGascoOverlayElement) => {
  const inputs = Array.from(ref.querySelectorAll(focusableQueryString)) as HTMLElement[];
  let lastInput = inputs.length > 0 ? inputs[inputs.length - 1] : null;

  const shadowRoot = lastInput?.shadowRoot;
  if (shadowRoot) {
    // If there are no inner focusable elements, just focus the host element.
    lastInput = shadowRoot.querySelector(focusableQueryString) || lastInput;
  }

  if (lastInput) {
    lastInput.focus();
  } else {
    // Focus overlay instead of letting focus escape
    overlay.focus();
  }
};

export const dismissOverlay = (
  doc: Document,
  data: any,
  role: string | undefined,
  overlayTag: string,
  id?: string
): Promise<boolean> => {
  const overlay = getOverlay(doc, overlayTag, id);
  if (!overlay) {
    return Promise.reject('overlay does not exist');
  }
  return overlay.dismiss(data, role);
};

export const prepareOverlay = <T extends HTMLGascoOverlayElement>(el: T) => {
  if (typeof document !== 'undefined') {
    connectListeners(document)
  }
  const overlayIndex = lastId++;
  el.overlayIndex = overlayIndex;
  if (!el.hasAttribute('id')) {
    el.id = `gasco-overlay-${overlayIndex}`;
  }
}

const connectListeners = (doc: Document) => {
  if (lastId === 0) {
    lastId = 1;
    doc.addEventListener(
      'focus',
      (ev: FocusEvent) => {
        trapKeyboardFocus(ev, doc);
      },
      true
    );

    // handle back-button click
    doc.addEventListener('gascoBackButton', (ev) => {
      const lastOverlay = getOverlay(doc);
      if (lastOverlay?.backdropDismiss) {
        (ev as BackButtonEvent).detail.register(OVERLAY_BACK_BUTTON_PRIORITY, () => {
          return lastOverlay.dismiss(undefined, BACKDROP);
        });
      }
    });

    // handle ESC to close overlay
    doc.addEventListener('keyup', (ev) => {
      if (ev.key === 'Escape') {
        const lastOverlay = getOverlay(doc);
        if (lastOverlay?.backdropDismiss) {
          lastOverlay.dismiss(undefined, BACKDROP);
        }
      }
    });
  }
}

const trapKeyboardFocus = (ev: Event, doc: Document) => {
  const lastOverlay = getOverlay(doc, 'gasco-alert,gasco-loading,gasco-modal,gasco-picker,gasco-popover');

  const target = ev.target as HTMLElement | null;

  if (!lastOverlay || !target) {
    return;
  }

  if (lastOverlay.classList.contains('gasco-disable-focus-trap')) {
    return;
  }

  const trapScopedFocus = () => {

    if (lastOverlay === target) {
      lastOverlay.lastFocus = undefined;

    } else {

      const overlayRoot = getElementRoot(lastOverlay);
      if (!overlayRoot.contains(target)) {
        return;
      }

      const overlayWrapper = overlayRoot.querySelector('.gasco-overlay-wrapper');
      if (!overlayWrapper) {
        return;
      }

      if (overlayWrapper.contains(target)) {
        lastOverlay.lastFocus = target;
      } else {

        const lastFocus = lastOverlay.lastFocus;

        // Focus the first element in the overlay wrapper
        focusFirstDescendant(overlayWrapper, lastOverlay);

        if (lastFocus === doc.activeElement) {
          focusLastDescendant(overlayWrapper, lastOverlay);
        }
        lastOverlay.lastFocus = doc.activeElement as HTMLElement;
      }
    }
  };
  const trapShadowFocus = () => {

    if (lastOverlay.contains(target)) {
      lastOverlay.lastFocus = target;
    } else {

      const lastFocus = lastOverlay.lastFocus;

      // Focus the first element in the overlay wrapper
      focusFirstDescendant(lastOverlay, lastOverlay);

      if (lastFocus === doc.activeElement) {
        focusLastDescendant(lastOverlay, lastOverlay);
      }
      lastOverlay.lastFocus = doc.activeElement as HTMLElement;
    }
  };

  if (lastOverlay.shadowRoot) {
    trapShadowFocus();
  } else {
    trapScopedFocus();
  }
}

export const getOverlay = (doc: Document, overlayTag?: string, id?: string): HTMLGascoOverlayElement | undefined => {
  const overlays = getOverlays(doc, overlayTag).filter((o) => !isOverlayHidden(o));
  return id === undefined ? overlays[overlays.length - 1] : overlays.find((o) => o.id === id);
};

export const getOverlays = (doc: Document, selector?: string): HTMLGascoOverlayElement[] => {
  if (selector === undefined) {
    selector = 'gasco-alert,gasco-action-sheet,gasco-loading,gasco-modal,gasco-picker,gasco-popover,gasco-toast';
  }
  return (Array.from(doc.querySelectorAll(selector)) as HTMLGascoOverlayElement[]).filter((c) => c.overlayIndex > 0);
};

const focusableQueryString =
  '[tabindex]:not([tabindex^="-"]), input:not([type=hidden]):not([tabindex^="-"]), textarea:not([tabindex^="-"]), button:not([tabindex^="-"]), select:not([tabindex^="-"]), .gasco-focusable:not([tabindex^="-"])';

export const BACKDROP = 'backdrop';