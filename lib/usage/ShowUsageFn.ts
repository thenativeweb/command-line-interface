import { CommandPath } from '../elements/CommandPath';

export type ShowUsageFn = (params: {
  commandPath: CommandPath;
}) => string;
