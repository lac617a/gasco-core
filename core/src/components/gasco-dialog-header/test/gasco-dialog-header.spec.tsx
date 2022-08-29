import { newSpecPage } from '@stencil/core/testing';
import { GascoDialogHeader } from '../gasco-dialog-header';

describe('gasco-dialog-header', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [GascoDialogHeader],
      html: `<gasco-dialog-header></gasco-dialog-header>`,
    });
    expect(page.root).toEqualHtml(`
      <gasco-dialog-header>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </gasco-dialog-header>
    `);
  });
});
