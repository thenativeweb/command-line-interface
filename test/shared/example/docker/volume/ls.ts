import { Command } from '../../../../../lib';
import { LsOptions } from './LsOptions';

export const ls: Command<LsOptions> = {
  name: 'ls',
  description: 'List volumes.',
  optionDefinitions: [
    {
      name: 'filter',
      description: `Provide filter values (e.g. 'dangling=true').`,
      type: 'string',
      alias: 'f',
      defaultValue: ''
    },
    {
      name: 'format',
      description: 'Pretty-print volumes using a Go template.',
      type: 'string',
      defaultValue: ''
    },
    {
      name: 'quiet',
      description: 'Only display volume names.',
      type: 'boolean',
      alias: 'q',
      defaultValue: false
    }
  ],
  handle ({ options }): void {
    /* eslint-disable no-console */
    console.log('docker.volume.ls command');
    console.log(JSON.stringify(options));
    /* eslint-enable no-console */
  }
};
