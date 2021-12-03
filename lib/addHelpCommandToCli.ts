import { Command } from './elements/Command';
import { helpCommand } from './commands/help';

const addHelpCommandToCli = function <TOptions extends object> ({ rootCommand }: {
  rootCommand: Command<TOptions>;
}): Command<TOptions> {
  return {
    name: rootCommand.name,
    description: rootCommand.description,
    remarks: rootCommand.remarks,
    optionDefinitions: [
      ...rootCommand.optionDefinitions
    ],
    ignoreUnknownOptions: rootCommand.ignoreUnknownOptions,
    subcommands: {
      ...rootCommand.subcommands,
      help: helpCommand
    },
    handle: rootCommand.handle
  };
};

export { addHelpCommandToCli };
