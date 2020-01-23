import { CommandPath } from '../elements/CommandPath';

export type RecommendCommandFn = (params: {
  commandPath: CommandPath;
}) => string;
