import { newE2EPage } from '@stencil/core/testing';

describe('gasco-paginator', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<gasco-paginator page="1" pageSize="10" itemCount="100" selectList="[10,20,30]"></gasco-paginator>');

    const element = await page.find('gasco-paginator');
    expect(element).toHaveClass('hydrated');
  });
});
