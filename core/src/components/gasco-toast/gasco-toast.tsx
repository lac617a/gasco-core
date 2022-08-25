import type { ComponentInterface, EventEmitter } from '@stencil/core';
import { Component, Element, Event, Host, Method, Prop, h } from '@stencil/core';

import type {
  AnimationBuilder,
  Color,
  OverlayEventDetail,
  OverlayInterface,
  ToastButton,
} from '../../interface';
import { dismiss, eventMethod, isCancel, prepareOverlay, present, safeCall } from '../../utils/overlays';
import type { GascoSafeString } from '../../utils/sanitization';
import { sanitizeDOMString } from '../../utils/sanitization';
import { createColorClasses, getClassMap } from '../../utils/theme';

import { EnterAnimation } from './animations/md.enter';
import { LeaveAnimation } from './animations/md.leave';

/**
 * @part button - Any button element that is displayed inside of the toast.
 * @part container - The element that wraps all child elements.
 * @part message - The body text of the toast.
 */
@Component({
  tag: 'gasco-toast',
  styleUrl: 'gasco-toast.md.scss',
  shadow: true,
})
export class GascoToast implements ComponentInterface, OverlayInterface {
  private durationTimeout: any;

  presented = false;

  @Element() el!: HTMLGascoToastElement;

  /**
   * @internal
   */
  @Prop() overlayIndex!: number;

  /**
   * The color to use from your application's color palette.
   * Default options are: `"primary"`, `"secondary"`, `"success"`, `"warning"`, `"danger"`.
   */
  @Prop({ reflect: true }) color?: Color = 'primary';

  /**
   * Animation to use when the toast is presented.
   */
  @Prop() enterAnimation?: AnimationBuilder;

  /**
   * Animation to use when the toast is dismissed.
   */
  @Prop() leaveAnimation?: AnimationBuilder;

  /**
   * Additional classes to apply for custom CSS. If multiple classes are
   * provided they should be separated by spaces.
   */
  @Prop() cssClass?: string | string[];

  /**
   * How many milliseconds to wait before hiding the toast. By default, it will show
   * until `dismiss()` is called.
   */
  @Prop() duration = 0;

  /**
   * The Toast size.
   */
  @Prop({ reflect: true }) size?: 'small' | 'default' | 'large';

  /**
   * Message to be shown in the toast.
   */
  @Prop() message?: string | GascoSafeString;

  /**
   * If `true`, the keyboard will be automatically dismissed when the overlay is presented.
   */
  @Prop() keyboardClose = false;

  /**
   * The position of the toast on the screen.
   */
  @Prop() position: 'top' | 'bottom' | 'middle' = 'bottom';

  /**
   * An array of buttons for the toast.
   */
  @Prop() buttons?: (ToastButton | string)[];

  /**
   * If `true`, the toast will be translucent.
   * Only applies when the mode is `"ios"` and the device supports
   * [`backdrop-filter`](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter#Browser_compatibility).
   */
  @Prop() translucent = false;

  /**
   * If `true`, the toast will animate.
   */
  @Prop() animated = true;

  /**
   * Additional attributes to pass to the toast.
   */
  @Prop() htmlAttributes?:  { [key: string]: any };

  /**
   * Emitted after the toast has presented.
   */
  @Event({ eventName: 'gascoToastDidPresent' }) didPresent!: EventEmitter<void>;

  /**
   * Emitted before the toast has presented.
   */
  @Event({ eventName: 'gascoToastWillPresent' }) willPresent!: EventEmitter<void>;

  /**
   * Emitted before the toast has dismissed.
   */
  @Event({ eventName: 'gascoToastWillDismiss' }) willDismiss!: EventEmitter<OverlayEventDetail>;

  /**
   * Emitted after the toast has dismissed.
   */
  @Event({ eventName: 'gascoToastDidDismiss' }) didDismiss!: EventEmitter<OverlayEventDetail>;

  connectedCallback() {
    prepareOverlay(this.el);
  }

  /**
   * Present the toast overlay after it has been created.
   */
  @Method()
  async present(): Promise<void> {
    await present(this, 'toastEnter', EnterAnimation, this.position);

    if (this.duration > 0) {
      this.durationTimeout = setTimeout(() => this.dismiss(undefined, 'timeout'), this.duration);
    }
  }

  /**
   * Dismiss the toast overlay after it has been presented.
   *
   * @param data Any data to emit in the dismiss events.
   * @param role The role of the element that is dismissing the toast.
   * This can be useful in a button handler for determining which button was
   * clicked to dismiss the toast.
   * Some examples include: ``"cancel"`, `"destructive"`, "selected"`, and `"backdrop"`.
   */
  @Method()
  dismiss(data?: any, role?: string): Promise<boolean> {
    if (this.durationTimeout) {
      clearTimeout(this.durationTimeout);
    }
    return dismiss(this, data, role, 'toastLeave', LeaveAnimation, this.position);
  }

  /**
   * Returns a promise that resolves when the toast did dismiss.
   */
  @Method()
  onDidDismiss<T = any>(): Promise<OverlayEventDetail<T>> {
    return eventMethod(this.el, 'gascoToastDidDismiss');
  }

  /**
   * Returns a promise that resolves when the toast will dismiss.
   */
  @Method()
  onWillDismiss<T = any>(): Promise<OverlayEventDetail<T>> {
    return eventMethod(this.el, 'gascoToastWillDismiss');
  }

  private getButtons(): ToastButton[] {
    const buttons = this.buttons
      ? this.buttons.map((b) => {
          return typeof b === 'string' ? { text: b } : b;
        })
      : [];

    return buttons;
  }

  private async buttonClick(button: ToastButton) {
    const role = button.role;
    if (isCancel(role)) {
      return this.dismiss(undefined, role);
    }
    const shouldDismiss = await this.callButtonHandler(button);
    if (shouldDismiss) {
      return this.dismiss(undefined, role);
    }
    return Promise.resolve();
  }

  private async callButtonHandler(button: ToastButton | undefined) {
    if (button?.handler) {
      // a handler has been provided, execute it
      // pass the handler the values from the inputs
      try {
        const rtn = await safeCall(button.handler);
        if (rtn === false) {
          // if the return value of the handler is false then do not dismiss
          return false;
        }
      } catch (e) {
        console.error(e);
      }
    }
    return true;
  }

  private dispatchCancelHandler = (ev: CustomEvent) => {
    const role = ev.detail.role;
    if (isCancel(role)) {
      const cancelButton = this.getButtons().find((b) => b.role === 'cancel');
      this.callButtonHandler(cancelButton);
    }
  };

  render() {
    const wrapperClass = {
      'toast-wrapper': true,
      [`toast-${this.position}`]: true,
    };

    const finalSize = this.size === undefined && false ? 'small' : this.size;

    return (
      <Host
        aria-live="polite"
        aria-atomic="true"
        role="dialog"
        tabindex="-1"
        {...(this.htmlAttributes as any)}
        style={{
          zIndex: `${60000 + this.overlayIndex}`,
        }}
        class={createColorClasses(this.color, {
          ...getClassMap(this.cssClass),
          'overlay-hidden': true,
          'toast-translucent': this.translucent,
          [`toast-${finalSize}`]: finalSize !== undefined,
        })}
        onGascoToastWillDismiss={this.dispatchCancelHandler}
      >
        <div class={wrapperClass}>
          <div class="toast-container" part="container">

            <div class="toast-icon">
              {this.color !== 'success' ? (
                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.5 7H13.5V9H11.5V7ZM11.5 11H13.5V17H11.5V11ZM12.5 2C6.98 2 2.5 6.48 2.5 12C2.5 17.52 6.98 22 12.5 22C18.02 22 22.5 17.52 22.5 12C22.5 6.48 18.02 2 12.5 2ZM12.5 20C8.09 20 4.5 16.41 4.5 12C4.5 7.59 8.09 4 12.5 4C16.91 4 20.5 7.59 20.5 12C20.5 16.41 16.91 20 12.5 20Z" fill="#333"/>
                </svg>
              ) : (
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.5 2.50385C6.989 2.50385 2.5 6.99284 2.5 12.5038C2.5 18.0148 6.989 22.5038 12.5 22.5038C18.011 22.5038 22.5 18.0148 22.5 12.5038C22.5 6.99284 18.011 2.50385 12.5 2.50385ZM12.5 4.50385C16.9301 4.50385 20.5 8.07372 20.5 12.5038C20.5 16.934 16.9301 20.5038 12.5 20.5038C8.06988 20.5038 4.5 16.934 4.5 12.5038C4.5 8.07372 8.06988 4.50385 12.5 4.50385ZM16.793 8.79681L10.5 15.0898L8.20703 12.7968L6.79297 14.2109L10.5 17.9179L18.207 10.2109L16.793 8.79681Z" fill="#333"/>
                </svg>
              )}
            </div>

            <div class="toast-content">
              {this.color === 'primary' && (
                <h2 class="toast-title" part="title">Informativo</h2>
              )}
              {this.color === 'danger' && (
                <h2 class="toast-title" part="title">Error</h2>
              )}
              {this.color === 'success' && (
                <h2 class="toast-title" part="title">Exito</h2>
              )}
              {this.color === 'warning' && (
                <h2 class="toast-title" part="title">Alerta</h2>
              )}
              {this.message !== undefined && (
                <div class="toast-message" part="message" innerHTML={sanitizeDOMString(this.message)}></div>
              )}
            </div>
            <button
              type="button"
              part="button"
              tabIndex={0}
              onClick={this.buttonClick.bind(this)}
              class="toast-button focusable activatable">
              <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 6.86843L17.59 5.45844L12 11.0484L6.41 5.45844L5 6.86843L10.59 12.4584L5 18.0484L6.41 19.4584L12 13.8684L17.59 19.4584L19 18.0484L13.41 12.4584L19 6.86843Z" fill="#999999"/>
              </svg>
            </button>
          </div>
        </div>
      </Host>
    );
  }
}

