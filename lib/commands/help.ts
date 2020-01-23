import { Command } from '../Command';
import { HelpOptions } from './HelpOptions';

export const helpCommand: Command<HelpOptions> = {
  name: 'help',
  description: 'Shows this help message.',
  optionDefinitions: [
    {
      name: 'command',
      type: 'string',
      description: 'The name of the command for which you need help.',
      defaultOption: true,
      multiple: 'on'
    }
  ],
  ignoreUnknownOptions: true,
  handle ({ options, showUsage, ancestors }): void {
    /* eslint-disable no-console */
    if (options.command) {
      console.log(showUsage({ commandPath: [ ...ancestors, ...options.command ]}));

      return;
    }
    console.log(showUsage({ commandPath: ancestors }));
    /* eslint-enable no-console */
  }
};
