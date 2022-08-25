import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'gasco-card',
  shadow: true,
})
export class GascoCard {

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
