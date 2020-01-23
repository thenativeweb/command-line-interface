import { Command } from '../elements/Command';
import { HelpOptions } from './HelpOptions';

const helpCommand: Command<HelpOptions> = {
  name: 'help',
  description: 'Show help.',
  optionDefinitions: [
    {
      name: 'command',
      type: 'string',
      description: 'The name of the command you need help for.',
      defaultOption: true,
      multiple: 'on'
    }
  ],
  ignoreUnknownOptions: true,
  handle ({ options, showUsage, ancestors }): void {
    if (options.command) {
      /* eslint-disable no-console */
      console.log(showUsage({ commandPath: [ ...ancestors, ...options.command ]}));
      /* eslint-enable no-console */

      return;
    }

    /* eslint-disable no-console */
    console.log(showUsage({ commandPath: ancestors }));
    /* eslint-enable no-console */
  }
};

export { helpCommand };
