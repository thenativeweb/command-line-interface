import { VolumeOptions } from '../VolumeOptions';

export interface LsOptions extends VolumeOptions {
  filter?: string;
  format?: string;
  quiet: boolean;
}
