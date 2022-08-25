import { newSpecPage } from '@stencil/core/testing';
import { GascoDivider } from '../gasco-divider';

describe('gasco-divider', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [GascoDivider],
      html: `<gasco-divider></gasco-divider>`,
    });
    expect(page.root).toEqualHtml(`
      <gasco-divider>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </gasco-divider>
    `);
  });
});
