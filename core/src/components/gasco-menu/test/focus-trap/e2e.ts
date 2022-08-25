import { newE2EPage } from '@stencil/core/testing';

const getActiveElementID = async (page) => {
  const activeElement = await page.evaluateHandle(() => document.activeElement);
  return page.evaluate((el) => el?.id, activeElement);
};

test('menu: focus trap with overlays', async () => {
  const page = await newE2EPage({
    url: '/src/components/gasco-menu/test/focus-trap?gasco:_testing=true',
  });

  const gascoDidOpen = await page.spyOnEvent('gascoDidOpen');
  const gascoModalDidPresent = await page.spyOnEvent('gascoModalDidPresent');
  const gascoModalDidDismiss = await page.spyOnEvent('gascoModalDidDismiss');

  const menu = await page.find('gasco-menu');
  await menu.callMethod('open');
  await gascoDidOpen.next();

  expect(await getActiveElementID(page)).toEqual('menu');

  const openModal = await page.find('#open-modal-button');
  await openModal.click();
  await gascoModalDidPresent.next();

  expect(await getActiveElementID(page)).toEqual('modal-element');

  const modal = await page.find('gasco-modal');
  await modal.callMethod('dismiss');
  await gascoModalDidDismiss.next();

  expect(await getActiveElementID(page)).toEqual('open-modal-button');
});

test('menu: focus trap with content inside overlays', async () => {
  const page = await newE2EPage({
    url: '/src/components/gasco-menu/test/focus-trap?gasco:_testing=true',
  });

  const gascoDidOpen = await page.spyOnEvent('gascoDidOpen');
  const gascoModalDidPresent = await page.spyOnEvent('gascoModalDidPresent');

  const menu = await page.find('gasco-menu');
  await menu.callMethod('open');
  await gascoDidOpen.next();

  expect(await getActiveElementID(page)).toEqual('menu');

  const openModal = await page.find('#open-modal-button');
  await openModal.click();
  await gascoModalDidPresent.next();

  const button = await page.find('#other-button');
  await button.click();

  expect(await getActiveElementID(page)).toEqual('other-button');
});

test('menu: should work with swipe gestures after modal is dismissed', async () => {
  const page = await newE2EPage({
    url: '/src/components/gasco-menu/test/focus-trap?gasco:_testing=true',
  });

  const gascoDidOpen = await page.spyOnEvent('gascoDidOpen');
  const gascoModalDidPresent = await page.spyOnEvent('gascoModalDidPresent');
  const gascoModalDidDismiss = await page.spyOnEvent('gascoModalDidDismiss');

  const menu = await page.find('gasco-menu');
  await menu.callMethod('open');
  await gascoDidOpen.next();

  const openModal = await page.find('#open-modal-button');
  await openModal.click();
  await gascoModalDidPresent.next();

  const modal = await page.find('gasco-modal');
  await modal.callMethod('dismiss');
  await gascoModalDidDismiss.next();

  await page.mouse.move(30, 168);
  await page.mouse.down();

  await page.mouse.move(384, 168);
  await page.mouse.up();

  await page.waitForChanges();

  expect(menu.classList.contains('show-menu')).toBeTruthy();
});
