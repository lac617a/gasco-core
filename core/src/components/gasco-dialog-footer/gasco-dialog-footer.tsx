import type { ComponentInterface } from '@stencil/core';
import { Component, Host, Prop, h } from '@stencil/core';
import { createColorClasses } from '../../utils/theme';

@Component({
  tag: 'gasco-dialog-footer',
  styleUrl: 'gasco-dialog-footer.md.scss',
  shadow: true,
})
export class GascoDialogFooter implements ComponentInterface {

  /**
   * If `true`, the card footer will be translucent.
   */
  @Prop() translucent: boolean = false;

  /**
   * If `true`, the card footer will be line.
   */
  @Prop() line?: boolean = false;

  /**
   * If `true`, the card footer will be line.
   */
  @Prop() position?: 'left' | 'right' = 'right';

  render() {
    return (
      <Host
        class={createColorClasses(null, {
          'gasco-inherit-color': true,
          'dialog-footer-line': this.line,
          [`dialog-footer-${this.position}`]: true,
          'dialog-footer-translucent': this.translucent,
        })}>
        <slot></slot>
      </Host>
    );
  }
}
