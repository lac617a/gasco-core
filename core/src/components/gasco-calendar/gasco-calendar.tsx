import type { EventEmitter, ComponentInterface } from '@stencil/core';
import { Component, Host, h, Event, State, Element, Prop, Listen } from '@stencil/core';
import { InputChangeEventDetail } from '../gasco-input/gasco-input-interface';

@Component({
  tag: 'gasco-calendar',
  styleUrl: 'gasco-calendar.scss',
  shadow: true,
})
export class GascoCalendar implements ComponentInterface {

  @Element() el!: HTMLGascoCalendarElement;

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

  @Listen('gascoChangeDatetime')
  handleDatetimeReady(ev: CustomEvent) {
    const value = ev.detail.value;

    if (value !== '') {
      this.onBlur(ev as unknown as FocusEvent);
    }

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
  }

  @Listen('click', {target: 'window'})
  protected handleClickWindow(e: Event) {
    if (!this.el.contains((e.target as HTMLElement)) && this.showCalendar) {
      this.onBlur(e as FocusEvent);
    }
  }

  render() {
    const {onFocus, showCalendar, inputValue} = this
    return (
      <Host
        // onBlur={onBlur}
        onFocus={onFocus}
        class={{
          'gasco-color': true,
          'gasco-calendar': true,
          'has-focus': this.hasFocus,
          'gasco-color-primary': true,
        }}
      >
        <div class="native-calendar" part="native">
          <gasco-input label="Selecciona una fecha" class="input-datetime" value={inputValue} readonly>
            <ion-icon name="calendar-number-outline" slot="end"></ion-icon>
          </gasco-input>
          {showCalendar && <gasco-datetime size="cover"></gasco-datetime>}
        </div>
      </Host>
    );
  }

}
