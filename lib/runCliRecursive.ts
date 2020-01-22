import { Command } from './Command';
import { CommandPath } from './CommandPath';
import { convertOptionDefinition } from './convertOptionDefinition';
import { selectSubCommand } from './selectSubCommand';
import { ShowUsageFn } from './usage/ShowUsageFn';
import commandLineArgs, { OptionDefinition as CLAOptionDefinition } from 'command-line-args';

const helpOption = {
  name: 'help',
  type: Boolean,
  description: 'Show this help text.',
  alias: 'h',
  defaultValue: false
};

export const runCliRecursive = async function (
  command: Command<any>,
  argv: string[],
  showUsage: ShowUsageFn,
  level: number,
  additionalOptions: Record<string, any>,
  ancestors: CommandPath
): Promise<void> {
  const optionDefinitions = command.optionDefinitions.
    map((x): CLAOptionDefinition => convertOptionDefinition(x));

  const optionDefinitionsWithHelp = [
    ...optionDefinitions,
    helpOption
  ];

  const { _unknown, ...options } = commandLineArgs(optionDefinitionsWithHelp, { argv, stopAtFirstUnknown: true });

  if (options.help) {
    console.log(showUsage({
      commandPath: [ ...ancestors, command.name ]
    }));

    return;
  }

  const mergedOptions = {
    ...additionalOptions,
    ...options
  };

  if (_unknown !== undefined && !command.ignoreUnknownOptions) {
    if (command.subcommands === undefined) {
      throw new Error('Unknown option encountered.');
    }

    const { command: subCommandName, argv: subArgv } = selectSubCommand(_unknown, [ null, ...Object.keys(command.subcommands) ]);

    if (subCommandName === null) {
      throw new Error('Sub command not found or unknown option given.');
    }

    const subCommand = command.subcommands[subCommandName];

    await runCliRecursive(
      subCommand,
      subArgv,
      showUsage,
      level + 1,
      mergedOptions,
      [ ...ancestors, command.name ]
    );

    return;
  }

  await command.handle({
    options: mergedOptions,
    showUsage,
    level,
    ancestors
  });
};
