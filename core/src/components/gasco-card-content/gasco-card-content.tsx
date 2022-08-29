import type { ComponentInterface } from '@stencil/core';
import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'gasco-card-content',
  styleUrl: 'gasco-card-content.md.scss',
})
export class GascoCardContent implements ComponentInterface {
  render() {
    return (
      <Host
        class={{
          // Used internally for styling
          [`card-content`]: true,
        }}
      ></Host>
    );
  }
}
