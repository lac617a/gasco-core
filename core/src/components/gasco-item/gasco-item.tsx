import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'gasco-item',
  styleUrl: 'gasco-item.css',
  shadow: true,
})
export class GascoItem {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
