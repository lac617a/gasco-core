import { newE2EPage } from '@stencil/core/testing';

describe('gasco-progress', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<gasco-progress></gasco-progress>');

    const element = await page.find('gasco-progress');
    expect(element).toHaveClass('hydrated');
  });
});
