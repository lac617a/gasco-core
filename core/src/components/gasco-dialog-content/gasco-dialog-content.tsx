import type { ComponentInterface } from '@stencil/core';
import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'gasco-dialog-content',
  styleUrl: 'gasco-dialog-content.md.scss',
})
export class GascoDialogContent implements ComponentInterface {
  render() {
    return (
      <Host
        class={{
          // Used internally for styling
          [`dialog-content`]: true,
        }}
      ></Host>
    );
  }
}
