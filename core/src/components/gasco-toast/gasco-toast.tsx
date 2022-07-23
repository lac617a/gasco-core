import type { ComponentInterface, EventEmitter } from '@stencil/core';
import { Component, Element, Event, Host, Method, Prop, h } from '@stencil/core';

import type {
  Color,
  ToastButton,
  CssClassMap,
  OverlayInterface,
  AnimationBuilder,
  OverlayEventDetail,
} from '../../interface';
import { dismiss, eventMethod, isCancel, prepareOverlay, present } from '../../utils/overlays';
import type { GascoSafeString } from '../../utils/sanitization';
import { sanitizeDOMString } from '../../utils/sanitization';
import { createColorClasses, getClassMap } from '../../utils/theme';

import { EnterAnimation } from './animations/md.enter';
import { LeaveAnimation } from './animations/md.leave';

/**
 * @part button - Any button element that is displayed inside of the toast.
 * @part container - The element that wraps all child elements.
 * @part header - The header text of the toast.
 * @part message - The body text of the toast.
 * @part icon - The icon that appears next to the toast content.
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
   * Default options are: `"primary"`, `"secondary"`, `"tertiary"`, `"success"`, `"warning"`, `"danger"`, `"light"`, `"medium"`, and `"dark"`.
   */
  @Prop({ reflect: true }) color?: Color;

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
   * Header to be shown in the toast.
   */
  @Prop() header?: string;

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
   * If `true`, the toast will animate.
   */
  @Prop() animated = true;

  /**
   * The name of the icon to display, or the path to a valid SVG file. See `ion-icon`.
   * https://ionic.io/ionicons
   */
  @Prop() icon?: string;

  /**
   * Additional attributes to pass to the toast.
   */
  @Prop() htmlAttributes?: { [key: string]: any };

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
    await present(this, EnterAnimation, this.position);

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
    return dismiss(this, data, role, LeaveAnimation, this.position);
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
    return Promise.resolve();
  }

  private dispatchCancelHandler = (ev: CustomEvent) => {
    const role = ev.detail.role;
    if (isCancel(role)) {
      const cancelButton = this.getButtons().find((b) => b.role === 'cancel');
      console.log(cancelButton)
    }
  };

  renderButtons(buttons: ToastButton[], side: 'start' | 'end') {
    if (buttons.length === 0) {
      return;
    }

    const buttonGroupsClasses = {
      'gasco-toast-button-group': true,
      [`gasco-toast-button-group-${side}`]: true,
    };
    return (
      <div class={buttonGroupsClasses}>
        {buttons.map((b) => (
          <button type="button" class={buttonClass(b)} tabIndex={0} onClick={() => this.buttonClick(b)} part="button">
            <div class="gasco-toast-button-inner">
              {b.icon && (
                <ion-icon
                  icon={b.icon}
                  slot={b.text === undefined ? 'icon-only' : undefined}
                  class="gasco-toast-button-icon"
                />
              )}
              {b.text}
            </div>
          </button>
        ))}
      </div>
    );
  }

  render() {
    const allButtons = this.getButtons();
    const startButtons = allButtons.filter((b) => b.side === 'start');
    const endButtons = allButtons.filter((b) => b.side !== 'start');
    const wrapperClass = {
      'gasco-toast-wrapper': true,
      [`gasco-toast-${this.position}`]: true,
    };
    const role = allButtons.length > 0 ? 'dialog' : 'status';

    return (
      <Host
        aria-live="polite"
        aria-atomic="true"
        role={role}
        tabindex="-1"
        {...(this.htmlAttributes as any)}
        style={{
          zIndex: `${60000 + this.overlayIndex}`,
        }}
        class={createColorClasses(this.color, {
          ...getClassMap(this.cssClass),
          'overlay-hidden': true,
        })}
        onGascoToastWillDismiss={this.dispatchCancelHandler}
      >
        <div class={wrapperClass}>
          <div class="gasco-toast-container" part="container">
            {this.renderButtons(startButtons, 'start')}

            {this.icon !== undefined && (
              <ion-icon class="gasco-toast-icon" part="icon" icon={this.icon} lazy={false} aria-hidden="true"></ion-icon>
            )}

            <div class="gasco-toast-content">
              {this.header !== undefined && (
                <div class="gasco-toast-header" part="header">
                  {this.header}
                </div>
              )}
              {this.message !== undefined && (
                <div class="gasco-toast-message" part="message" innerHTML={sanitizeDOMString(this.message)}></div>
              )}
            </div>

            {this.renderButtons(endButtons, 'end')}
          </div>
        </div>
      </Host>
    );
  }
}

const buttonClass = (button: ToastButton): CssClassMap => {
  return {
    'gasco-toast-button': true,
    'gasco-toast-button-icon-only': button.icon !== undefined && button.text === undefined,
    [`gasco-toast-button-${button.role}`]: button.role !== undefined,
    'gasco-focusable': true,
    'gasco-activatable': true,
    ...getClassMap(button.cssClass),
  };
};
