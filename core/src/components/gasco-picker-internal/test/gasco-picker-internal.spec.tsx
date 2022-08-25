import { newSpecPage } from '@stencil/core/testing';
import { GascoPickerInternal } from '../gasco-picker-internal';

describe('gasco-picker-internal', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [GascoPickerInternal],
      html: `<gasco-picker-internal></gasco-picker-internal>`,
    });
    expect(page.root).toEqualHtml(`
      <gasco-picker-internal>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </gasco-picker-internal>
    `);
  });
});
