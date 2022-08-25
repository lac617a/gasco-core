import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'gasco-divider',
  shadow: true,
})
export class GascoDivider {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
