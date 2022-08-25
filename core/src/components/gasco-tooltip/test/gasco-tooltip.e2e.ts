import { newE2EPage } from '@stencil/core/testing';

describe('gasco-tooltip', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<gasco-tooltip></gasco-tooltip>');

    const element = await page.find('gasco-tooltip');
    expect(element).toHaveClass('hydrated');
  });
});
