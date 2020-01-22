import { build } from './build';
import { BuilderOptions } from './BuilderOptions';
import { Command } from '../../lib';
import { remote } from './remote';

export const builder: Command<BuilderOptions> = {
  name: 'builder',
  description: 'A buildering thing.',
  optionDefinitions: [
    {
      name: 'verbose',
      type: 'boolean',
      alias: 'v',
      defaultValue: false
    }
  ],
  subcommands: {
    build,
    remote
  },
  handle ({ options }): void {
    console.log('builder command');
    console.log({ options });
  }
};
