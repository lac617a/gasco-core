import { newSpecPage } from '@stencil/core/testing';
import { GascoPopover } from '../gasco-popover';

describe('gasco-popover', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [GascoPopover],
      html: `<gasco-popover></gasco-popover>`,
    });
    expect(page.root).toEqualHtml(`
      <gasco-popover>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </gasco-popover>
    `);
  });
});
