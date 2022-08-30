import type { Components as IoniconsComponents, JSX as IoniconsJSX } from 'ionicons';

// Components interfaces
export * from './components';
export * from './index';
export * from './components/gasco-input/gasco-input-interface';
export * from './components/gasco-toast/gasco-toast-interface';
export * from './components/gasco-modal/gasco-modal-interface';
export * from './components/gasco-content/gasco-content-interface';
export * from './components/gasco-checkbox/gasco-checkbox-interface';
export * from './components/gasco-item/gasco-item-interface';
export * from './components/gasco-popover/gasco-popover-interface';
export * from './components/gasco-menu/gasco-menu-interface';
export * from './components/gasco-range/gasco-range-interface';
export * from './components/gasco-tab/gasco-tab-interface';
export * from './components/gasco-datetime/gasco-datetime-interface';
export * from './components/gasco-accordion-group/gasco-accordion-group-interface';
export * from './components/gasco-paginator/gasco-paginator-interface';
export * from './components/gasco-autocomplete/gasco-autocomplete-interface';
export * from './components/gasco-chip/gasco-chip-interface';

// Types from utils
export {
  Animation,
  AnimationFill,
  AnimationBuilder,
  AnimationDirection,
  AnimationKeyFrames,
  AnimationLifecycle,
  AnimationCallbackOptions,
} from './utils/animation/animation-interface';
export * from './utils/overlays-interface';
export * from './global/config';
export { Gesture, GestureDetail } from './utils/gesture';


// From: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
export type AutocompleteTypes =
  | 'on'
  | 'off'
  | 'name'
  | 'honorific-prefix'
  | 'given-name'
  | 'additional-name'
  | 'family-name'
  | 'honorific-suffix'
  | 'nickname'
  | 'email'
  | 'username'
  | 'new-password'
  | 'current-password'
  | 'one-time-code'
  | 'organization-title'
  | 'organization'
  | 'street-address'
  | 'address-line1'
  | 'address-line2'
  | 'address-line3'
  | 'address-level4'
  | 'address-level3'
  | 'address-level2'
  | 'address-level1'
  | 'country'
  | 'country-name'
  | 'postal-code'
  | 'cc-name'
  | 'cc-given-name'
  | 'cc-additional-name'
  | 'cc-family-name'
  | 'cc-family-name'
  | 'cc-number'
  | 'cc-exp'
  | 'cc-exp-month'
  | 'cc-exp-year'
  | 'cc-csc'
  | 'cc-type'
  | 'transaction-currency'
  | 'transaction-amount'
  | 'language'
  | 'bday'
  | 'bday-day'
  | 'bday-month'
  | 'bday-year'
  | 'sex'
  | 'tel'
  | 'tel-country-code'
  | 'tel-national'
  | 'tel-area-code'
  | 'tel-local'
  | 'tel-extension'
  | 'impp'
  | 'url'
  | 'photo';

export type TextFieldTypes =
  | 'date'
  | 'email'
  | 'number'
  | 'password'
  | 'search'
  | 'tel'
  | 'text'
  | 'url'
  | 'time'
  | 'week'
  | 'month'
  | 'datetime-local';
export type Side = 'start' | 'end';
export type PredefinedColors =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'light'
  | 'medium'
  | 'dark';

type LiteralUnion<T extends U, U = string> = T | (U & Record<never, never>);

export type Color = LiteralUnion<PredefinedColors, string>;
export type CssClassMap = { [className: string]: boolean };
export type BackButtonEvent = CustomEvent<BackButtonEventDetail>;
export type ComponentTags = string;
export type ComponentRef = Function | HTMLElement | string | null;
// eslint-disable-next-line
export type ComponentProps<T = null> = { [key: string]: any };

export interface StyleEventDetail {
  [styleName: string]: boolean;
}
export interface BackButtonEventDetail {
  register(priority: number, handler: (processNextHandler: () => void) => Promise<any> | void): void;
}

export interface FrameworkDelegate {
  attachViewToDom(container: any, component: any, propsOrDataObj?: any, cssClasses?: string[]): Promise<HTMLElement>;
  removeViewFromDom(container: any, component: any): Promise<void>;
}


declare module './components' {
  export namespace Components {
    export type IonIcon = IoniconsComponents.IonIcon;
  }
}

declare module './components' {
  export namespace JSX {
    export type IonIcon = IoniconsJSX.IonIcon;
  }
}