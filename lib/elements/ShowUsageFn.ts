import { CommandPath } from './CommandPath';

export type ShowUsageFn = (params: {
  commandPath: CommandPath;
}) => string;
