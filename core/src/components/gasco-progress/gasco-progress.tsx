import type { ComponentInterface } from '@stencil/core';
import { Component, Host, Prop, h } from '@stencil/core';

import { config } from '../../global/config';
import type { Color } from '../../interface';
import { clamp } from '../../utils/helpers';
import { createColorClasses } from '../../utils/theme';

/**
 * @part progress - The progress bar that shows the current value when `type` is `"determinate"` and slides back and forth when `type` is `"indeterminate"`.
 * @part stream - The animated circles that appear while buffering. This only shows when `buffer` is set and `type` is `"determinate"`.
 * @part track - The track bar behind the progress bar. If the `buffer` property is set and `type` is `"determinate"` the track will be the
 * width of the `buffer` value.
 */
@Component({
  tag: 'gasco-progress',
  styleUrl: 'gasco-progress.md.scss',
  shadow: true,
})
export class GascoProgress implements ComponentInterface {
  /**
   * The state of the progress bar, based on if the time the process takes is known or not.
   * Default options are: `"determinate"` (no animation), `"indeterminate"` (animate from left to right).
   */
  @Prop() type: 'determinate' | 'indeterminate' = 'determinate';

  /**
   * If true, reverse the progress bar direction.
   */
  @Prop() reversed = false;

  /**
   * If true, reverse the progress bar direction.
   */
  @Prop() progress: 'line' | 'circle' = 'line';

  /**
   * The Progress size only for circle.
   */
  @Prop({ reflect: true }) size?: 'small' | 'default' | 'large';

  /**
   * The value determines how much of the active bar should display when the
   * `type` is `"determinate"`.
   * The value should be between [0, 1].
   */
  @Prop() value = 0;

  /**
   * If the buffer and value are smaller than 1, the buffer circles will show.
   * The buffer should be between [0, 1].
   */
  @Prop() buffer = 1;

  /**
   * The color to use from your application's color palette.
   * Default options are: `"primary"`, `"secondary"`, `"success"`, `"warning"` and `"danger"``.
   */
  @Prop({ reflect: true }) color?: Color = 'primary';

  render() {
    const finalSize = this.size === undefined && false? 'small' : this.size;
    const { color, type, reversed, value, buffer, progress } = this;
    const paused = config.getBoolean('_testing');
    return (
      <Host
        role="progressbar"
        aria-valuenow={type === 'determinate' ? value : null}
        aria-valuemin="0"
        aria-valuemax="1"
        class={createColorClasses(color, {
          'progress-paused': paused,
          [`progress-bar-${type}`]: true,
          [`progress-${progress}`]: true,
          [`progress-${finalSize}`]: finalSize !== undefined,
          'progress-bar-reversed': document.dir === 'rtl' ? !reversed : reversed,
        })}
      >
        {progress === 'line' ? (
          type === 'indeterminate' ? renderIndeterminate() : renderProgress(value, buffer)
        ) : (
          type === 'indeterminate' ? renderIndeterminateCircle() : renderProgressCircle(value)
        )}
      </Host>
    );
  }
}

const renderIndeterminateCircle = () => (
  <div class="gasco-progress-circle-infinite">
      <div class="gasco-circle-infinite"></div>
  </div>
);

const renderProgressCircle = (value: number) => {
  const finalValue = clamp(0, value, 1);
  return (
    <div class="gasco-progress-circle" data-progress={Math.ceil(finalValue * 100)}>
      <div class="gasco-circle">
        <div class="full gasco-progress-circle__slice">
          <div class="gasco-progress-circle__fill"></div>
        </div>
        <div class="gasco-progress-circle__slice">
          <div class="gasco-progress-circle__fill"></div>
          <div class="gasco-progress-circle__fill gasco-progress-circle__bar"></div>
        </div>
      </div>
      <div class="gasco-progress-circle__overlay"></div>
    </div>
  )
}

const renderIndeterminate = () => (
  <div part="track" class="progress-buffer-bar">
    <div class="indeterminate-bar-primary">
      <span part="progress" class="progress-indeterminate"></span>
    </div>
    <div class="indeterminate-bar-secondary">
      <span part="progress" class="progress-indeterminate"></span>
    </div>
  </div>
);

const renderProgress = (value: number, buffer: number) => {
  const finalValue = clamp(0, value, 1);
  const finalBuffer = clamp(0, buffer, 1);

  return [
    <div part="progress" class="progress" style={{ transform: `scaleX(${finalValue})` }}></div>,
    /**
     * Buffer circles with two container to move
     * the circles behind the buffer progress
     * with respecting the animation.
     * When finalBuffer === 1, we use display: none
     * instead of removing the element to avoid flickering.
     */
    <div
      class={{ 'buffer-circles-container': true, 'gasco-hide': finalBuffer === 1 }}
      style={{ transform: `translateX(${finalBuffer * 100}%)` }}
    >
      <div class="buffer-circles-container" style={{ transform: `translateX(-${finalBuffer * 100}%)` }}>
        <div part="stream" class="buffer-circles"></div>
      </div>
    </div>,
    <div part="track" class="progress-buffer-bar" style={{ transform: `scaleX(${finalBuffer})` }}></div>,
  ];
};
