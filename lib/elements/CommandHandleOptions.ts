import { CommandPath } from './CommandPath';
import { GetUsageFn } from './GetUsageFn';

export interface CommandHandleOptions<TOptions extends object> {
  options: TOptions;
  getUsage: GetUsageFn;
  level: number;
  ancestors: CommandPath;
}
