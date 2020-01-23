import { Command } from '../Command';
import { getCommandByPath } from '../getCommandByPath';
import { RecommendCommandFn } from './RecommendCommandFn';
import stringSimilarity from 'string-similarity';

const getRecommendCommand = function ({ rootCommand }: {
  rootCommand: Command<any>;
}): RecommendCommandFn {
  return ({ commandPath }): string => {
    const goodPath = commandPath.slice(0, -1);
    const unrecognizedCommand = commandPath[commandPath.length - 1];

    const goodCommand = getCommandByPath({ rootCommand, commandPath: goodPath });

    if (goodCommand.subcommands === undefined) {
      throw new Error('Can not suggest a subcommand if none exist.');
    }

    const availableCommands = Object.keys(goodCommand.subcommands);

    const suggestion = stringSimilarity.findBestMatch(unrecognizedCommand, availableCommands);

    return suggestion.bestMatch.target;
  };
};

export {
  getRecommendCommand
};
