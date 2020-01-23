import { ImageOptions } from '../ImageOptions';

export interface LsOptions extends ImageOptions {
  all: boolean;
  digests: boolean;
  filter: string;
  format: string;
  'no-trunc': boolean;
  quiet: boolean;
}
