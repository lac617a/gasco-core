import { newE2EPage } from '@stencil/core/testing';

describe('gasco-dialog', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<gasco-dialog></gasco-dialog>');

    const element = await page.find('gasco-dialog');
    expect(element).toHaveClass('hydrated');
  });
});
