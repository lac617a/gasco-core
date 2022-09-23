import type { ComponentInterface, EventEmitter } from '@stencil/core';
import { Component, Event, Host, Listen, Prop, Element, h } from '@stencil/core';

@Component({
  tag: 'gasco-tooltip',
  styleUrl: 'gasco-tooltip.scss',
  shadow: true,
})
export class GascoTooltip implements ComponentInterface {

  private tooltipRef!: HTMLDivElement;
  private selectorRef!: HTMLSpanElement;
  private tooltipSlotRef!: HTMLDivElement;
  

  @Element() el!: HTMLElement;

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

  @Listen('resize', {target: 'window'})
  handleResize() {
    this.handleTootltipResize();
  }
  
  componentDidLoad(): void {
    setTimeout(() => this.handleTootltipResize(), 800);
  }

  private handleTootltipResize() {
    const clientWidth = document.documentElement.clientWidth;
    const {height, left} = this.tooltipRef.getClientRects()[0];
    const slot = this.tooltipSlotRef.offsetHeight;

    const divStyle = this.tooltipRef.style;
    const selector = this.selectorRef;

    const translateTop = height + slot;
    const translateBottom = height + slot;

    if (clientWidth > 480) {
      if (this.position === 'top') {
        divStyle.transform = `translateY(-${translateTop}px)`;
      } else {
        divStyle.transform = `translateY(${translateBottom}px)`;
      }
    } else {
      selector.style.left = `${left / 2}px`;
      if (this.position === 'top') {
        divStyle.transform = `
          translate(-${Math.ceil(clientWidth / 5)}px, -${translateTop}px) scale(0.9)`;
      } else {
        divStyle.transform = `
        translate(-${Math.ceil(clientWidth / 5)}px, ${translateBottom}px) scale(0.9)`;
      }
    }
  }

  render() {
    return (
      <Host
        tabindex="0"
        aria-hidden="true"
        aria-role="button"
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
          }}>
            <span ref={(focusEl) => (this.selectorRef = focusEl)} class="selector"></span>
            {this.label}
          </div>
        <div style={{display: 'inline'}} ref={(focusEl) => (this.tooltipSlotRef = focusEl)}><slot></slot></div>
      </Host>
    );
  }
}
