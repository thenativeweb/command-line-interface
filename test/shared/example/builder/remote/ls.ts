import { Command } from '../../../../../lib';
import { LsOptions } from './LsOptions';

export const ls: Command<LsOptions> = {
  name: 'ls',
  description: 'Ls your application versions on remote.',
  optionDefinitions: [
    {
      name: 'all',
      type: 'boolean',
      description: 'Include inactive versions in list',
      alias: 'a',
      defaultValue: false
    },
    {
      name: 'a-very-long-option-name',
      type: 'number',
      description: 'short desc'
    }
  ],
  handle ({ options }: { options: LsOptions }): void {
    console.log('builder.remote.ls command');
    console.log(JSON.stringify(options));
  }
};
