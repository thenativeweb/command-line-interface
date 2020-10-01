import { CommandHandleOptions } from './CommandHandleOptions';

// eslint-disable-next-line @typescript-eslint/ban-types
export type CommandHandle<TOptions extends object> = (params: CommandHandleOptions<TOptions>) => void | Promise<void>;
