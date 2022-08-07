import type { ComponentInterface, EventEmitter } from '@stencil/core';
import { Build, Component, Element, Event, Host, Method, Prop, State, Watch, h } from '@stencil/core';

import type { Color, TextFieldTypes, StyleEventDetail, InputChangeEventDetail, AutocompleteTypes } from '../../interface';
import type { Attributes } from '../../utils/helpers';
import { inheritAriaAttributes, inheritAttributes } from '../../utils/helpers';
import { createColorClasses } from '../../utils/theme';

@Component({
  tag: 'gasco-input',
  styleUrl: 'gasco-input.md.scss',
  scoped: true
})
export class GascoInput implements ComponentInterface {
  private nativeInput?: HTMLInputElement;
  private isComposing = false;
  private inheritedAttributes: Attributes = {};
  private inputId = `gasco-input-${inputIds++}`;

  @Prop() fireFocusEvents = true;
  @State() hasFocus = false;
  @Element() el!: HTMLElement;

  /**
   * The color to use from your application's color palette.
   * Default options are: `primary`, `secondary`, `tertiary`, `success`, `warning`, `danger`, `light`, and `dark`.
   */
  @Prop({reflect: true}) color?: Color;

  /**
   * Indicates whether and how the text value should be automatically capitalized as it is entered/edited by the user.
   * Available options: `off`, `none`, `on`, `sentences`, `words`, `characters`.
   */
  @Prop() autocapitalize = 'off';

  /**
   * Indicates whther the value of the control can be automatically completed by the browser.
   */
  @Prop() autocomplete: AutocompleteTypes = 'off';

  /**
   * Whether auto correction should be enabled when the user is entering/editind the text value.
   */
  @Prop() autocorrect: 'on' | 'off' = 'off';

  /**
   * This Boolean attributes lets you specify that a from control should have input focus when the page loads.
   */
  @Prop() autofocus = false;

  /**
   * If `true`, the user cannot interact with the input.
   */
  @Prop() disabled = false;

  /**
   * Instructional text that show before the input has a value.
   * This property applies only whe the `type` property is set to `email`, `number`, `password`, `search`, `tel`, `text`, or `url`, otherwise it is ignored.
   */
  @Prop() placeholder?: string;

  // /**
  //  * The initial size of the control. This value is in pixels inless the value of the type attribute is `text` or `password`, in which case it is an integer number os charactersd. This attribute applies only whe the `type` attribute is set to `text`, `search`, `tel`, `url`, `email`, or `password`, otherwise it is ignored.
  //  */
  // @Prop() size?: number;

  /**
   * The Input size.
   */
  @Prop({ reflect: true }) size?: 'small' | 'default' | 'large';

  /**
   * Instructional text that show before the input has a value.
   * The Input label.
   */
  @Prop() label?: string;

  /**
   * Instructional text that show before the input has a value.
   * The Input text help.
   */
  @Prop({ reflect: true }) textHelp?: string;

  /**
   * Instructional text that show before the input has a value.
   * The Input text help.
   */
  @Prop() limit?: boolean;

  /**
   * Instructional text that show before the input has a value.
   * The Input numeric for flat country.
   */
  @Prop() indicator?: boolean;

  /**
   * The type of control to display. The default type is `text`.
   */
  @Prop() type: TextFieldTypes = 'text';

  /**
   * The value of the input.
   */
  @Prop({mutable: true}) value?: string | number | null = '';

  /**
   * A hint to the browser for which keyboard to display.
   * Possible values: `none`, `text`, `tel`, `url`, `email, `numeric`, `decimal`, `search`.
   */
  @Prop() inputmode?: 'none' | 'text' | 'tel' | 'url' | 'email' | 'numeric' | 'decimal' | 'search';

  /**
   * If `true`, the user cannot modify the value.
   */
  @Prop() readonly = false;

  /**
   * If `true`, the user must fill in a value before submitting a form.
   */
  @Prop() required = false;

  /**
   * The maximum value, which must not be less than its minimum (min attribute) value.
   */
  @Prop() max?: string | number;

  /**
    * If the value of the type attribute is `text`, `email`, `search`, `password`, `tel`, or `url`, this attribute specifies the maximum number of characters that the user can enter.
    */
  @Prop() maxlength?: number;

  /**
    * The minimum value, which must not be greater than its maximum (max attribute) value.
    */
  @Prop() min?: string | number;

  /**
    * If the value of the type attribute is `text`, `email`, `search`, `password`, `tel`, or `url`, this attribute specifies the minimum number of characters that the user can enter.
    */
  @Prop() minlength?: number;

  /**
   * If `true`, the user can enter more than one value. This attribute applies when the type attribute is set to `email`, otherwise it is ignored.
   */
  @Prop() multiple?: boolean;

  /**
    * The name of the control, which is submitted with the form data.
    */
  @Prop() name: string = this.inputId;

  /**
    * A regular expression that the value is checked against. The pattern must match the entire value, not just some subset. Use the title attribute to describe the pattern to help the user. This attribute applies when the value of the type attribute is `text`, `search`, `tel`, `url`, `email`, `"date"`, or `password`, otherwise it is ignored. When the type attribute is `date`, `pattern` will only be used in browsers that do not support the `date` input type natively.
    */
  @Prop() pattern?: string;

  /**
   * If `true`, the element will have its spelling and grammar checked.
   */
  @Prop() spellcheck = false;

  /**
    * Works with the min and max attributes to limit the increments at which a value can be set.
    * Possible values are: `any` or a positive floating point number.
    */
  @Prop() step?: string;

  //? WATCHs
  @Watch('disabled')
  protected disabledChanged() {
    this.emitStyle();
  }

  /**
   * Update the item classes when the placeholder changes
   */
  @Watch('placeholder')
  protected placeholderChanged() {
    this.emitStyle();
  }

  /**
    * Update the native input element when the value changes
    */
  @Watch('value')
  protected valueChanged() {
    const nativeInput = this.nativeInput;
    const value = this.getValue();
    if (nativeInput && nativeInput.value !== value && !this.isComposing) {
      /**
        * Assigning the native input's value on attribute
        * value change, allows `gascoInput` implementations
        * to override the control's value.
        *
        * Used for patterns such as input trimming (removing whitespace),
        * or input masking.
        */
      nativeInput.value = value.trim();
      if (this.indicator) {
        nativeInput.value = value.replace(/\D/,'');
      }
    }
    this.emitStyle();
    this.gascoChange.emit({ value: typeof this.value !== 'number'  ? this.value : this.value.toString() });
  }

  //? EVENTs
  /**
   * Emitted when a keyboard input occurred.
   */
  @Event() gascoInput!: EventEmitter<InputEvent>;

  /**
   * Emitted when the value has changed.
   */
  @Event() gascoChange!: EventEmitter<InputChangeEventDetail>;

  /**
   * Emitted when the input loses focus.
   */
  @Event() gascoBlur!: EventEmitter<FocusEvent>;

  /**
   * Emitted when the input has focus.
   */
  @Event() gascoFocus!: EventEmitter<FocusEvent>;
  
  /**
   * Emitted when the styles change.
   * @internal
   */
  @Event() gascoStyle!: EventEmitter<StyleEventDetail>;

  //? METHODs

  /**
   * Sets focus on the native `input` in `gasco-input`. Use this method instead of the global
   * `input.focus()`.
   */
  @Method()
  async setFocus() {
    if (this.nativeInput) {
      this.nativeInput.focus();
    }
  }

  /**
   * Sets blur on the native `input` in `gasco-input`. Use this method instead of the global
   * `input.blur()`.
   * @internal
   */
  @Method()
  async setBlur() {
    if (this.nativeInput) {
      this.nativeInput.blur();
    }
  }

  /**
  * Returns the native `<input>` element used under the hood.
  */
  @Method()
  getInputElement(): Promise<HTMLInputElement> {
    return Promise.resolve(this.nativeInput!);
  }


  //? FUNCTIONs PRIVATEs
  private getValue(): string {
    return typeof this.value === 'number' ? this.value.toString() : (this.value || '').toString();
  }

  private onComposition = (v: boolean): void => {
    this.isComposing = v;
  };

  private emitStyle() {
    this.gascoStyle.emit({
      interactive: true,
      input: true,
      'has-placeholder': this.placeholder !== undefined,
      'has-value': this.hasValue(),
      'has-focus': this.hasFocus,
      'interactive-disabled': this.disabled,
    });
  };

  private onInput = (ev: Event) => {
    const input = ev.target as HTMLInputElement | null;
    if (input) {
      this.value = input.value || '';
    }
    this.gascoInput.emit(ev as InputEvent);
  };

  private onBlur = (ev: FocusEvent) => {
    this.hasFocus = false;
    this.emitStyle();

    if (this.fireFocusEvents) {
      this.gascoBlur.emit(ev);
    }
  };

  private hasValue(): boolean {
    return this.getValue().length > 0;
  };

  private onFocus = (ev: FocusEvent) => {
    this.hasFocus = true;
    this.emitStyle();

    if (this.fireFocusEvents) {
      this.gascoFocus.emit(ev);
    }
  };

  componentWillLoad() {
    this.inheritedAttributes = {
      ...inheritAriaAttributes(this.el),
      ...inheritAttributes(this.el, ['tabindex', 'title']),
    };
  }

  connectedCallback() {
    this.emitStyle();
    if (Build.isBrowser) {
      document.dispatchEvent(
        new CustomEvent('gascoInputDidLoad', {
          detail: this.el,
        })
      );
    }
  }

  componentDidLoad() {
    const nativeInput = this.nativeInput;
    if (nativeInput) {
      nativeInput.addEventListener('compositionstart', this.onComposition.bind(true));
      nativeInput.addEventListener('compositionend', this.onComposition.bind(false));
    }
  }

  disconnectedCallback() {
    if (Build.isBrowser) {
      document.dispatchEvent(
        new CustomEvent('gascoInputDidUnload', {
          detail: this.el,
        })
      );
    }
    const nativeInput = this.nativeInput;
    if (nativeInput) {
      nativeInput.removeEventListener('compositionstart', this.onComposition.bind(true));
      nativeInput.removeEventListener('compositionend', this.onComposition.bind(false));
    }
  }

  render() {
    const value = this.getValue();
    const labelId = this.inputId + '-lbl';
    const finalSize = this.size === undefined && false ? 'small' : this.size;
    return (
      <Host
        aria-disabled={this.disabled ? 'true' : null}
        class={createColorClasses(this.color, {
          'has-value': this.hasValue(),
          'has-focus': this.hasFocus,
          [`input-${finalSize}`]: finalSize !== undefined,
        })}>
        {this.label && (<span class="native-input-label">{this.label}</span>)}
        {this.indicator && (<span class="input-indicator-icon">+56</span>)}
        <slot name="start"></slot>
        <input
          class="native-input"
          ref={(input) => (this.nativeInput = input)}
          aria-labelledby={labelId ? labelId : null}
          disabled={this.disabled}
          autoCapitalize={this.autocapitalize}
          autoComplete={this.autocomplete}
          autoCorrect={this.autocorrect}
          autoFocus={this.autofocus}
          inputMode={this.inputmode}
          min={this.min}
          max={this.max}
          minLength={this.minlength}
          maxLength={this.maxlength}
          multiple={this.multiple}
          name={this.name}
          pattern={this.pattern}
          placeholder={this.placeholder || ''}
          readOnly={this.readonly}
          required={this.required}
          spellcheck={this.spellcheck}
          step={this.step}
          type={this.indicator ? 'tel' : this.type}
          value={value}
          onInput={this.onInput}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          {...this.inheritedAttributes}
        />
        <slot name="end"></slot>
        {this.textHelp && (<span class="native-input-textHelp">{this.textHelp}</span>)}
        {this.limit && (
          <span class="native-input-limit">
            {this.value.toString().length}/{this.maxlength}
          </span>
        )}
      </Host>
    );
  }
}

let inputIds = 0;