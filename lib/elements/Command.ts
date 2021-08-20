import { CommandHandle } from './CommandHandle';
import { OptionDefinition } from './OptionDefinition';

export interface Command<TOptions extends object> {
  name: string;

  description: string;

  remarks?: string;

  optionDefinitions: OptionDefinition[];

  // This MUST be false for every command that has subcommands. Otherwise the
  // subcommands will never be run.
  ignoreUnknownOptions?: boolean;

  subcommands?: Record<string, Command<any>>;

  handle: CommandHandle<TOptions>;
}
