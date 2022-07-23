import type { Color, AnimationBuilder } from '../../interface';
import type { GascoSafeString } from '../../utils/sanitization';

export interface ToastOptions {
  header?: string;
  message?: string | GascoSafeString;
  cssClass?: string | string[];
  duration?: number;
  buttons?: (ToastButton | string)[];
  position?: 'top' | 'bottom' | 'middle';
  translucent?: boolean;
  animated?: boolean;
  icon?: string;
  htmlAttributes?: { [key: string]: any };
  color?: Color;
  keyboardClose?: boolean;
  id?: string;
  enterAnimation?: AnimationBuilder;
  leaveAnimation?: AnimationBuilder;
}

export interface ToastButton {
  text?: string;
  icon?: string;
  side?: 'start' | 'end';
  role?: 'cancel' | string;
  cssClass?: string | string[];
  handler?: () => boolean | void | Promise<boolean | void>;
}