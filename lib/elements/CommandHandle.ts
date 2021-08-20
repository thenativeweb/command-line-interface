import { CommandHandleOptions } from './CommandHandleOptions';

export type CommandHandle<TOptions extends object> = (params: CommandHandleOptions<TOptions>) => void | Promise<void>;
