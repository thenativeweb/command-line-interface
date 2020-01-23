import { Command } from '../Command';
import { recommendCommand } from './recommendCommand';
import { RecommendCommandFn } from './RecommendCommandFn';

const getRecommendCommand = function ({ rootCommand }: {
  rootCommand: Command<any>;
}): RecommendCommandFn {
  return ({ commandPath }): string => recommendCommand({ rootCommand, commandPath });
};

export {
  getRecommendCommand
};
