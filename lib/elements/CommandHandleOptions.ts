import { CommandPath } from './CommandPath';
import { GetUsageFn } from './GetUsageFn';

// eslint-disable-next-line @typescript-eslint/ban-types
export interface CommandHandleOptions<TOptions extends object> {
  options: TOptions;
  getUsage: GetUsageFn;
  level: number;
  ancestors: CommandPath;
}
