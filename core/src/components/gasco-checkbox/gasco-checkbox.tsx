import type { ComponentInterface, EventEmitter } from '@stencil/core';
import { Component, Element, Event, Host, Prop, Watch, h } from '@stencil/core';

import type { CheckboxChangeEventDetail, Color, StyleEventDetail } from '../../interface';
import { getAriaLabel, renderHiddenInput } from '../../utils/helpers';
import { createColorClasses, hostContext } from '../../utils/theme';

/**
 * @part container - The container for the checkbox mark.
 * @part mark - The checkmark used to indicate the checked state.
 */
@Component({
  tag: 'gasco-checkbox',
  styleUrl: 'gasco-checkbox.md.scss',
  shadow: true,
})
export class GascoCheckbox implements ComponentInterface {
  private inputId = `gasco-cb-${checkboxIds++}`;
  private focusEl?: HTMLElement;

  @Element() el!: HTMLElement;
  @Prop({ reflect: true }) color?: Color = 'primary';

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name: string = this.inputId;

  /**
   * If `true`, the checkbox is selected.
   */
  @Prop({ mutable: true }) checked = false;

  /**
   * If `true`, the checkbox will visually appear as indeterminate.
   */
  @Prop({ mutable: true }) indeterminate = false;

  /**
   * If `true`, the user cannot interact with the checkbox.
   */
  @Prop() disabled = false;

  /**
   * The value of the checkbox does not mean if it's checked or not, use the `checked`
   * property for that.
   *
   * The value of a checkbox is analogous to the value of an `<input type="checkbox">`,
   * it's only used when the checkbox participates in a native `<form>`.
   */
  @Prop() value: any | null = 'on';

  /**
   * Emitted when the checked property has changed.
   */
  @Event() gascoChange!: EventEmitter<CheckboxChangeEventDetail>;

  /**
   * Emitted when the checkbox has focus.
   */
  @Event() gascoFocus!: EventEmitter<void>;

  /**
   * Emitted when the checkbox loses focus.
   */
  @Event() gascoBlur!: EventEmitter<void>;

  /**
   * Emitted when the styles change.
   * @internal
   */
  @Event() gascoStyle!: EventEmitter<StyleEventDetail>;

  componentWillLoad() {
    this.emitStyle();
  }

  @Watch('checked')
  checkedChanged(isChecked: boolean) {
    this.gascoChange.emit({
      checked: isChecked,
      value: this.value,
    });
    this.emitStyle();
  }

  @Watch('disabled')
  disabledChanged() {
    this.emitStyle();
  }

  private emitStyle() {
    this.gascoStyle.emit({
      'checkbox-checked': this.checked,
      'interactive-disabled': this.disabled,
    });
  }

  private setFocus() {
    if (this.focusEl) {
      this.focusEl.focus();
    }
  }

  private onClick = (ev: any) => {
    ev.preventDefault();

    this.setFocus();
    this.checked = !this.checked;
    this.indeterminate = false;
  };

  private onFocus = () => {
    this.gascoFocus.emit();
  };

  private onBlur = () => {
    this.gascoBlur.emit();
  };

  render() {
    const { color, checked, disabled, el, indeterminate, inputId, name, value } = this;
    const { label, labelId, labelText } = getAriaLabel(el, inputId);

    renderHiddenInput(true, el, name, checked ? value : '', disabled);

    let path = indeterminate ? (
      <path d="M6 12L18 12" part="mark" />
    ) : (
      <path d="M5.9,12.5l3.8,3.8l8.8-8.8" part="mark" />
    );

    // if (mode === 'md') {
    //   path = indeterminate ? (
    //     <path d="M2 12H22" part="mark" />
    //   ) : (
    //     <path d="M1.73,12.91 8.1,19.28 22.79,4.59" part="mark" />
    //   );
    // }

    return (
      <Host
        onClick={this.onClick}
        aria-labelledby={label ? labelId : null}
        aria-checked={`${checked}`}
        aria-hidden={disabled ? 'true' : null}
        role="checkbox"
        class={createColorClasses(color, {
          'in-item': hostContext('gasco-item', el),
          'checkbox-checked': checked,
          'checkbox-disabled': disabled,
          'checkbox-indeterminate': indeterminate,
          interactive: true,
        })}
      >
        <svg class="checkbox-icon" viewBox="0 0 24 24" part="container">
          {path}
        </svg>
        <label htmlFor={inputId}>{labelText}</label>
        <input
          type="checkbox"
          aria-checked={`${checked}`}
          disabled={disabled}
          id={inputId}
          onFocus={() => this.onFocus()}
          onBlur={() => this.onBlur()}
          ref={(focusEl) => (this.focusEl = focusEl)}
        />
      </Host>
    );
  }
}

let checkboxIds = 0;
