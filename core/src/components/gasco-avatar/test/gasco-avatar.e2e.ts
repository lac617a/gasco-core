import { newE2EPage } from '@stencil/core/testing';

describe('gasco-avatar', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<gasco-avatar></gasco-avatar>');

    const element = await page.find('gasco-avatar');
    expect(element).toHaveClass('hydrated');
  });
});
