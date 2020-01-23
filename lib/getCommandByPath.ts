import { Command } from './Command';
import { CommandPath } from './CommandPath';

const getCommandByPath = function ({ rootCommand, commandPath }: {
  rootCommand: Command<any>;
  commandPath: CommandPath;
}): Command<any> {
  let command = rootCommand;

  if (commandPath[0] !== rootCommand.name) {
    throw new Error(`Can't find usage for root command '${commandPath[0]}', root actually is named '${rootCommand.name}'.`);
  }

  for (const pathElem of commandPath.slice(1)) {
    if (command.subcommands === undefined) {
      throw new Error(`Command '${command.name}' has no subcommands.`);
    }
    command = command.subcommands[pathElem];
    if (command === undefined) {
      throw new Error(`Could not find subcommand '${pathElem}'.`);
    }
  }

  return command;
};

export {
  getCommandByPath
};
