import type { ComponentInterface, EventEmitter } from '@stencil/core';
import { Build, Component, Element, Event, Host, Prop, State, Watch, h } from '@stencil/core';

import type { Color, StyleEventDetail, InputChangeEventDetail } from '../../interface';
import type { Attributes } from '../../utils/helpers';
import { inheritAriaAttributes, inheritAttributes } from '../../utils/helpers';
import { createColorClasses } from '../../utils/theme';

@Component({
  tag: 'gasco-input-code',
  styleUrl: 'gasco-input-code.md.scss',
  scoped: true
})
export class GascoInputCode implements ComponentInterface {
  private isComposing = false;
  private arrayInput = new Array();
  private inheritedAttributes: Attributes = {};
  private inputId = 'gasco-input-code-';

  @Prop() fireFocusEvents: boolean = true;
  @State() hasFocus: boolean = false;
  @Element() el!: HTMLElement;

  /**
   * We can make everything automatic after completing the code for default is false.
   */
  @Prop() autosubmit: boolean = false;

  /**
   * The color to use from your application's color palette.
   * Default options are: `primary`, `secondary`, `tertiary`, `success`, `warning`, `danger`, `light`, and `dark`.
   */
  @Prop({reflect: true}) color?: Color;

  /**
   * This Boolean attributes lets you specify that a from control should have input focus when the page loads.
   */
  @Prop() autofocus = false;

  /**
   * If `true`, the user cannot interact with the input.
   */
  @Prop() disabled = false;

  /**
   * The type of control to display. The default type is `text`.
   */
  @Prop() type: 'text' | 'number' = 'text';

  /**
   * The Input size.
   */
  @Prop({ reflect: true }) size?: 'small' | 'default' | 'large';

  /**
   * The value of the input.
   */
  @Prop({mutable: true}) value?: string | number | null = '';

  /**
   * A hint to the browser for which keyboard to display.
   * Possible values: `none`, `text`.
   */
  @Prop() inputmode?: 'none' | 'text';

  /**
   * If the value of the type attribute is `text` or `numeric`, this attribute specifies the maximum number of characters that the user can enter.
   * Defaulf `4`
   */
  @Prop() maxlength?: number = 4;


  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name: string = this.inputId;

  /**
   * A regular expression that the value is checked against. The pattern must match the entire value, not just some subset. Use the title attribute to describe the pattern to help the user. This attribute applies when the value of the type attribute is `text`, `search`, `tel`, `url`, `email`, `"date"`, or `password`, otherwise it is ignored. When the type attribute is `date`, `pattern` will only be used in browsers that do not support the `date` input type natively.
   */
  @Prop() pattern?: string;

  /**
   * With secure what you are looking for is that the fields are not seen.
   * for default is true
   */
  @Prop() secure: boolean = true;

  /**
   * A simple count for the loop input
   */
  @State() count: number = 0;

  //? WATCHs
  @Watch('disabled')
  protected disabledChanged() {
    this.emitStyle();
  }

  //? EVENTs
  @Event() gascoCodeDone: EventEmitter;

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
  private onComposition = (v: boolean): void => {
    this.isComposing = v;
  };


  private getValue(): string {
    return typeof this.value === 'number' ? this.value.toString() : (this.value || '').toString();
  }

  private emitStyle() {
    this.gascoStyle.emit({
      interactive: true,
      input: true,
      'has-value': this.hasValue(),
      'has-focus': this.hasFocus,
      'interactive-disabled': this.disabled,
    });
  };

  private handleInput (input: HTMLInputElement) {
    this.el.childNodes.forEach((_, index) => {
      if (this.count - 1 === index) {
        const child = this.el.childNodes[index + 1]?.firstChild as HTMLInputElement;
        child?.focus();
        this.arrayInput[index] = input.value;
      }
    });
    if (input.value && !this.isComposing) {}
    
    if (this.autosubmit && this.arrayInput.join('').length === this.maxlength) {
      this.gascoCodeDone.emit({detail: this.arrayInput.join('')});
    }
    this.emitStyle();
    this.gascoChange.emit({ value: typeof this.value !== 'number'  ? this.value : this.value.toString() });
  }

  private onInput = (ev: Event) => {
    this.count += 1;
    const input = ev.target as HTMLInputElement | null;
    if (input) {
      this.value = input.value;
      this.handleInput(input);
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
    for (let i: number = 0; i < this.maxlength; i++) {
      this.arrayInput.push('');
    }
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
    const nativeInput = this.el.childNodes[0].firstChild;
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
    const nativeInput = this.el.childNodes[0].firstChild;
    if (nativeInput) {
      nativeInput.removeEventListener('compositionstart', this.onComposition.bind(true));
      nativeInput.removeEventListener('compositionend', this.onComposition.bind(false));
    }
  }

  render() {
    const finalSize = this.size === undefined && false ? 'small' : this.size;
    return (
      <Host
        aria-disabled={this.disabled ? 'true' : null}
        class={createColorClasses(this.color, {
          'has-value': this.hasValue(),
          'has-focus': this.hasFocus,
          [`input-${finalSize}`]: finalSize !== undefined,
        })}>
        {this.arrayInput.map((value, index) => (
          <div class="native-input-code">
            <input
              class="native-input code"
              aria-labelledby={this.name ? this.name + index : null}
              disabled={this.disabled}
              autoFocus={this.autofocus && index === 0}
              inputMode={this.inputmode}
              maxLength={1}
              name={this.name + index}
              pattern={this.pattern}
              type={this.type}
              value={value}
              placeholder={this.secure ? '*' : '0'}
              onInput={this.onInput}
              onBlur={this.onBlur}
              onFocus={this.onFocus}
              {...this.inheritedAttributes}
            />
          </div>
        ))}
      </Host>
    );
  }
}
