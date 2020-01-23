import { Command } from '../../../../../lib';
import { CreateOptions } from './CreateOptions';

export const create: Command<CreateOptions> = {
  name: 'create',
  description: 'Create a volume',
  optionDefinitions: [
    {
      name: 'driver',
      description: 'Specify volume driver name',
      type: 'string',
      alias: 'd',
      defaultValue: 'local'
    },
    {
      name: 'label',
      description: 'Set metadata for a volume',
      type: 'string'
    },
    {
      name: 'opt',
      description: 'Set driver specific options',
      type: 'string',
      alias: 'o',
      multiple: 'on',
      defaultValue: []
    },
    {
      name: 'volume',
      type: 'string',
      defaultOption: true,
      defaultValue: ''
    }
  ],
  subcommands: {
  },
  handle ({ options }): void {
    /* eslint-disable no-console */
    console.log('docker.volume.create command');
    console.log(JSON.stringify(options));
    /* eslint-enable no-console */
  }
};
