import { VolumeOptions } from '../VolumeOptions.ts';

export interface CreateOptions extends VolumeOptions {
  driver: string;
  label: string;
  opt: string[];
  volume: string;
}
