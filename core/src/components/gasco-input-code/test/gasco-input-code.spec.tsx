import { newSpecPage } from '@stencil/core/testing';
import { GascoInputCode } from '../gasco-input-code';

describe('gasco-input-code', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [GascoInputCode],
      html: `<gasco-input-code></gasco-input-code>`,
    });
    expect(page.root).toEqualHtml(`
      <gasco-input-code>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </gasco-input-code>
    `);
  });
});
