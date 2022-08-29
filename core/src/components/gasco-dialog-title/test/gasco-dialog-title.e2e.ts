import { newE2EPage } from '@stencil/core/testing';

describe('gasco-dialog-title', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<gasco-dialog-title></gasco-dialog-title>');

    const element = await page.find('gasco-dialog-title');
    expect(element).toHaveClass('hydrated');
  });
});
