import { newSpecPage } from '@stencil/core/testing';

import { GascoAccordionGroup } from '../../gasco-accordion-group/gasco-accordion-group.tsx';
import { GascoItem } from '../../gasco-item/gasco-item.tsx';
import { GascoAccordion } from '../gasco-accordion.tsx';

it('should open correct accordions', async () => {
  const page = await newSpecPage({
    components: [GascoItem, GascoAccordion, GascoAccordionGroup],
    html: `
      <gasco-accordion-group animated="false">
        <gasco-accordion value="first">
          <gasco-item slot="header">Label</gasco-item>
          <div slot="content">Content</div>
        </gasco-accordion>
        <gasco-accordion value="second">
          <gasco-item slot="header">Label</gasco-item>
          <div slot="content">Content</div>
        </gasco-accordion>
        <gasco-accordion value="third">
          <gasco-item slot="header">Label</gasco-item>
          <div slot="content">Content</div>
        </gasco-accordion>
      </gasco-accordion-group>
    `,
  });

  const accordionGroup = page.body.querySelector('gasco-accordion-group');
  const accordions = accordionGroup.querySelectorAll('gasco-accordion');

  accordions.forEach((accordion) => {
    expect(accordion.classList.contains('accordion-collapsed')).toEqual(true);
  });

  accordionGroup.value = 'second';
  await page.waitForChanges();

  expect(accordions[0].classList.contains('accordion-collapsed')).toEqual(true);
  expect(accordions[1].classList.contains('accordion-collapsed')).toEqual(false);
  expect(accordions[2].classList.contains('accordion-collapsed')).toEqual(true);
});

it('should not open more than one accordion when multiple="false"', async () => {
  const page = await newSpecPage({
    components: [GascoItem, GascoAccordion, GascoAccordionGroup],
    html: `
      <gasco-accordion-group animated="false">
        <gasco-accordion value="first">
          <gasco-item slot="header">Label</gasco-item>
          <div slot="content">Content</div>
        </gasco-accordion>
        <gasco-accordion value="second">
          <gasco-item slot="header">Label</gasco-item>
          <div slot="content">Content</div>
        </gasco-accordion>
        <gasco-accordion value="third">
          <gasco-item slot="header">Label</gasco-item>
          <div slot="content">Content</div>
        </gasco-accordion>
      </gasco-accordion-group>
    `,
  });

  const accordionGroup = page.body.querySelector('gasco-accordion-group');
  const accordions = accordionGroup.querySelectorAll('gasco-accordion');

  accordions.forEach((accordion) => {
    expect(accordion.classList.contains('accordion-collapsed')).toEqual(true);
  });

  accordionGroup.value = ['first', 'second'];
  await page.waitForChanges();

  expect(accordions[0].classList.contains('accordion-collapsed')).toEqual(false);
  expect(accordions[1].classList.contains('accordion-collapsed')).toEqual(true);
  expect(accordions[2].classList.contains('accordion-collapsed')).toEqual(true);
});

it('should open more than one accordion when multiple="true"', async () => {
  const page = await newSpecPage({
    components: [GascoItem, GascoAccordion, GascoAccordionGroup],
    html: `
      <gasco-accordion-group multiple="true" animated="false">
        <gasco-accordion value="first">
          <gasco-item slot="header">Label</gasco-item>
          <div slot="content">Content</div>
        </gasco-accordion>
        <gasco-accordion value="second">
          <gasco-item slot="header">Label</gasco-item>
          <div slot="content">Content</div>
        </gasco-accordion>
        <gasco-accordion value="third">
          <gasco-item slot="header">Label</gasco-item>
          <div slot="content">Content</div>
        </gasco-accordion>
      </gasco-accordion-group>
    `,
  });

  const accordionGroup = page.body.querySelector('gasco-accordion-group');
  const accordions = accordionGroup.querySelectorAll('gasco-accordion');

  accordions.forEach((accordion) => {
    expect(accordion.classList.contains('accordion-collapsed')).toEqual(true);
  });

  accordionGroup.value = ['first', 'second'];
  await page.waitForChanges();

  expect(accordions[0].classList.contains('accordion-collapsed')).toEqual(false);
  expect(accordions[1].classList.contains('accordion-collapsed')).toEqual(false);
  expect(accordions[2].classList.contains('accordion-collapsed')).toEqual(true);
});

it('should render with accordion open', async () => {
  const page = await newSpecPage({
    components: [GascoItem, GascoAccordion, GascoAccordionGroup],
    html: `
      <gasco-accordion-group value="first" animated="false">
        <gasco-accordion value="first">
          <gasco-item slot="header">Label</gasco-item>
          <div slot="content">Content</div>
        </gasco-accordion>
        <gasco-accordion value="second">
          <gasco-item slot="header">Label</gasco-item>
          <div slot="content">Content</div>
        </gasco-accordion>
        <gasco-accordion value="third">
          <gasco-item slot="header">Label</gasco-item>
          <div slot="content">Content</div>
        </gasco-accordion>
      </gasco-accordion-group>
    `,
  });

  const accordionGroup = page.body.querySelector('gasco-accordion-group');
  const accordions = accordionGroup.querySelectorAll('gasco-accordion');

  expect(accordions[0].classList.contains('accordion-collapsed')).toEqual(false);
  expect(accordions[1].classList.contains('accordion-collapsed')).toEqual(true);
  expect(accordions[2].classList.contains('accordion-collapsed')).toEqual(true);
});

it('should accept a string when multiple="true"', async () => {
  const page = await newSpecPage({
    components: [GascoItem, GascoAccordion, GascoAccordionGroup],
    html: `
      <gasco-accordion-group multiple="true" value="first" animated="false">
        <gasco-accordion value="first">
          <gasco-item slot="header">Label</gasco-item>
          <div slot="content">Content</div>
        </gasco-accordion>
        <gasco-accordion value="second">
          <gasco-item slot="header">Label</gasco-item>
          <div slot="content">Content</div>
        </gasco-accordion>
        <gasco-accordion value="third">
          <gasco-item slot="header">Label</gasco-item>
          <div slot="content">Content</div>
        </gasco-accordion>
      </gasco-accordion-group>
    `,
  });

  const accordionGroup = page.body.querySelector('gasco-accordion-group');
  const accordions = accordionGroup.querySelectorAll('gasco-accordion');

  expect(accordions[0].classList.contains('accordion-collapsed')).toEqual(false);
  expect(accordions[1].classList.contains('accordion-collapsed')).toEqual(true);
  expect(accordions[2].classList.contains('accordion-collapsed')).toEqual(true);
});

it('should set default values if not provided', async () => {
  const page = await newSpecPage({
    components: [GascoItem, GascoAccordion, GascoAccordionGroup],
    html: `
      <gasco-accordion-group animated="false">
        <gasco-accordion>
          <gasco-item slot="header">Label</gasco-item>
          <div slot="content">Content</div>
        </gasco-accordion>
      </gasco-accordion-group>
    `,
  });

  const accordionGroup = page.body.querySelector('gasco-accordion-group');
  const accordion = accordionGroup.querySelector('gasco-accordion');

  /**
   * ID is determined via an auto incrementing counter
   * so do not hard code gasco-accordion-0 as it might
   * change depending on how many accordions
   * are used in these tests.
   */
  expect(accordion.value).toContain('gasco-accordion-');

  accordionGroup.value = accordion.value;
  await page.waitForChanges();

  expect(accordion.classList.contains('accordion-collapsed')).toEqual(false);
});
