import { newE2EPage } from '@stencil/core/testing';

describe('gasco-table-col', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<gasco-table-col></gasco-table-col>');

    const element = await page.find('gasco-table-col');
    expect(element).toHaveClass('hydrated');
  });
});
