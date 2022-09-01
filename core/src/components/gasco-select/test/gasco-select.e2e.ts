import { newE2EPage } from '@stencil/core/testing';

describe('gasco-select', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<gasco-select></gasco-select>');

    const element = await page.find('gasco-select');
    expect(element).toHaveClass('hydrated');
  });
});
