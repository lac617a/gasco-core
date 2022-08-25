import { newSpecPage } from '@stencil/core/testing';
import { GascoTooltip } from '../gasco-tooltip';

describe('gasco-tooltip', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [GascoTooltip],
      html: `<gasco-tooltip></gasco-tooltip>`,
    });
    expect(page.root).toEqualHtml(`
      <gasco-tooltip>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </gasco-tooltip>
    `);
  });
});
