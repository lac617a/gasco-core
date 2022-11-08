import type { ComponentInterface } from '@stencil/core';
import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'gasco-avatar',
  styleUrl: 'gasco-avatar.md.scss',
  scoped: true,
})
export class GascoAvatar implements ComponentInterface {
  @Prop() src!: string;
  @Prop() alt!: string;

  render() {
    const { src, alt } = this;

    return (
      <figure class="avatar-native" part="native">
        <img class="avatar-img" src={src} alt={alt} />
        <figcaption>
          <slot></slot>
        </figcaption>
      </figure>
    );
  }
}
