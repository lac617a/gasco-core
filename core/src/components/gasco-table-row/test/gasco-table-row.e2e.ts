import { newE2EPage } from '@stencil/core/testing';

describe('gasco-table-row', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<gasco-table-row></gasco-table-row>');

    const element = await page.find('gasco-table-row');
    expect(element).toHaveClass('hydrated');
  });
});
