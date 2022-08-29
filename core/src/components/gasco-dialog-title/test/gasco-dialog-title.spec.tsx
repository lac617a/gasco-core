import { newSpecPage } from '@stencil/core/testing';
import { GascoDialogTitle } from '../gasco-dialog-title';

describe('gasco-dialog-title', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [GascoDialogTitle],
      html: `<gasco-dialog-title></gasco-dialog-title>`,
    });
    expect(page.root).toEqualHtml(`
      <gasco-dialog-title>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </gasco-dialog-title>
    `);
  });
});
