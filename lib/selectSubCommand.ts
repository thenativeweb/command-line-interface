import commandLineCommands from 'command-line-commands';

export const selectSubCommand = function (argv: string[], commands: (string | null)[]): {
  command: string | null;
  argv: string[];
} {
  return commandLineCommands(commands, argv);
};
