import 'ionicons';

export { createAnimation } from './utils/animation/animation';
export { GascoSafeString } from './utils/sanitization';
export { toastController } from './utils/overlays';
export { componentOnReady } from './utils/helpers';
export { getTimeGivenProgression } from './utils/animation/cubic-bezier';
export {
  LIFECYCLE_WILL_ENTER,
  LIFECYCLE_DID_ENTER,
  LIFECYCLE_WILL_LEAVE,
  LIFECYCLE_DID_LEAVE,
  LIFECYCLE_WILL_UNLOAD,
} from './constant/lifecycle';