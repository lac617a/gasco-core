import { componentOnReady } from '../helpers';
import { printRequiredElementError } from '../logging';

const GASCO_CONTENT_TAG_NAME = 'GASCO-CONTENT';
export const GASCO_CONTENT_ELEMENT_SELECTOR = 'gasco-content';
export const GASCO_CONTENT_CLASS_SELECTOR = '.gasco-content-scroll-host';
/**
 * Selector used for implementations reliant on `<gasco-content>` for scroll event changes.
 *
 * Developers should use the `.gasco-content-scroll-host` selector to target the element emitting
 * scroll events. With virtual scroll implementations this will be the host element for
 * the scroll viewport.
 */
const GASCO_CONTENT_SELECTOR = `${GASCO_CONTENT_ELEMENT_SELECTOR}, ${GASCO_CONTENT_CLASS_SELECTOR}`;

export const isGascoContent = (el: Element) => el && el.tagName === GASCO_CONTENT_TAG_NAME;

/**
 * Waits for the element host fully initialize before
 * returning the inner scroll element.
 *
 * For `gasco-content` the scroll target will be the result
 * of the `getScrollElement` function.
 *
 * For custom implementations it will be the element host
 * or a selector within the host, if supplied through `scrollTarget`.
 */
export const getScrollElement = async (el: Element) => {
  if (isGascoContent(el)) {
    await new Promise((resolve) => componentOnReady(el, resolve));
    return (el as HTMLGascoContentElement).getScrollElement();
  }

  return el as HTMLElement;
};

/**
 * Queries the element matching the selector for GascoContent.
 * See GASCO_CONTENT_SELECTOR for the selector used.
 */
export const findGascoContent = (el: Element) => {
  /**
   * First we try to query the custom scroll host selector in cases where
   * the implementation is using an outer `gasco-content` with an inner custom
   * scroll container.
   */
  const customContentHost = el.querySelector<HTMLElement>(GASCO_CONTENT_CLASS_SELECTOR);
  if (customContentHost) {
    return customContentHost;
  }
  return el.querySelector<HTMLElement>(GASCO_CONTENT_SELECTOR);
};

/**
 * Queries the closest element matching the selector for GascoContent.
 */
export const findClosestGascoContent = (el: Element) => {
  return el.closest<HTMLElement>(GASCO_CONTENT_SELECTOR);
};

/**
 * Scrolls to the top of the element. If an `gasco-content` is found, it will scroll
 * using the public API `scrollToTop` with a duration.
 */
export const scrollToTop = (el: HTMLElement, durationMs: number): Promise<any> => {
  if (isGascoContent(el)) {
    const content = el as HTMLGascoContentElement;
    return content.scrollToTop(durationMs);
  }
  return Promise.resolve(
    el.scrollTo({
      top: 0,
      left: 0,
      behavior: durationMs > 0 ? 'smooth' : 'auto',
    })
  );
};

/**
 * Scrolls by a specified X/Y distance in the component. If an `gasco-content` is found, it will scroll
 * using the public API `scrollByPoint` with a duration.
 */
export const scrollByPoint = (el: HTMLElement, x: number, y: number, durationMs: number) => {
  if (isGascoContent(el)) {
    const content = el as HTMLGascoContentElement;
    return content.scrollByPoint(x, y, durationMs);
  }
  return Promise.resolve(
    el.scrollBy({
      top: y,
      left: x,
      behavior: durationMs > 0 ? 'smooth' : 'auto',
    })
  );
};

/**
 * Prints an error informing developers that an implementation requires an element to be used
 * within either the `gasco-content` selector or the `.gasco-content-scroll-host` class.
 */
export const printGascoContentErrorMsg = (el: HTMLElement) => {
  return printRequiredElementError(el, GASCO_CONTENT_ELEMENT_SELECTOR);
};

/**
 * Several components in Gasco need to prevent scrolling
 * during a gesture (card modal, range, item sliding, etc).
 * Use this utility to account for gasco-content and custom content hosts.
 */
export const disableContentScrollY = (contentEl: HTMLElement): boolean => {
  if (isGascoContent(contentEl)) {
    const gascoContent = contentEl as HTMLGascoContentElement;
    const initialScrollY = gascoContent.scrollY;
    gascoContent.scrollY = false;

    /**
     * This should be passed into resetContentScrollY
     * so that we can revert gasco-content's scrollY to the
     * correct state. For example, if scrollY = false
     * initially, we do not want to enable scrolling
     * when we call resetContentScrollY.
     */
    return initialScrollY;
  } else {
    contentEl.style.setProperty('overflow', 'hidden');

    return true;
  }
};

export const resetContentScrollY = (contentEl: HTMLElement, initialScrollY: boolean) => {
  if (isGascoContent(contentEl)) {
    (contentEl as HTMLGascoContentElement).scrollY = initialScrollY;
  } else {
    contentEl.style.removeProperty('overflow');
  }
};
