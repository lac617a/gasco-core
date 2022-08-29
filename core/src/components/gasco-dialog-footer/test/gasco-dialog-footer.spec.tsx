import { newSpecPage } from '@stencil/core/testing';
import { GascoDialogFooter } from '../gasco-dialog-footer';

describe('gasco-dialog-footer', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [GascoDialogFooter],
      html: `<gasco-dialog-footer></gasco-dialog-footer>`,
    });
    expect(page.root).toEqualHtml(`
      <gasco-dialog-footer>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </gasco-dialog-footer>
    `);
  });
});
