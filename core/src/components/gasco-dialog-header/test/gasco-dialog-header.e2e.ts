import { newE2EPage } from '@stencil/core/testing';

describe('gasco-dialog-header', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<gasco-dialog-header></gasco-dialog-header>');

    const element = await page.find('gasco-dialog-header');
    expect(element).toHaveClass('hydrated');
  });
});
