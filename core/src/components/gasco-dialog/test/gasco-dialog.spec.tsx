import { newSpecPage } from '@stencil/core/testing';
import { GascoDialog } from '../gasco-dialog';

describe('gasco-dialog', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [GascoDialog],
      html: `<gasco-dialog></gasco-dialog>`,
    });
    expect(page.root).toEqualHtml(`
      <gasco-dialog>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </gasco-dialog>
    `);
  });
});
