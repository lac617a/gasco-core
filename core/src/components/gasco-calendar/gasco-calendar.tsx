import type  { EventEmitter, ComponentInterface } from '@stencil/core';
import { Component, Host, h, Event, State, Prop, Listen } from '@stencil/core';
import { InputChangeEventDetail } from '../gasco-input/gasco-input-interface';

@Component({
  tag: 'gasco-calendar',
  styleUrl: 'gasco-calendar.scss',
  shadow: true,
})
export class GascoCalendar implements ComponentInterface {
  @Prop() fireFocusEvents = true;

  @State() hasFocus = false;
  @State() showCalendar = false;
  @State() inputValue: string = '';

  /**
   * Emitted when the value has changed.
   */
  @Event() gascoChangeValue!: EventEmitter<InputChangeEventDetail>;

  /**
   * Emitted when the input loses focus.
   */
  @Event() gascoBlur!: EventEmitter<FocusEvent>;

  /**
   * Emitted when the input has focus.
   */
  @Event() gascoFocus!: EventEmitter<FocusEvent>;

  @Listen('gascoDatetimeReady')
  handleDatetimeReady(ev: CustomEvent) {
    const {month, day, year} = ev.detail;
    const value = `${day}/${month}/${year}`;

    this.inputValue = value;
    this.gascoChangeValue.emit({value});
  }

  private onFocus = (ev: FocusEvent) => {
    this.hasFocus = true;
    if (!this.showCalendar) {
      this.showCalendar = true;
    }

    if (this.fireFocusEvents) {
      this.gascoFocus.emit(ev);
    }
  };

  private onBlur = (ev: FocusEvent) => {
    this.hasFocus = false;

    if (this.showCalendar) {
      this.showCalendar = false;
    }

    if (this.fireFocusEvents) {
      this.gascoBlur.emit(ev);
    }
  };

  render() {
    const {onFocus, onBlur, showCalendar, inputValue} = this
    return (
      <Host
        onBlur={onBlur}
        onFocus={onFocus}
        class={{
          ['gasco-color']: true,
          ['gasco-calendar']: true,
          ['gasco-color-primary']: true,
          'has-focus': this.hasFocus,
        }}
      >
        <div class="native-calendar" part="native">
          <gasco-input class="input-datetime" value={inputValue} readonly>
            <ion-icon name="calendar-number-outline" slot="end"></ion-icon>
          </gasco-input>
          {showCalendar && <gasco-datetime size="cover"></gasco-datetime>}
        </div>
      </Host>
    );
  }

}
