import { CommandHandleOptions } from './CommandHandleOptions';

export type CommandHandle<TOptions extends {}> = (params: CommandHandleOptions<TOptions>) => void | Promise<void>;
