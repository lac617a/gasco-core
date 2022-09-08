import type { ComponentInterface, EventEmitter } from '@stencil/core';
import { Component, Event, Host, Listen, Prop, h } from '@stencil/core';

@Component({
  tag: 'gasco-tooltip',
  styleUrl: 'gasco-tooltip.scss',
  shadow: true,
})
export class GascoTooltip implements ComponentInterface {

  private tooltipRef!: HTMLDivElement;

  /**
   * If `true`, the tooltip will be visible.
   */
  @Prop() visible = true;

  /**
   * If `true`, the tooltip will be visible.
   */
  @Prop() label?: string;

  /**
   * If `true`, the tooltip will be position.
   */
  @Prop() position?: 'top' | 'bottom' = 'top';

  /**
   * If `true`, the tooltip will can be clicked and will emit the `gascoTooltip` event.
   */
  @Prop() tappable = true;

  /**
   * If `true`, the tooltip will stop propagation on tap.
   */
  @Prop() stopPropagation = true;

  /**
   * Emitted when the tooltip is tapped.
   */
  @Event() gascoTooltip!: EventEmitter<void>;


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
      this.gascoTooltip.emit();
    }
  }

  componentDidLoad(): void {
    setTimeout(() => {
      const div_height = this.tooltipRef.offsetHeight;
      console.log(div_height);
      if (this.position === 'top') {
        this.tooltipRef.style.transform = `translateY(-${Math.ceil((div_height * 2) / 2)}px)`;
      } else {
        this.tooltipRef.style.transform = `translateY(${Math.ceil((div_height * 2) / 1.9)}px)`;
      }
    }, 1000);
  }

  render() {
    return (
      <Host
        tabindex="-1"
        aria-hidden="true"
        class={{
          'tooltip-hide': !this.visible,
          'tooltip-no-tappable': !this.tappable,
          'gasco-tooltip': true
        }}
      >
        <div ref={(focusEl) => (this.tooltipRef = focusEl)}
          class={{
            'tooltip-show': true,
            [`tooltip-${this.position}`]: true
          }}>{this.label}</div>
        <slot></slot>
      </Host>
    );
  }
}
