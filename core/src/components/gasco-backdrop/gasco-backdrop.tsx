import type { ComponentInterface, EventEmitter } from '@stencil/core';
import { Component, Event, Host, Listen, Prop, h } from '@stencil/core';

import { GESTURE_CONTROLLER } from '../../utils/gesture';

@Component({
  tag: 'gasco-backdrop',
  styleUrl: 'gasco-backdrop.md.scss',
  shadow: true,
})
export class GascoBackdrop implements ComponentInterface {
  private blocker = GESTURE_CONTROLLER.createBlocker({
    disableScroll: true,
  });

  /**
   * If `true`, the backdrop will be visible.
   */
  @Prop() visible = true;

  /**
   * If `true`, the backdrop will can be clicked and will emit the `gascoBackdropTap` event.
   */
  @Prop() tappable = true;

  /**
   * If `true`, the backdrop will stop propagation on tap.
   */
  @Prop() stopPropagation = true;

  /**
   * Emitted when the backdrop is tapped.
   */
  @Event() gascoBackdropTap!: EventEmitter<void>;

  connectedCallback() {
    if (this.stopPropagation) {
      this.blocker.block();
    }
  }

  disconnectedCallback() {
    this.blocker.unblock();
  }

  @Listen('click', { passive: false, capture: true })
  protected onMouseDown(ev: TouchEvent) {
    this.emitTap(ev);
  }

  private emitTap(ev: Event) {
    if (this.stopPropagation) {
      ev.preventDefault();
      ev.stopPropagation();
    }
    if (this.tappable) {
      this.gascoBackdropTap.emit();
    }
  }

  render() {
    return (
      <Host
        tabindex="-1"
        aria-hidden="true"
        class={{
          'backdrop-hide': !this.visible,
          'backdrop-no-tappable': !this.tappable,
        }}
      ></Host>
    );
  }
}
