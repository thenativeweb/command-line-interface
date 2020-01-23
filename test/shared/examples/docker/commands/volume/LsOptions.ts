import { VolumeOptions } from '../VolumeOptions.ts';

export interface LsOptions extends VolumeOptions {
  filter: string;
  format: string;
  quiet: boolean;
}
