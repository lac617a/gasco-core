import { ComponentInterface, EventEmitter } from '@stencil/core';
import { Component, Element, Event, Host, Prop, h } from '@stencil/core';

import type {  Color } from '../../interface';
import type { Attributes } from '../../utils/helpers';
import { inheritAriaAttributes } from '../../utils/helpers';
import { createColorClasses } from '../../utils/theme';
import { ButtonInterface } from '../gasco-button/gasco-button';

// The interfaces are used to make sure our components
// have the correct properties defined that are needed to pass to
// the native HTML elements they render

/**
 * @slot - Content is placed between the named slots if provided without a slot.
 * @part native - The native HTML button or anchor element that wraps all child elements.
 */
@Component({
  tag: 'gasco-button-icon',
  styleUrl: 'gasco-button-icon.scss',
  shadow: true,
})
export class GascoButtonIcon implements ComponentInterface, ButtonInterface {
  private inItem = false;
  private inheritedAttributes: Attributes = {};

  @Element() el!: HTMLElement;

  /**
   * The color to use from your application's color palette.
   * Default options are: `"primary"`.
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
   * Set to `"clear"` for a transparent button, to `"outline"` for a transparent
   * button with a border, or to `"solid"`.
   */
  @Prop({ reflect: true, mutable: true }) fill?: | 'outline' | 'solid' | 'clear' = 'solid';

  /**
   * The button shape.
   */
  @Prop({ reflect: true }) shape?: 'round';

  /**
   * The button size.
   */
  @Prop({ reflect: true }) size?: 'small' | 'default' | 'large';


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
    this.inheritedAttributes = inheritAriaAttributes(this.el);
  }

  private onFocus = () => this.gascoFocus.emit();

  private onBlur = () => this.gascoBlur.emit();

  render() {
    const {
      type,
      size,
      fill,
      color,
      shape,
      disabled,
      progress,
      buttonType,
      inheritedAttributes,
    } = this;
    const finalSize = size === undefined && this.inItem ? 'small' : size;
    const attrs = { type };

    return (
      <Host
        aria-disabled={disabled ? 'true' : null}
        aria-progress={progress ? 'true' : null}
        class={createColorClasses(color, {
          [`${buttonType}-${finalSize}`]: finalSize !== undefined,
          [`${buttonType}-${shape}`]: shape !== undefined,
          [`${buttonType}-${fill}`]: true,
          'button-disabled': disabled,
          'gasco-activatable': true,
          'gasco-button-icon': true,
          'gasco-focusable': true,
        })}
      >
        <button
          {...attrs}
          class={`button-native icon-only ${progress ? 'progress': ''}`}
          part="native"
          disabled={disabled}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          {...inheritedAttributes}>
            <span class="button-inner">
              {progress ? (
                <span class="button-progress"></span>
              ) : (
                <slot></slot>
              )}
            </span>
        </button>
      </Host>
    );
  }
}
