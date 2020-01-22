import { CommandPath } from './CommandPath';
import { OptionDefinition } from './OptionDefinition';
import { ShowUsageFn } from './usage/ShowUsageFn';

export interface CommandHandleOptions<TOptions extends {}> {
  options: TOptions;
  showUsage: ShowUsageFn;
  level: number;
  ancestors: CommandPath;
}

export type CommandHandle<TOptions extends {}> = (params: CommandHandleOptions<TOptions>) => void | Promise<void>;

export interface Command<TOptions extends {}> {
  name: string;

  description: string;

  optionDefinitions: OptionDefinition[];

  // This MUST be false for every command that has subcommands. Otherwise the
  // subcommand will never be run.
  ignoreUnknownOptions?: boolean;

  subcommands?: Record<string, Command<any>>;

  handle: CommandHandle<TOptions>;
}
