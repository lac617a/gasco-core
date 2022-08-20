import type { ComponentInterface, EventEmitter } from '@stencil/core';
import { Component, Element, Event, Host, Method, Prop, State, Watch, h } from '@stencil/core';

import type { Color, StyleEventDetail } from '../../interface';
import { getAriaLabel } from '../../utils/helpers';
import { createColorClasses, hostContext } from '../../utils/theme';

/**
 * @part container - The container for the radio mark.
 * @part mark - The checkmark or dot used to indicate the checked state.
 */
@Component({
  tag: 'gasco-radio',
  styleUrl: 'gasco-radio.md.scss',
  shadow: true,
})
export class GascoRadio implements ComponentInterface {
  private inputId = `gasco-rb-${radioButtonIds++}`;
  private nativeInput!: HTMLInputElement;

  @Element() el!: HTMLGascoRadioElement;

  /**
   * If `true`, the radio is selected.
   */
  @State() checked = false;

  /**
   * The tabindex of the radio button.
   * @internal
   */
  @State() buttonTabindex = -1;

  /**
   * The color to use from your application's color palette.
   * Default options are: `"primary"`, `"secondary"`, `"tertiary"`, `"success"`, `"warning"`, `"danger"`, `"light"`, `"medium"`, and `"dark"`.
   * For more information on colors, see [theming](/docs/theming/basics).
   */
  @Prop({ reflect: true }) color?: Color;

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name: string = this.inputId;

  /**
   * If `true`, the user cannot interact with the radio.
   */
  @Prop() disabled = false;

  /**
   * the value of the radio.
   */
  @Prop() value?: any | null;

  /**
   * Emitted when the styles change.
   * @internal
   */
  @Event() ionStyle!: EventEmitter<StyleEventDetail>;

  /**
   * Emitted when the radio button has focus.
   */
  @Event() ionFocus!: EventEmitter<void>;

  /**
   * Emitted when the radio button loses focus.
   */
  @Event() ionBlur!: EventEmitter<void>;

  /** @internal */
  @Method()
  async setFocus(ev: any) {
    ev.stopPropagation();
    ev.preventDefault();

    this.el.focus();
  }

  /** @internal */
  @Method()
  async setButtonTabindex(value: number) {
    this.buttonTabindex = value;
  }

  connectedCallback() {
    if (this.value === undefined) {
      this.value = this.inputId;
    }
  }

  componentWillLoad() {
    this.emitStyle();
  }

  @Watch('color')
  @Watch('checked')
  @Watch('disabled')
  emitStyle() {
    this.ionStyle.emit({
      'radio-checked': this.checked,
      'interactive-disabled': this.disabled,
    });
  }

  private onClick = () => {
    this.checked = this.nativeInput.checked;
  };

  private onFocus = () => {
    this.ionFocus.emit();
  };

  private onBlur = () => {
    this.ionBlur.emit();
  };

  render() {
    const { inputId, disabled, checked, color, el, buttonTabindex } = this;
    const { label, labelId, labelText } = getAriaLabel(el, inputId);

    return (
      <Host
        aria-checked={`${checked}`}
        aria-hidden={disabled ? 'true' : null}
        aria-labelledby={label ? labelId : null}
        role="radio"
        tabindex={buttonTabindex}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onClick={this.onClick}
        class={createColorClasses(color, {
          'in-item': hostContext('gasco-item', el),
          interactive: true,
          'radio-checked': checked,
          'radio-disabled': disabled,
        })}
      >
        <div class="radio-icon" part="container">
          <div class="radio-inner" part="mark" />
          <div class="radio-ripple"></div>
        </div>
        <label htmlFor={inputId}>{labelText}</label>
        <input
          type="radio"
          checked={checked}
          disabled={disabled}
          tabindex="-1"
          id={inputId}
          ref={(nativeEl) => (this.nativeInput = nativeEl as HTMLInputElement)}
        />
      </Host>
    );
  }
}

let radioButtonIds = 0;
