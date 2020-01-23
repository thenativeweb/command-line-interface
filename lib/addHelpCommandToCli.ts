import { Command } from './elements/Command';
import { helpCommand } from './commands/help';

export const addHelpCommandToCli = function <TOptions extends {}> ({ rootCommand }: {
  rootCommand: Command<TOptions>;
}): Command<TOptions> {
  return {
    name: rootCommand.name,
    description: rootCommand.description,
    optionDefinitions: [
      ...rootCommand.optionDefinitions
    ],
    ignoreUnknownOptions: rootCommand.ignoreUnknownOptions,
    subcommands: {
      ...rootCommand.subcommands ?? {},
      help: helpCommand
    },
    handle: rootCommand.handle
  };
};
