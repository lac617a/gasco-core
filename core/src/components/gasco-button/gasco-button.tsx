import { ComponentInterface, EventEmitter, Fragment } from '@stencil/core';
import { Component, Element, Event, Host, Prop, h } from '@stencil/core';

import type {  Color } from '../../interface';
import type { Attributes } from '../../utils/helpers';
import { inheritAriaAttributes } from '../../utils/helpers';
import { createColorClasses } from '../../utils/theme';

// The interfaces are used to make sure our components
// have the correct properties defined that are needed to pass to
// the native HTML elements they render

export interface ButtonInterface {
  type: 'submit' | 'reset' | 'button';
  disabled: boolean;
}

/**
 * @slot - Content is placed between the named slots if provided without a slot.
 * @slot icon-only - Should be used on an icon in a button that has no text.
 * @slot start - Content is placed to the left of the button text in LTR, and to the right in RTL.
 * @slot end - Content is placed to the right of the button text in LTR, and to the left in RTL.
 *
 * @part native - The native HTML button or anchor element that wraps all child elements.
 */
@Component({
  tag: 'gasco-button',
  styleUrl: 'button.md.scss',
  shadow: true,
})
export class Button implements ComponentInterface, ButtonInterface {
  private inItem = false;
  private inToolbar = false;
  private inListHeader = false;
  private inheritedAttributes: Attributes = {};

  @Element() el!: HTMLElement;

  /**
   * The color to use from your application's color palette.
   * Default options are: `"primary"`, `"secondary"`, `"success"`, `"warning"` and `"danger"`.
   */
  @Prop({ reflect: true }) color?: Color = 'primary';

  /**
   * The type of button.
   */
  @Prop({ mutable: true }) buttonType = 'button';

  /**
   * If `true`, the user cannot interact with the button.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * If `true`, the user cannot interact with the button in progress.
   */
  @Prop({ reflect: true }) progress = false;

  /**
   * Set to `"block"` for a full-width button or to `"full"` for a full-width button
   * without left and right borders.
   */
  // @Prop({ reflect: true }) expand?: 'full' | 'block';

  /**
   * Set to `"clear"` for a transparent button, to `"outline"` for a transparent
   * button with a border, or to `"solid"`. The default style is `"solid"` except inside of
   * a toolbar, where the default is `"clear"`.
   */
  @Prop({ reflect: true, mutable: true }) fill?: 'clear' | 'outline' | 'solid' | 'default';

  /**
   * The button shape.
   */
  @Prop({ reflect: true }) shape?: 'round';

  /**
   * The button size.
   */
  @Prop({ reflect: true }) size?: 'small' | 'default' | 'large';

  /**
   * If `true`, activates a button with a heavier font weight.
   */
  @Prop() strong = false;

  /**
   * The type of the button.
   */
  @Prop() type: 'submit' | 'reset' | 'button' = 'button';

  /**
   * Emitted when the button has focus.
   */
  @Event() gascoFocus!: EventEmitter<void>;

  /**
   * Emitted when the button loses focus.
   */
  @Event() gascoBlur!: EventEmitter<void>;

  componentWillLoad() {
    this.inToolbar = !!this.el.closest('gasco-buttons');
    this.inListHeader = !!this.el.closest('gasco-list-header');
    this.inItem = !!this.el.closest('gasco-item') || !!this.el.closest('gasco-item-divider');
    this.inheritedAttributes = inheritAriaAttributes(this.el);
  }

  private get hasIconOnly() {
    return !!this.el.querySelector('[slot="icon-only"]');
  }

  private onFocus = () => this.gascoFocus.emit();
  private onBlur = () => this.gascoBlur.emit();

  render() {
    const {
      type,
      size,
      color,
      shape,
      // expand,
      strong,
      disabled,
      progress,
      buttonType,
      hasIconOnly,
      inheritedAttributes,
    } = this;
    const finalSize = size === undefined && this.inItem ? 'small' : size;
    const attrs = { type };

    let fill = this.fill;
    if (fill === undefined) {
      fill = this.inToolbar || this.inListHeader ? 'clear' : 'solid';
    }
    return (
      <Host
        aria-disabled={disabled ? 'true' : null}
        aria-progress={progress ? 'true' : null}
        class={createColorClasses(color, {
          // [`${buttonType}-${expand}`]: expand !== undefined,
          [`${buttonType}-${finalSize}`]: finalSize !== undefined,
          [`${buttonType}-${shape}`]: shape !== undefined,
          [`${buttonType}-${fill}`]: true,
          [`${buttonType}-strong`]: strong,
          'button-has-icon-only': hasIconOnly,
          'button-disabled': disabled,
          'gasco-activatable': true,
          'gasco-focusable': true,
        })}
      >
        <button
          {...attrs}
          class={`button-native ${progress ? 'progress': ''}`}
          part="native"
          disabled={disabled}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          {...inheritedAttributes}>
            <span class="button-inner">
              {progress ? (
                <span class="button-progress"></span>
              ) : (
                <Fragment>
                  <slot name="icon-only"></slot>
                  <slot name="start"></slot>
                  <slot></slot>
                  <slot name="end"></slot>
                </Fragment>
              )}
            </span>
        </button>
      </Host>
    );
  }
}
