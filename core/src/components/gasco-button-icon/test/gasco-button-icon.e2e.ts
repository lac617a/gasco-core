import { newE2EPage } from '@stencil/core/testing';

describe('gasco-button-icon', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<gasco-button-icon></gasco-button-icon>');

    const element = await page.find('gasco-button-icon');
    expect(element).toHaveClass('hydrated');
  });
});
