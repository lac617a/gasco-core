import type { ComponentInterface } from '@stencil/core';
import { Component, Host, Prop, h } from '@stencil/core';

import type { Color } from '../../interface';
import { createColorClasses } from '../../utils/theme';

@Component({
  tag: 'gasco-dialog-title',
  styleUrl: 'gasco-dialog-title.md.scss',
  shadow: true,
})
export class GascoDialogTitle implements ComponentInterface {
  /**
   * The color to use from your application's color palette.
   * Default options are: `"primary"`, `"secondary"`, `"success"`, `"warning"` and `"danger"`.
   */
  @Prop({ reflect: true }) color?: Color;

  render() {
    return (
      <Host
        role="heading"
        aria-level="2"
        class={createColorClasses(this.color, {
          'gasco-inherit-color': true,
        })}
      >
        <slot></slot>
      </Host>
    );
  }
}
