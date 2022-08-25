import { newSpecPage } from '@stencil/core/testing';
import { GascoPaginator } from '../gasco-paginator';

describe('gasco-paginator', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [GascoPaginator],
      html: '<gasco-paginator page="1" pageSize="10" itemCount="100" selectList="[10,20,30]"></gasco-paginator>'
    });
    expect(page.root).toEqualHtml(`
      <gasco-paginator>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </gasco-paginator>
    `);
  });
});
