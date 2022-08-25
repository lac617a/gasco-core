import type { ComponentInterface, EventEmitter } from '@stencil/core';
import { Component, Element, Event, Host, Listen, Prop, State, Watch, h, writeTask } from '@stencil/core';

import type { Color, SegmentChangeEventDetail, StyleEventDetail } from '../../interface';
import type { Gesture, GestureDetail } from '../../utils/gesture';
import { isRTL } from '../../utils/rtl';
import { createColorClasses, hostContext } from '../../utils/theme';

@Component({
  tag: 'gasco-tab',
  styleUrl: 'gasco-tab.md.scss',
  shadow: true,
})
export class GascoTab implements ComponentInterface {
  private gesture?: Gesture;
  private didInit = false;
  private checked?: HTMLGascoTabButtonElement;

  // Value to be emitted when gesture ends
  private valueAfterGesture?: any;

  @Element() el!: HTMLGascoTabElement;

  @State() activated = false;

  /**
   * The color to use from your application's color palette.
   * Default options are: `"primary"`, `"secondary"`, `"success"`, `"warning"` and `"danger"`.
   */
  @Prop({ reflect: true }) color?: Color = 'primary';
  @Watch('color')
  protected colorChanged(value?: Color, oldValue?: Color) {
    /**
     * If color is set after not having
     * previously been set (or vice versa),
     * we need to emit style so the segment-buttons
     * can apply their color classes properly.
     */
    if ((oldValue === undefined && value !== undefined) || (oldValue !== undefined && value === undefined)) {
      this.emitStyle();
    }
  }

  /**
   * If `true`, the user cannot interact with the segment.
   */
  @Prop() disabled = false;

  /**
   * If `true`, the segment buttons will overflow and the user can swipe to see them.
   * In addition, this will disable the gesture to drag the indicator between the buttons
   * in order to swipe to see hidden buttons.
   */
  @Prop() scrollable = false;

  /**
   * If `true`, users will be able to swipe between segment buttons to activate them.
   */
  @Prop() swipeGesture = true;

  @Watch('swipeGesture')
  swipeGestureChanged() {
    this.gestureChanged();
  }

  /**
   * the value of the segment.
   */
  @Prop({ mutable: true }) value?: string | null;

  @Watch('value')
  protected valueChanged(value: string | undefined, oldValue: string | undefined | null) {
    this.gascoSelect.emit({ value });
    if (oldValue !== '' || this.didInit) {
      if (!this.activated) {
        this.gascoChange.emit({ value });
      } else {
        this.valueAfterGesture = value;
      }
    }
  }

  /**
   * If `true`, navigating to an `GASCO-TAB-button` with the keyboard will focus and select the element.
   * If `false`, keyboard navigation will only focus the `GASCO-TAB-button` element.
   */
  @Prop() selectOnFocus = false;

  /**
   * Emitted when the value property has changed and any
   * dragging pointer has been released from `GASCO-TAB`.
   */
  @Event() gascoChange!: EventEmitter<SegmentChangeEventDetail>;

  /**
   * Emitted when user has dragged over a new button
   * @internal
   */
  @Event() gascoSelect!: EventEmitter<SegmentChangeEventDetail>;

  /**
   * Emitted when the styles change.
   * @internal
   */
  @Event() gascoStyle!: EventEmitter<StyleEventDetail>;

  @Watch('disabled')
  disabledChanged() {
    this.gestureChanged();

    const buttons = this.getButtons();
    for (const button of buttons) {
      button.disabled = this.disabled;
    }
  }

  private gestureChanged() {
    if (this.gesture) {
      this.gesture.enable(!this.scrollable && !this.disabled && this.swipeGesture);
    }
  }

  connectedCallback() {
    this.emitStyle();
  }

  componentWillLoad() {
    this.emitStyle();
  }

  async componentDidLoad() {
    this.setCheckedClasses();
    this.ensureFocusable();

    this.gesture = (await import('../../utils/gesture')).createGesture({
      el: this.el,
      gestureName: 'segment',
      gesturePriority: 100,
      threshold: 0,
      passive: false,
      onStart: (ev) => this.onStart(ev),
      onMove: (ev) => this.onMove(ev),
      onEnd: (ev) => this.onEnd(ev),
    });
    this.gestureChanged();

    if (this.disabled) {
      this.disabledChanged();
    }
    this.didInit = true;
  }

  onStart(detail: GestureDetail) {
    this.activate(detail);
  }

  onMove(detail: GestureDetail) {
    this.setNextIndex(detail);
  }

  onEnd(detail: GestureDetail) {
    this.setActivated(false);

    detail.event.stopImmediatePropagation();

    const value = this.valueAfterGesture;
    if (value !== undefined) {
      this.gascoChange.emit({ value });
      this.valueAfterGesture = undefined;
    }
  }

  private getButtons() {
    return Array.from(this.el.querySelectorAll('gasco-tab-button'));
  }

  /*
   * Activate both the segment and the buttons
   * due to a bug with ::slotted in Safari
   */
  private setActivated(activated: boolean) {
    const buttons = this.getButtons();

    buttons.forEach((button) => {
      if (activated) {
        button.classList.add('segment-button-activated');
      } else {
        button.classList.remove('segment-button-activated');
      }
    });
    this.activated = activated;
  }

  private activate(detail: GestureDetail) {
    const clicked = detail.event.target as HTMLGascoTabButtonElement;
    const buttons = this.getButtons();
    const checked = buttons.find((button) => button.value === this.value);

    // Make sure we are only checking for activation on a segment button
    // since disabled buttons will get the click on the segment
    if (clicked.tagName !== 'GASCO-TAB-BUTTON') {
      return;
    }

    // If there are no checked buttons, set the current button to checked
    if (!checked) {
      this.value = clicked.value;
      this.setCheckedClasses();
    }

    // If the gesture began on the clicked button with the indicator
    // then we should activate the indicator
    if (this.value === clicked.value) {
      this.setActivated(true);
    }
  }

  private getIndicator(button: HTMLGascoTabButtonElement): HTMLDivElement | null {
    const root = button.shadowRoot || button;
    return root.querySelector('.segment-button-indicator');
  }

  private checkButton(previous: HTMLGascoTabButtonElement, current: HTMLGascoTabButtonElement) {
    const previousIndicator = this.getIndicator(previous);
    const currentIndicator = this.getIndicator(current);

    if (previousIndicator === null || currentIndicator === null) {
      return;
    }

    const previousClientRect = previousIndicator.getBoundingClientRect();
    const currentClientRect = currentIndicator.getBoundingClientRect();

    const widthDelta = previousClientRect.width / currentClientRect.width;
    const xPosition = previousClientRect.left - currentClientRect.left;

    // Scale the indicator width to match the previous indicator width
    // and translate it on top of the previous indicator
    const transform = `translate3d(${xPosition}px, 0, 0) scaleX(${widthDelta})`;

    writeTask(() => {
      // Remove the transition before positioning on top of the previous indicator
      currentIndicator.classList.remove('segment-button-indicator-animated');
      currentIndicator.style.setProperty('transform', transform);

      // Force a repaint to ensure the transform happens
      currentIndicator.getBoundingClientRect();

      // Add the transition to move the indicator into place
      currentIndicator.classList.add('segment-button-indicator-animated');

      // Remove the transform to slide the indicator back to the button clicked
      currentIndicator.style.setProperty('transform', '');
    });

    this.value = current.value;
    this.setCheckedClasses();
  }

  private setCheckedClasses() {
    const buttons = this.getButtons();
    const index = buttons.findIndex((button) => button.value === this.value);
    const next = index + 1;

    // Keep track of the currently checked button
    this.checked = buttons.find((button) => button.value === this.value);

    for (const button of buttons) {
      button.classList.remove('segment-button-after-checked');
    }
    if (next < buttons.length) {
      buttons[next].classList.add('segment-button-after-checked');
    }
  }

  private setNextIndex(detail: GestureDetail, isEnd = false) {
    const rtl = isRTL(this.el);
    const activated = this.activated;
    const buttons = this.getButtons();
    const index = buttons.findIndex((button) => button.value === this.value);
    const previous = buttons[index];
    let current;
    let nextIndex;

    if (index === -1) {
      return;
    }

    // Get the element that the touch event started on in case
    // it was the checked button, then we will move the indicator
    const rect = previous.getBoundingClientRect() as DOMRect;
    const left = rect.left;
    const width = rect.width;

    // Get the element that the gesture is on top of based on the currentX of the
    // gesture event and the Y coordinate of the starting element, since the gesture
    // can move up and down off of the segment
    const currentX = detail.currentX;

    const previousY = rect.top + rect.height / 2;

    /**
     * Segment can be used inside the shadow dom
     * so doing document.elementFromPoint would never
     * return a segment button in that instance.
     * We use getRootNode to which will return the parent
     * shadow root if used inside a shadow component and
     * returns document otherwise.
     */
    const root = this.el.getRootNode() as Document | ShadowRoot;
    const nextEl = root.elementFromPoint(currentX, previousY) as HTMLGascoTabButtonElement;

    const decreaseIndex = rtl ? currentX > left + width : currentX < left;
    const increaseIndex = rtl ? currentX < left : currentX > left + width;

    // If the indicator is currently activated then we have started the gesture
    // on top of the checked button so we need to slide the indicator
    // by checking the button next to it as we move
    if (activated && !isEnd) {
      // Decrease index, move left in LTR & right in RTL
      if (decreaseIndex) {
        const newIndex = index - 1;

        if (newIndex >= 0) {
          nextIndex = newIndex;
        }
        // Increase index, moves right in LTR & left in RTL
      } else if (increaseIndex) {
        if (activated && !isEnd) {
          const newIndex = index + 1;

          if (newIndex < buttons.length) {
            nextIndex = newIndex;
          }
        }
      }

      if (nextIndex !== undefined && !buttons[nextIndex].disabled) {
        current = buttons[nextIndex];
      }
    }

    // If the indicator is not activated then we will just set the indicator
    // to the element where the gesture ended
    if (!activated && isEnd) {
      current = nextEl;
    }

    if (current != null) {
      /**
       * If current element is GASCO-TAB then that means
       * user tried to select a disabled GASCO-TAB-button,
       * and we should not update the ripple.
       */
      if (current.tagName === 'GASCO-TAB') {
        return false;
      }

      if (previous !== current) {
        this.checkButton(previous, current);
      }
    }

    return true;
  }

  private emitStyle() {
    this.gascoStyle.emit({
      segment: true,
    });
  }

  private onClick = (ev: Event) => {
    const current = ev.target as HTMLGascoTabButtonElement;
    const previous = this.checked;

    // If the current element is a segment then that means
    // the user tried to swipe to a segment button and
    // click a segment button at the same time so we should
    // not update the checked segment button
    if (current.tagName === 'GASCO-TAB') {
      return;
    }

    this.value = current.value;

    if (this.scrollable || !this.swipeGesture) {
      if (previous) {
        this.checkButton(previous, current);
      } else {
        this.setCheckedClasses();
      }
    }

    this.checked = current;
  };

  private getSegmentButton = (selector: 'first' | 'last' | 'next' | 'previous'): HTMLGascoTabButtonElement | null => {
    const buttons = this.getButtons().filter((button) => !button.disabled);
    const currIndex = buttons.findIndex((button) => button === document.activeElement);

    switch (selector) {
      case 'first':
        return buttons[0];
      case 'last':
        return buttons[buttons.length - 1];
      case 'next':
        return buttons[currIndex + 1] || buttons[0];
      case 'previous':
        return buttons[currIndex - 1] || buttons[buttons.length - 1];
      default:
        return null;
    }
  };

  @Listen('keydown')
  onKeyDown(ev: KeyboardEvent) {
    const rtl = isRTL(this.el);
    let keyDownSelectsButton = this.selectOnFocus;
    let current;
    switch (ev.key) {
      case 'ArrowRight':
        ev.preventDefault();
        current = rtl ? this.getSegmentButton('previous') : this.getSegmentButton('next');
        break;
      case 'ArrowLeft':
        ev.preventDefault();
        current = rtl ? this.getSegmentButton('next') : this.getSegmentButton('previous');
        break;
      case 'Home':
        ev.preventDefault();
        current = this.getSegmentButton('first');
        break;
      case 'End':
        ev.preventDefault();
        current = this.getSegmentButton('last');
        break;
      case ' ':
      case 'Enter':
        ev.preventDefault();
        current = document.activeElement as HTMLGascoTabButtonElement;
        keyDownSelectsButton = true;
      default:
        break;
    }

    if (!current) {
      return;
    }

    if (keyDownSelectsButton) {
      const previous = this.checked || current;
      this.checkButton(previous, current);
    }
    current.focus();
  }

  /* By default, focus is delegated to the selected `GASCO-TAB-button`.
   * If there is no selected button, focus will instead pass to the first child button.
   **/
  private ensureFocusable() {
    if (this.value !== undefined) {
      return;
    }

    const buttons = this.getButtons();
    buttons[0]?.setAttribute('tabindex', '0');
  }

  render() {
    return (
      <Host
        role="tablist"
        onClick={this.onClick}
        class={createColorClasses(this.color, {
          'in-toolbar': hostContext('gasco-toolbar', this.el),
          'in-toolbar-color': hostContext('gasco-toolbar[color]', this.el),
          'segment-activated': this.activated,
          'segment-disabled': this.disabled,
          'segment-scrollable': this.scrollable,
        })}
      >
        <slot></slot>
      </Host>
    );
  }
}
