import { CommandPath } from './CommandPath';
import { ShowUsageFn } from './ShowUsageFn';

export interface CommandHandleOptions<TOptions extends {}> {
  options: TOptions;
  showUsage: ShowUsageFn;
  level: number;
  ancestors: CommandPath;
}
