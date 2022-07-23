import { newSpecPage } from '@stencil/core/testing';
import { GascoItem } from '../gasco-item';

describe('gasco-item', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [GascoItem],
      html: `<gasco-item></gasco-item>`,
    });
    expect(page.root).toEqualHtml(`
      <gasco-item>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </gasco-item>
    `);
  });
});
