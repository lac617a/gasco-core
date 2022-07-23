import type { ComponentInterface, EventEmitter } from '@stencil/core';
import { Build, Component, Element, Event, Host, Method, Prop, State, Watch, h } from '@stencil/core';

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
  private nativeInput?: HTMLInputElement;
  private inheritedAttributes: Attributes = {};
  private inputId = 'gasco-input-code-';

  @Prop() fireFocusEvents = true;
  @Prop() autosubmit = false;
  @State() hasFocus = false;
  @Element() el!: HTMLElement;

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
   * A simple count for the loop input
   */
  @State() count: number = 0;

  //? WATCHs
  @Watch('disabled')
  protected disabledChanged() {
    this.emitStyle();
  }

  /**
    * Update the native input element when the value changes
    */
  @Watch('value')
  protected valueChanged(current: string | number) {
    this.count += 1;
    let nativeInput = this.nativeInput;
    const value = this.getValue();

    this.el.childNodes.forEach((_, index) => {
      if (this.count - 1 === index) {
        nativeInput = this.el.childNodes[index + 1]?.firstChild as HTMLInputElement;
        this.arrayInput[index] = current;
      }
    });

    if (nativeInput && nativeInput.value !== value && !this.isComposing) {
      nativeInput.focus();
    }
    
    if (this.autosubmit && this.arrayInput.join('').length === this.maxlength) {
      this.gascoCodeDone.emit(this.arrayInput.join(''));
    }

    this.emitStyle();
    this.gascoChange.emit({ value: typeof this.value !== 'number'  ? this.value : this.value.toString() });
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

  /**
  * Returns the native `<input>` element used under the hood.
  */
  @Method()
  getInputElement(): Promise<HTMLInputElement> {
    return Promise.resolve(this.nativeInput!);
  }

  private onComposition = (v: boolean): void => {
    this.isComposing = v;
  };

  //? FUNCTIONs PRIVATEs

  private handlePaste = (ev: ClipboardEvent) => {
    let pasted = ev.clipboardData.getData('text') || null;
    pasted = pasted.replace(/\D/g, "");
    pasted = pasted.substring(0, this.maxlength);
    
    if (pasted) {
      this.arrayInput = pasted.split('');
    }
  };

  private handleType = (ev: KeyboardEvent, index: number) => {
    if (ev.code == '8') {
      ev.stopPropagation();
      ev.preventDefault();
      this.arrayInput[index - 1] = 0;
    } else {
      let key = ev.key.replace(/\D/g, "");
      if(key !== '') {
        this.arrayInput[index - 1] = key;
      }
    }
  };

  private handleGoto = (index: number) => {
    if (!index || index > this.maxlength) {
      index = 1;
    }
    this.emitStyle();
  }


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
    return (
      <Host
        aria-disabled={this.disabled ? 'true' : null}
        class={createColorClasses(this.color, {
          'has-value': this.hasValue(),
          'has-focus': this.hasFocus,
        })}>
        {this.arrayInput.map((value, index) => (
          <div class="native-input-code">
            <input
              class="native-input code"
              aria-labelledby={this.name ? this.name + index : null}
              ref={input => this.nativeInput = input}
              disabled={this.disabled}
              autoFocus={this.autofocus && index === 0}
              inputMode={this.inputmode}
              maxLength={1}
              name={this.name + index}
              pattern={this.pattern}
              type={this.type}
              value={value}
              placeholder="0"
              onPaste={this.handlePaste}
              onKeyDown={(e) => this.handleType(e, inputIds)}
              onKeyDownCapture={() => this.handleGoto(inputIds)}
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

let inputIds = 0;
