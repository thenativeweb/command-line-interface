import { VolumeOptions } from '../VolumeOptions.ts';

export interface InspectOptions extends VolumeOptions {
  format: string;
  volume: string[];
}
