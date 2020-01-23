import { CommandPath } from './CommandPath';

export type RecommendCommandFn = (params: {
  commandPath: CommandPath;
}) => string;
