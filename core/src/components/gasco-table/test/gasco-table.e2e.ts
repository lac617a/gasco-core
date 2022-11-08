import { newE2EPage } from '@stencil/core/testing';

describe('gasco-table', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<gasco-table></gasco-table>');

    const element = await page.find('gasco-table');
    expect(element).toHaveClass('hydrated');
  });
});
