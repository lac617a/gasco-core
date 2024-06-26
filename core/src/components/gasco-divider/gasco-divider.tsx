import type { ComponentInterface } from '@stencil/core';
import { Component, Host, h, Prop } from '@stencil/core';
import type { Color } from '../../interface';
import { createColorClasses } from '../../utils/theme';

@Component({
  tag: 'gasco-divider',
  styleUrl: 'gasco-divider.scss',
  scoped: true,
})
export class GascoDivider implements ComponentInterface {

  /**
   * The color to use from your application's color palette.
   * Default options are: `"primary"`, `"secondary"`, `"success"`, `"warning"` and `"danger"`.
   */
  @Prop({ reflect: true }) color?: Color = 'primary';

  /**
   * The Divider shape.
   */
  @Prop({ reflect: true }) shape?: 'round';

  render() {
    return (
      <Host
        class={createColorClasses(this.color, {
          [`divider-${this.shape}`]: this.shape !== undefined,
          'gasco-activatable': true,
      })}>
        <div class="divider-native"></div>
      </Host>
    );
  }

}
