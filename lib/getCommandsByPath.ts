import { Command } from './elements/Command';
import { CommandPath } from './elements/CommandPath';
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

export { getCommandsByPath };
