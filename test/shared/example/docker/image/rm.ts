import { Command } from '../../../../../lib';
import { RmOptions } from './RmOptions';

export const rm: Command<RmOptions> = {
  name: 'rm',
  description: 'List images.',
  optionDefinitions: [
    {
      name: 'force',
      description: 'Force removal of the image.',
      type: 'boolean',
      alias: 'f',
      defaultValue: false
    },
    {
      name: 'no-prune',
      description: 'Show digests.',
      type: 'boolean',
      defaultValue: false
    },
    {
      name: 'image',
      description: '',
      type: 'string',
      multiple: 'on',
      defaultOption: true
    }
  ],
  handle ({ options }): void {
    /* eslint-disable no-console */
    console.log('docker.image.rm command');
    console.log(JSON.stringify(options));
    /* eslint-enable no-console */
  }
};
