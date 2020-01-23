import { Command } from './Command';
import { CommandPath } from './CommandPath';
import { getCommandByPath } from './getCommandByPath';

const getCommandsByPath = function ({ rootCommand, commandPath }: {
  rootCommand: Command<any>;
  commandPath: CommandPath;
}): Command<any>[] {
  return commandPath.map((commandName: string, index: number): Command<any> => {
    const currentPath = commandPath.slice(0, index + 1);

    return getCommandByPath({ rootCommand, commandPath: currentPath });
  });
};

export {
  getCommandsByPath
};
