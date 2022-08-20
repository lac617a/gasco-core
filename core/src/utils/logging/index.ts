/**
 * Logs a warning to the console with an Gasco prefix
 * to indicate the library that is warning the developer.
 *
 * @param message - The string message to be logged to the console.
 */
export const printGascoWarning = (message: string) => {
  return console.warn(`[Gasco Warning]: ${message}`);
};

/*
 * Logs an error to the console with an Gasco prefix
 * to indicate the library that is warning the developer.
 *
 * @param message - The string message to be logged to the console.
 * @param params - Additional arguments to supply to the console.error.
 */
export const printGascoError = (message: string, ...params: any) => {
  return console.error(`[Gasco Error]: ${message}`, ...params);
};

/**
 * Prints an error informing developers that an implementation requires an element to be used
 * within a specific selector.
 *
 * @param el The web component element this is requiring the element.
 * @param targetSelectors The selector or selectors that were not found.
 */
export const printRequiredElementError = (el: HTMLElement, ...targetSelectors: string[]) => {
  return console.error(`<${el.tagName.toLowerCase()}> must be used inside ${targetSelectors.join(' or ')}.`);
};
