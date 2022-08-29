import { newSpecPage } from '@stencil/core/testing';
import { GascoDialogContent } from '../gasco-dialog-content';

describe('gasco-dialog-content', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [GascoDialogContent],
      html: `<gasco-dialog-content></gasco-dialog-content>`,
    });
    expect(page.root).toEqualHtml(`
      <gasco-dialog-content>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </gasco-dialog-content>
    `);
  });
});
