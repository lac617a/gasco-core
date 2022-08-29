import { newSpecPage } from '@stencil/core/testing';
import { GascoAutocomplete } from '../gasco-autocomplete';

describe('gasco-autocomplete', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [GascoAutocomplete],
      html: `<gasco-autocomplete></gasco-autocomplete>`,
    });
    expect(page.root).toEqualHtml(`
      <gasco-autocomplete>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </gasco-autocomplete>
    `);
  });
});
