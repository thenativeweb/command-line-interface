import { Command } from '../../../../../lib';
import { create } from './volume/create';
import { inspect } from './volume/inspect';
import { ls } from './volume/ls';
import { VolumeOptions } from './VolumeOptions.ts';

const volume: Command<VolumeOptions> = {
  name: 'volume',
  description: 'Manage volumes.',
  optionDefinitions: [],
  subcommands: {
    create,
    inspect,
    ls
  },
  handle ({ options }): void {
    /* eslint-disable no-console */
    console.log('docker.volume command');
    console.log(JSON.stringify(options));
    /* eslint-enable no-console */
  }
};

export { volume };
