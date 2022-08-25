import { newE2EPage } from '@stencil/core/testing';

describe('gasco-card', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<gasco-card></gasco-card>');

    const element = await page.find('gasco-card');
    expect(element).toHaveClass('hydrated');
  });
});
