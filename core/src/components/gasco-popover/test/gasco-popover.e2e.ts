import { newE2EPage } from '@stencil/core/testing';

describe('gasco-popover', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<gasco-popover></gasco-popover>');

    const element = await page.find('gasco-popover');
    expect(element).toHaveClass('hydrated');
  });
});
