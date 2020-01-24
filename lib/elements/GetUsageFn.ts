import { CommandPath } from './CommandPath';

export type GetUsageFn = (params: {
  commandPath: CommandPath;
}) => string;
