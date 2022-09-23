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

  @Element() el!: HTMLGascoRadioElement;

  /**
   * If `true`, the radio is selected.
   */
  @Prop({mutable: true}) checked = false;

  /**
   * The tabindex of the radio button.
   * @internal
   */
  @State() buttonTabindex = -1;

  /**
   * The color to use from your application's color palette.
   * Default options are: `"primary"`, `"secondary"`, `"success"`, `"warning"`.
   */
  @Prop({ reflect: true }) color?: Color = 'primary';

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
  @Event() gascoStyle!: EventEmitter<StyleEventDetail>;

  /**
   * Emitted when the radio button has focus.
   */
  @Event() gascoFocus!: EventEmitter<void>;

  /**
   * Emitted when the radio button loses focus.
   */
  @Event() gascoBlur!: EventEmitter<void>;

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
    this.gascoStyle.emit({
      'radio-checked': this.checked,
      'interactive-disabled': this.disabled,
    });
  }

  private onFocus = () => {
    this.gascoFocus.emit();
  };

  private onBlur = () => {
    this.gascoBlur.emit();
  };

  render() {
    const { inputId, disabled, checked, color, el, buttonTabindex } = this;
    const { label, labelId, labelText } = getAriaLabel(el, inputId);

    return (
      <Host
        role="radio"
        onBlur={this.onBlur}
        onFocus={this.onFocus}
        tabindex={buttonTabindex}
        aria-checked={`${checked}`}
        aria-hidden={disabled ? 'true' : null}
        aria-labelledby={label ? labelId : null}
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
          id={inputId}
          tabindex="-1"
          checked={checked}
          disabled={disabled}
        />
      </Host>
    );
  }
}

let radioButtonIds = 0;
