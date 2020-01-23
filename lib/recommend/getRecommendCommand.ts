import { Command } from '../Command';
import { CommandPath } from '../CommandPath';
import { RecommendCommandFn } from './RecommendCommandFn';

const getRecommendCommand = function ({ rootCommand }: {
  rootCommand: Command<any>;
}): RecommendCommandFn {
  return ({ commandPath }): CommandPath[] => [];
};

export {
  getRecommendCommand
};
