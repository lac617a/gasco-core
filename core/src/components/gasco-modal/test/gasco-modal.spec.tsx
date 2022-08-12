import { newSpecPage } from '@stencil/core/testing';
import { GascoModal } from '../gasco-modal';

describe('gasco-modal', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [GascoModal],
      html: `<gasco-modal></gasco-modal>`,
    });
    expect(page.root).toEqualHtml(`
      <gasco-modal>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </gasco-modal>
    `);
  });
});
