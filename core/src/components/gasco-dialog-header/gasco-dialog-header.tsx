import type { ComponentInterface } from '@stencil/core';
import { Component, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'gasco-dialog-header',
  styleUrl: 'gasco-dialog-header.md.scss',
  shadow: true,
})
export class GascoDialogHeader implements ComponentInterface {

  /**
   * If `true`, the dialog header will be translucent.
   */
  @Prop() translucent = false;

  render() {
    return (
      <Host
        class={{
          'dialog-header-translucent': this.translucent,
          'gasco-inherit-color': true,
        }}>
        <slot></slot>
      </Host>
    );
  }
}
