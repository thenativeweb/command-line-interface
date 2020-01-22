import { Command } from '../Command';
import { ShowUsageFn } from './ShowUsageFn';

const getShowUsage = function (rootCommand: Command<any>): ShowUsageFn {
  return ({ commandPath }): string => {
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

    return `Showing usage for command ${commandPath.join('.')}`;
  };
};

export {
  getShowUsage
};
