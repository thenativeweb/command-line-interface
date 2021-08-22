import { Command } from '../elements/Command';
import { CommandPath } from '../elements/CommandPath';
import { getCommandByPath } from '../getCommandByPath';
import stringSimilarity from 'string-similarity';
import * as errors from '../errors';

const recommendCommand = function ({ rootCommand, commandPath }: {
  rootCommand: Command<any>;
  commandPath: CommandPath;
}): string {
  const goodPath = commandPath.slice(0, -1);
  const unrecognizedCommand = commandPath.at(-1)!;

  const goodCommand = getCommandByPath({ rootCommand, commandPath: goodPath });

  if (goodCommand.subcommands === undefined) {
    throw new errors.NoSuggestionAvailable();
  }

  const availableCommands = Object.keys(goodCommand.subcommands);

  const suggestion = stringSimilarity.findBestMatch(unrecognizedCommand, availableCommands);
  const recommendedCommand = suggestion.bestMatch.target;

  return recommendedCommand;
};

export { recommendCommand };
