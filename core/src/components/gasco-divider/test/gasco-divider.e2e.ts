import { newE2EPage } from '@stencil/core/testing';

describe('gasco-divider', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<gasco-divider></gasco-divider>');

    const element = await page.find('gasco-divider');
    expect(element).toHaveClass('hydrated');
  });
});
