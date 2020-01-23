export interface CommandHandleOptions<TOptions extends {}> {
  options: TOptions;
  showUsage: ShowUsageFn;
  level: number;
  ancestors: CommandPath;
}
