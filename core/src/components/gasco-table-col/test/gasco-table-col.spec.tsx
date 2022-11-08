import { newSpecPage } from '@stencil/core/testing';
import { GascoTableCol } from '../gasco-table-col';

describe('gasco-table-col', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [GascoTableCol],
      html: `<gasco-table-col></gasco-table-col>`,
    });
    expect(page.root).toEqualHtml(`
      <gasco-table-col>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </gasco-table-col>
    `);
  });
});
