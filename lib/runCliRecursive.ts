import { Command } from './Command';
import commandLineCommands from 'command-line-commands';
import { CommandPath } from './CommandPath';
import { convertOptionDefinition } from './convertOptionDefinition';
import { RecommendCommandFn } from './recommend/RecommendCommandFn';
import { ShowUsageFn } from './usage/ShowUsageFn';
import commandLineArgs, { OptionDefinition as CLAOptionDefinition } from 'command-line-args';

const helpOption = {
  name: 'help',
  type: Boolean,
  description: 'Show this help text.',
  alias: 'h',
  defaultValue: false
};

export const runCliRecursive = async function ({
  command,
  argv,
  showUsage,
  recommendCommand,
  level,
  ancestorOptions,
  ancestorNames
}: {
  command: Command<any>;
  argv: string[];
  showUsage: ShowUsageFn;
  recommendCommand: RecommendCommandFn;
  level: number;
  ancestorOptions: Record<string, any>;
  ancestorNames: CommandPath;
}): Promise<void> {
  const commandPath = [ ...ancestorNames, command.name ];
  const optionDefinitions = command.optionDefinitions.
    map((optionDefinition): CLAOptionDefinition => convertOptionDefinition({ optionDefinition }));

  const optionDefinitionsWithHelp = [
    ...optionDefinitions,
    helpOption
  ];

  const { _unknown, ...options } = commandLineArgs(optionDefinitionsWithHelp, { argv, stopAtFirstUnknown: true });

  if (options.help) {
    console.log(showUsage({
      commandPath
    }));

    return;
  }

  const mergedOptions = {
    ...ancestorOptions,
    ...options
  };

  if (_unknown === undefined || command.ignoreUnknownOptions) {
    await command.handle({
      options: mergedOptions,
      showUsage,
      level,
      ancestors: ancestorNames
    });

    return;
  }

  if (command.subcommands === undefined) {
    const unknowOption = _unknown[0];

    console.log(`Unknown option '${unknowOption}'.`);

    return;
  }

  try {
    const { command: subCommandName, argv: subArgv } = commandLineCommands(
      Object.keys(command.subcommands),
      // Pass copy, since commandLineCommands modifies the parameter.
      [ ..._unknown ]
    ) as { command: string; argv: string[] };

    const subCommand = command.subcommands[subCommandName];

    await runCliRecursive({
      command: subCommand,
      argv: subArgv,
      showUsage,
      recommendCommand,
      level: level + 1,
      ancestorOptions: mergedOptions,
      ancestorNames: commandPath
    });

    return;
  } catch {
    const unknownCommand = _unknown[0];
    const recommendedCommand = recommendCommand({ commandPath: [ ...commandPath, unknownCommand ]});

    console.log(`Unknown command '${unknownCommand}'. Did you mean '${recommendedCommand}'?`);
  }
};
