import type { ComponentInterface } from '@stencil/core';
import { Component, Host, Prop, h } from '@stencil/core';

import type { Color } from '../../interface';
import { createColorClasses } from '../../utils/theme';

@Component({
  tag: 'gasco-card-header',
  styleUrl: 'gasco-card-header.md.scss',
  shadow: true,
})
export class GascoCardHeader implements ComponentInterface {
  /**
   * The color to use from your application's color palette.
   * Default options are: `"primary"`, `"secondary"`, `"success"`, `"warning"` and `"danger"`.
   */
  @Prop({ reflect: true }) color?: Color;

  /**
   * If `true`, the card header will be translucent.
   */
  @Prop() translucent = false;

  render() {
    return (
      <Host
        class={createColorClasses(this.color, {
          'card-header-translucent': this.translucent,
          'gasco-inherit-color': true,
        })}
      >
        <slot></slot>
      </Host>
    );
  }
}
