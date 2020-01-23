import { Command } from './elements/Command';
import { CommandPath } from './elements/CommandPath';
import { errors } from './errors';

const getCommandByPath = function ({ rootCommand, commandPath }: {
  rootCommand: Command<any>;
  commandPath: CommandPath;
}): Command<any> {
  let command = rootCommand;

  if (commandPath[0] !== rootCommand.name) {
    throw new errors.InvalidOperation(`Can't find root command '${commandPath[0]}', root actually is named '${rootCommand.name}'.`);
  }

  for (const pathElem of commandPath.slice(1)) {
    if (command.subcommands === undefined) {
      throw new errors.CommandNotFound();
    }
    command = command.subcommands[pathElem];
    if (command === undefined) {
      throw new errors.CommandNotFound();
    }
  }

  return command;
};

export {
  getCommandByPath
};
