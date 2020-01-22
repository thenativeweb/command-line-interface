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
  handle ({ options, showUsage, level, ancestors }): void {
    console.log(`${ancestors.join('.')}.help command`);
    if (options.command) {
      console.log(showUsage({ commandPath: [ ...ancestors, ...options.command ]}));

      return;
    }
    console.log(showUsage({ commandPath: ancestors }));
  }
};
