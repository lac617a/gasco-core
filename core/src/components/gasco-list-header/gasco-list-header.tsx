import type { ComponentInterface } from '@stencil/core';
import { Component, Host, Prop, h } from '@stencil/core';

import type { Color } from '../../interface';
import { createColorClasses } from '../../utils/theme';

@Component({
  tag: 'gasco-list-header',
  styleUrl: 'gasco-list-header.md.scss',
  shadow: true,
})
export class GascoListHeader implements ComponentInterface {
  /**
   * The color to use from your application's color palette.
   * Default options are: `"primary"`, `"secondary"`, `"success"`, `"warning"`, `"danger"`.
   */
  @Prop({ reflect: true }) color?: Color;

  /**
   * How the bottom border should be displayed on the list header.
   */
  @Prop() lines?: 'full' | 'inset' | 'none';

  render() {
    const { lines } = this;

    return (
      <Host
        class={createColorClasses(this.color, {
          [`list-header-lines-${lines}`]: lines !== undefined,
        })}
      >
        <div class="list-header-inner">
          <slot></slot>
        </div>
      </Host>
    );
  }
}
