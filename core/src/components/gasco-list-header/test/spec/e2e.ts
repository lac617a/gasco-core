import { newE2EPage } from '@stencil/core/testing';

test('list-header: spec', async () => {
  const page = await newE2EPage({
    url: '/src/components/gasco-list-header/test/spec?gasco:_testing=true',
  });

  const compare = await page.compareScreenshot();
  expect(compare).toMatchScreenshot();
});
