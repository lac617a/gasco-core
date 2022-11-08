import { newSpecPage } from '@stencil/core/testing';
import { GascoTable } from '../gasco-table';

describe('gasco-table', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [GascoTable],
      html: `<gasco-table></gasco-table>`,
    });
    expect(page.root).toEqualHtml(`
      <gasco-table>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </gasco-table>
    `);
  });
});
