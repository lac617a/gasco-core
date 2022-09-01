import { newSpecPage } from '@stencil/core/testing';
import { GascoSelect } from '../gasco-select';

describe('gasco-select', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [GascoSelect],
      html: `<gasco-select></gasco-select>`,
    });
    expect(page.root).toEqualHtml(`
      <gasco-select>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </gasco-select>
    `);
  });
});
