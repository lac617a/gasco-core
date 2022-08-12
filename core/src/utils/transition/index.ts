import { raf } from '../helpers';

export const deepReady = async (el: any | undefined): Promise<void> => {
  const element = el as any;
  if (element) {
    if (element.componentOnReady != null) {
      const stencilEl = await element.componentOnReady();
      if (stencilEl != null) {
        return;
      }

      /**
       * Custom elements in Stencil will have __registerHost.
       */
    } else if (element.__registerHost != null) {
      /**
       * Non-lazy loaded custom elements need to wait
       * one frame for component to be loaded.
       */
      const waitForCustomElement = new Promise((resolve) => raf(resolve));
      await waitForCustomElement;

      return;
    }
    await Promise.all(Array.from(element.children).map(deepReady));
  }
};