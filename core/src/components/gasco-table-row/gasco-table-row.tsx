import type { ComponentInterface } from '@stencil/core';
import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'gasco-table-row',
  styleUrl: 'gasco-table-row.scss',
  scoped: true,
})
export class GascoTableRow implements ComponentInterface {
  @Prop() header?: boolean = false;

  render() {
    return (
      <Host role="row" class={{
        'table-row': true,
        [`table-row-header`]: this.header
      }}>
        <slot></slot>
      </Host>
    );
  }

}
