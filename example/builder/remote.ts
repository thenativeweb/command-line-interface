import { Command } from '../../lib';
import { ls } from './remote/ls';
import { RemoteOptions } from './RemoteOptions';

export const remote: Command<RemoteOptions> = {
  name: 'remote',
  description: 'Does stuff remote.',
  optionDefinitions: [
    {
      name: 'remote',
      type: 'string',
      description: 'Remote url.',
      alias: 'r'
    }
  ],
  subcommands: {
    ls
  },
  handle ({ options }: { options: RemoteOptions }): void {
    console.log('builder.remote command');
    console.log(JSON.stringify(options));
  }
};
