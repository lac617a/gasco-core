import { newSpecPage } from '@stencil/core/testing';
import { GascoPickerColumnInternal } from '../gasco-picker-column-internal';

describe('gasco-picker-column-internal', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [GascoPickerColumnInternal],
      html: `<gasco-picker-column-internal></gasco-picker-column-internal>`,
    });
    expect(page.root).toEqualHtml(`
      <gasco-picker-column-internal>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </gasco-picker-column-internal>
    `);
  });
});
