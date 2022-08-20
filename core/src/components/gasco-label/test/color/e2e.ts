import { newE2EPage } from '@stencil/core/testing';

test('label: color', async () => {
  const page = await newE2EPage({
    url: '/src/components/gasco-label/test/color?gasco:_testing=true',
  });

  const compare = await page.compareScreenshot();
  expect(compare).toMatchScreenshot();
});
