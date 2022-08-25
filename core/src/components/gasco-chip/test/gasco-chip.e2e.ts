import { newE2EPage } from '@stencil/core/testing';

describe('gasco-chip', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<gasco-chip></gasco-chip>');

    const element = await page.find('gasco-chip');
    expect(element).toHaveClass('hydrated');
  });
});
