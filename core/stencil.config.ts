import type { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
// import { vueOutputTarget } from '@stencil/vue-output-target';
import { reactOutputTarget } from '@stencil/react-output-target';
// import { angularOutputTarget } from '@stencil/angular-output-target';

export const config: Config = {
  namespace: 'Gasco',
  bundles: [
    { components: ['ion-icon'] },
    { components: ['gasco-chip'] },
    { components: ['gasco-toast'] },
    { components: ['gasco-modal'] },
    { components: ['gasco-range'] },
    { components: ['gasco-radio'] },
    { components: ['gasco-select'] },
    { components: ['gasco-content'] },
    { components: ['gasco-tooltip'] },
    { components: ['gasco-popover'] },
    { components: ['gasco-divider'] },
    { components: ['gasco-backdrop'] },
    { components: ['gasco-checkbox'] },
    { components: ['gasco-progress'] },
    { components: ['gasco-datetime'] },
    { components: ['gasco-autocomplete'] },
    { components: ['gasco-tab', 'gasco-tab-button'] },
    { components: ['gasco-input'] },
    // { components: ['gasco-input', 'gasco-input-code'] },
    { components: ['gasco-button', 'gasco-button-icon'] },
    { components: ['gasco-item', 'gasco-label', 'gasco-list', 'gasco-list-header'] },
    { components: ['gasco-accordion', 'gasco-accordion-content', 'gasco-accordion-group'] },
    { components: ['gasco-card', 'gasco-card-title', 'gasco-card-header', 'gasco-card-content'] },
    { components: ['gasco-dialog', 'gasco-dialog-title', 'gasco-dialog-header', 'gasco-dialog-content', 'gasco-dialog-footer'] },
  ],
  outputTargets: [
    reactOutputTarget({
      componentCorePackage: '@gasco/core',
      includePolyfills: false,
      includeImportCustomElements: true,
      includeDefineCustomElements: false,
      proxiesFile: '../packages/react/src/components/proxies.ts',
      // excludeComponents: []
    }),
    // angularOutputTarget({
    //   componentCorePackage: '@gasco/core',
    //   directivesProxyFile: '../angular/src/directives/proxies.ts',
    //   directivesArrayFile: '../angular/src/directives/proxies-list.txt',
    //   // excludeComponents: []
    // }),
    // vueOutputTarget({
    //   componentCorePackage: '@gasco/core',
    //   includePolyfills: false,
    //   includeImportCustomElements: true,
    //   includeDefineCustomElements: false,
    //   proxiesFile: '../packages/vue/src/proxies.ts',
    //   // excludeComponents: []
    // }),
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      dir: 'components',
      copy: [
        {
          src: '../scripts/custom-elements',
          dest: 'components',
          warn: true,
        },
      ],
      includeGlobalScripts: false,
    },
    {
      type: 'docs-readme',
    },
    // {
    //   type: 'www',
    //   serviceWorker: null, // disable service workers
    // },
    {
      type: 'dist-hydrate-script'
    },
  ],
  buildEs5: 'prod',
  extras: {
    dynamicImportShim: true,
    initializeNextTick: true,
    scriptDataOpts: true,
  },
  plugins: [sass()],
  enableCache: true,
};
