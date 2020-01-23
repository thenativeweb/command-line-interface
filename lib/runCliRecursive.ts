import { Command } from './elements/Command';
import commandLineCommands from 'command-line-commands';
import { CommandPath } from './elements/CommandPath';
import { convertOptionDefinition } from './convertOptionDefinition';
import { helpOption } from './commands/helpOption';
import { RecommendCommandFn } from './elements/RecommendCommandFn';
import { ShowUsageFn } from './elements/ShowUsageFn';
import commandLineArgs, { OptionDefinition as CLAOptionDefinition } from 'command-line-args';

/* eslint-disable unicorn/no-process-exit, no-console */
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
    try {
      return await command.handle({
        options: mergedOptions,
        showUsage,
        level,
        ancestors: ancestorNames
      });
    } catch (ex) {
      console.log(ex);

      return process.exit(1);
    }
  }

  if (command.subcommands === undefined || Object.keys(command.subcommands).length === 0) {
    const unknowOption = _unknown[0];

    console.log(`Unknown option '${unknowOption}'.`);

    return process.exit(1);
  }

  try {
    const { command: subCommandName, argv: subArgv } = commandLineCommands(
      Object.keys(command.subcommands),

      // Pass copy, since commandLineCommands modifies the parameter.
      [ ..._unknown ]
    ) as { command: string; argv: string[] };

    const subCommand = command.subcommands[subCommandName];

    return await runCliRecursive({
      command: subCommand,
      argv: subArgv,
      showUsage,
      recommendCommand,
      level: level + 1,
      ancestorOptions: mergedOptions,
      ancestorNames: commandPath
    });
  } catch {
    const unknownCommand = _unknown[0];
    const recommendedCommand = recommendCommand({ commandPath: [ ...commandPath, unknownCommand ]});

    console.log(`Unknown command '${unknownCommand}'. Did you mean '${recommendedCommand}'?`);

    return process.exit(1);
  }
};
/* eslint-enable unicorn/no-process-exit, no-console */
