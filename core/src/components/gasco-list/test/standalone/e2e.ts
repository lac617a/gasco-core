import { newE2EPage } from '@stencil/core/testing';

test('list: standalone', async () => {
  const page = await newE2EPage({
    url: '/src/components/gasco-list/test/standalone?gasco:_testing=true',
  });

  const compare = await page.compareScreenshot();
  expect(compare).toMatchScreenshot();
});
