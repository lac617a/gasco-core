import { newSpecPage } from '@stencil/core/testing';
import { GascoTableRow } from '../gasco-table-row';

describe('gasco-table-row', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [GascoTableRow],
      html: `<gasco-table-row></gasco-table-row>`,
    });
    expect(page.root).toEqualHtml(`
      <gasco-table-row>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </gasco-table-row>
    `);
  });
});
