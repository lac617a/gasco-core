import type { ComponentInterface } from '@stencil/core';
import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'gasco-accordion-content',
  styleUrl: 'gasco-accordion-content.scss',
})
export class GascoAccordionContent implements ComponentInterface {
  render() {
    return <Host class="card-content"><slot></slot></Host>;
  }
}
