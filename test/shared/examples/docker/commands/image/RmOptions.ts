import { ImageOptions } from '../ImageOptions';

export interface RmOptions extends ImageOptions {
  force: boolean;
  'no-prune': boolean;
}
