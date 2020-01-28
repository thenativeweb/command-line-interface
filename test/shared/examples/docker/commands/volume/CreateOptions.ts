import { VolumeOptions } from '../VolumeOptions';

export interface CreateOptions extends VolumeOptions {
  driver: string;
  label: string;
  opt: string[];
  volume?: string;
}
