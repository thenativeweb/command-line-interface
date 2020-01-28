import { VolumeOptions } from '../VolumeOptions';

export interface InspectOptions extends VolumeOptions {
  format?: string;
  volume: string[];
}
