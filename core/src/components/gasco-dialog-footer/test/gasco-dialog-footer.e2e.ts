import { newE2EPage } from '@stencil/core/testing';

describe('gasco-dialog-footer', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<gasco-dialog-footer></gasco-dialog-footer>');

    const element = await page.find('gasco-dialog-footer');
    expect(element).toHaveClass('hydrated');
  });
});
