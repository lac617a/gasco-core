import type { ComponentInterface } from '@stencil/core';
import { Component, Host, Prop, h } from '@stencil/core';

import type { Color } from '../../interface';
import { createColorClasses } from '../../utils/theme';

@Component({
  tag: 'gasco-chip',
  styleUrl: 'gasco-chip.md.scss',
  shadow: true,
})
export class GascoChip implements ComponentInterface {
  /**
   * The color to use from your application's color palette.
   * Default options are: `"primary"`, `"secondary"`, `"success"`, `"warning"`, `"danger"`.
   */
  @Prop({ reflect: true }) color?: Color;

  /**
   * Display an outline style button.
   */
  @Prop() outline = false;

  /**
   * If `true`, the user cannot interact with the chip.
   */
  @Prop() disabled = false;

  render() {
    return (
      <Host
        aria-disabled={this.disabled ? 'true' : null}
        class={createColorClasses(this.color, {
          'chip-outline': this.outline,
          'chip-disabled': this.disabled,
          'gasco-activatable': true,
        })}
      >
        <slot></slot>
      </Host>
    );
  }
}
