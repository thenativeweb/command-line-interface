import { Command } from '../../../../../../lib';
import { LsOptions } from './LsOptions';

const ls: Command<LsOptions> = {
  name: 'ls',
  description: 'List images',
  optionDefinitions: [
    {
      name: 'all',
      description: 'Show all images (default hides intermediate images).',
      type: 'boolean',
      alias: 'a',
      defaultValue: false
    },
    {
      name: 'digests',
      description: 'Show digests.',
      type: 'boolean',
      defaultValue: false
    },
    {
      name: 'filter',
      description: 'Filter output based on conditions provided.',
      type: 'string',
      alias: 'f'
    },
    {
      name: 'format',
      description: 'Pretty-print images using a Go template.',
      type: 'string'
    },
    {
      name: 'no-trunc',
      description: `Don't truncate output.`,
      type: 'boolean',
      defaultValue: false
    },
    {
      name: 'quiet',
      description: 'Only show numeric IDs.',
      type: 'boolean',
      alias: 'q',
      defaultValue: false
    },
    {
      name: 'image',
      description: '',
      type: 'string',
      multiple: 'on',
      defaultOption: true,
      isRequired: true,
      parameterName: 'IMAGE'
    }
  ],
  handle ({ options }): void {
    /* eslint-disable no-console */
    console.log('docker.image.ls command');
    console.log(JSON.stringify(options));
    /* eslint-enable no-console */
  }
};

export { ls };
