import type { ComponentInterface } from '@stencil/core';
import { Component, Host, Prop, h, Element  } from '@stencil/core';

import type { Color } from '../../interface';
import { createColorClasses } from '../../utils/theme';

/**
 * @part native - The native HTML button, anchor, or div element that wraps all child elements.
 */
@Component({
  tag: 'gasco-card',
  styleUrl: 'gasco-card.md.scss',
  shadow: true,
})
export class GascoCard implements ComponentInterface {

  @Element() el!: HTMLElement;

  /**
   * The color to use from your application's color palette.
   * Default options are: `"primary"`, `"secondary"`, `"success"`, `"warning"` and `"danger"`.
   */
  @Prop({ reflect: true }) color?: Color;

  /**
   * If `true`, the user cannot interact with the card.
   */
  @Prop() disabled = false;

  /**
   * card direction, default is "vertical".
   */
  @Prop() direction?: 'horizontal' | 'horizontal-reverse' | 'vertical' = 'vertical';

  connectedCallback() {
    if(this.direction === 'horizontal' || this.direction === 'horizontal-reverse') {
      this.presentHorizontal();
    }
  }

  private presentHorizontal() {
    const newContainer = document.createElement('div');
    newContainer.classList.add('wrap-horizontal');
    [...this.el.children as any].filter(child => {
      if (child.tagName !== 'IMG') {
        return newContainer.appendChild(child);
      }
    });
    this.el.appendChild(newContainer);
  }

  render() {
    return (
      <Host
        class={createColorClasses(this.color, {
          'card-disabled': this.disabled,
          [`card-${this.direction}`]: true,
        })}
      >
        <div
          class="card-native"
          part="native">
          <slot></slot>
        </div>
      </Host>
    );
  }
}
