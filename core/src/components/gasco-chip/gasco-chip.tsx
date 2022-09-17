import type { ComponentInterface, EventEmitter } from '@stencil/core';
import { Component, Host, Prop, h, State, Event } from '@stencil/core';

import type { Color } from '../../interface';
import { createColorClasses } from '../../utils/theme';

@Component({
  tag: 'gasco-chip',
  styleUrl: 'gasco-chip.md.scss',
  shadow: true,
})
export class GascoChip implements ComponentInterface {
  private outline: boolean = true;
  private chipId = `gasco-chip-${chipIds++}`;

  /**
   * The color to use from your application's color palette.
   * Default options are: `"primary"`, `"secondary"`, `"success"`, `"warning"` and `"danger"`.
   */
  @Prop({ reflect: true }) color?: Color = 'primary';


  /**
   * If `true`, the user cannot interact with the chip.
   */
  @Prop() disabled: boolean = false;

  /**
   * The button size.
   */
  @Prop({ reflect: true }) size?: 'small' | 'default' | 'large';


  @State() isActive: boolean = false;

  /**
  * Emitted when the chip has focus.
  */
  @Event() gascoFocus!: EventEmitter<void>;

  /**
  * Emitted when the chip loses focus.
  */
  @Event() gascoBlur!: EventEmitter<void>;

  private onClick(ev: Event) {

    ev.preventDefault();
    this.isActive = !this.isActive;
  }

  private onFocus = () => {
    this.gascoFocus.emit();
  };

  private onBlur = () => {
    this.gascoBlur.emit();
  };


  render() {
    const finalSize = this.size === undefined && false ? 'small' : this.size;

    return (
      <Host
        id={this.chipId}
        onBlur={this.onBlur}
        onClick={this.onClick}
        onFocus={this.onFocus}
        aria-disabled={this.disabled ? 'true' : null}
        class={
          createColorClasses(this.color, {
            [`chip-${finalSize}`]: finalSize !== undefined,
            'chip-outline': this.outline,
            'chip-disabled': this.disabled,
            }
          )}
        >
        <slot></slot>
      </Host>
    );
  }
}

let chipIds = 0;
