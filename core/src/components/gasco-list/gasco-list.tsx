import type { ComponentInterface } from '@stencil/core';
import { Component, Element, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'gasco-list',
  styleUrl: 'gasco-list.md.scss',
})
export class List implements ComponentInterface {
  @Element() el!: HTMLElement;

  /**
   * How the bottom border should be displayed on all items.
   */
  @Prop() lines?: 'full' | 'inset' | 'none';

  /**
   * If `true`, the list will have margin around it and rounded corners.
   */
  @Prop() inset = false;

  render() {
    const { lines, inset } = this;
    return (
      <Host
        role="list"
        class={{
          'list-inset': inset,
          [`list-lines-${lines}`]: lines !== undefined,
        }}
      ></Host>
    );
  }
}
