import { ComponentInterface, EventEmitter } from '@stencil/core';
import { Component, Host, h, Prop, State, Element, Event } from '@stencil/core';
import { hostContext } from '../../utils/theme';
import { IChoiceDetail, IChoiceProp } from './gasco-select-interface';
import { chevronDown, chevronUp } from 'ionicons/icons';

@Component({
  tag: 'gasco-select',
  styleUrl: 'gasco-select.scss',
  shadow: true
})
export class GascoSelect implements ComponentInterface {
  private selectId = `gasco-sel-${selectIds++}`;
  private element: any[] = [];
  
  @State() value?: string;
  @State() isChecked?: string[];

  @Element() el!: HTMLGascoSelectElement;

  @Prop() type?: 'single' | 'multiple' = 'single';
  @Prop({reflect: true}) choices?: IChoiceProp[];

  /**
   * The name of the control, which is submitted with the form data.
   */
  @Prop() name: string = this.selectId;

  /**
   * If `true`, the user cannot interact with the select.
   */
  @Prop() disabled = false;

  /**
   * Instructional text that show before the input has a value.
   */
  @Prop() placeholder?: string = 'Seleccione un elemento';

  /**
   * Instructional text that show before the input has a value.
   * The Input label.
   */
  @Prop() label?: string;

  @State() isExpanded = false;

  @Event() gascoReady!: EventEmitter;
  @Event() gascoChangeSelect!: EventEmitter<IChoiceDetail>;

  componentWillLoad() {
    this.gascoReady.emit();
  }

  componentDidLoad() {
    this.getChoices();
  }


  private onClick = () => {
    // if (this.disabled || this.isExpanded) {
    //   return undefined;
    // }
    if (!this.isExpanded) {
      this.isExpanded = true;
    } else {
      this.isExpanded = false;
    }
  };

  private onSelect(e: Event, label: string, value: string) {
    e.preventDefault();
    
    if (this.type === 'single') {
      e.stopPropagation();
      this.value = label;
      return;
    }
    
    const isItem = this.element.some(item => label === item.label);
    
    if(isItem) {
      var newArray = this.element.filter(item => item.label !== label);
      this.element = newArray;
    } else {
      this.element.push({label, value});
    }
    const getLabel = this.element.map(item => item.label);
    const getValue = this.element.map(item => item.value);

    this.value = this.parseValue(getLabel);
    this.gascoChangeSelect.emit({target: this.el, detail: getValue.join(',')});
    e.stopPropagation();
  }
  
  private parseValue(value: string[]) {
    if (value == null) {
      return undefined;
    }
    if (Array.isArray(value) && value.length > 1) {
      return value.join(', ');
    }
    return value.join('');
  }


  private getChoices() {
    const pageSelects = this.choices
      ? this.choices.map((choice) => {
        return choice;
      })
      : [];
    return pageSelects;
  }

  render() {
    const {el, isExpanded, disabled, value: v, type, placeholder, label} = this;

    return (
      <Host
        role="button"
        aria-haspopup="listbox"
        aria-disabled={disabled ? 'true' : null}
        class={{
          'in-item': hostContext('gasco-item', el),
          'select-disabled': disabled,
          'select-expanded': isExpanded,
          'gasco-color': true,
          'gasco-color-primary': true
        }}
      >
        <div class="select-native">
          <gasco-input
            readonly
            value={v}
            label={label}
            onClick={this.onClick}
            placeholder={placeholder}>
            <ion-icon slot="end" icon={isExpanded ? chevronUp : chevronDown}></ion-icon>
          </gasco-input>
          <gasco-list>
            {this.getChoices().length > 0 && isExpanded && (
              this.getChoices().map(({ label, value, disabled }) => (
                <gasco-item disabled={disabled} onClick={(e) => this.onSelect(e, label, value)}>
                  {/* {startIcon && <ion-icon name={startIcon} slot="start"></ion-icon>} */}
                  {type !== 'single' &&
                    <gasco-checkbox
                      slot="start"
                      color="primary"
                      checked={this.element.some(item => item.label === label)}></gasco-checkbox>
                  }
                  {label}
                </gasco-item>
              ))
            )}
          </gasco-list>
        </div>
      </Host>
    );
  }
}

let selectIds = 0;