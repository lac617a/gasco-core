import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';
import { sass } from '@stencil/sass';

export const config: Config = {
  namespace: 'Gasco',
  bundles: [
    { components: ['gasco-button'] },
    { components: ['gasco-input', 'gasco-input-code'] },
    { components: ['gasco-toast'] },
  ],
  outputTargets: [
    reactOutputTarget({
      componentCorePackage: '@gasco/core',
      includePolyfills: false,
      includeImportCustomElements: true,
      includeDefineCustomElements: false,
      proxiesFile: '../packages/react/src/components/proxies.ts',
    }),
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
      dir: 'components',
      copy: [{
        src: '../scripts/custom-elements',
        dest: 'components',
        warn: true
      }],
      includeGlobalScripts: false
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
  extras: {
    dynamicImportShim: true,
    initializeNextTick: true,
    scriptDataOpts: true
  },
  plugins: [
    sass()
  ],
  enableCache: true,
};
