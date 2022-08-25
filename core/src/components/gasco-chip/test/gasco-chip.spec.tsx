import { newSpecPage } from '@stencil/core/testing';
import { GascoChip } from '../gasco-chip';

describe('gasco-chip', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [GascoChip],
      html: `<gasco-chip></gasco-chip>`,
    });
    expect(page.root).toEqualHtml(`
      <gasco-chip>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </gasco-chip>
    `);
  });
});
