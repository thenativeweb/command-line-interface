import { Command } from './elements/Command';
import commandLineCommands from 'command-line-commands';
import { CommandPath } from './elements/CommandPath';
import { convertOptionDefinition } from './convertOptionDefinition';
import { GetUsageFn } from './elements/GetUsageFn';
import { helpOption } from './commands/helpOption';
import { RecommendCommandFn } from './elements/RecommendCommandFn';
import commandLineArgs, { OptionDefinition as CLAOptionDefinition } from 'command-line-args';

const runCliRecursive = async function ({
  command,
  argv,
  getUsage,
  recommendCommand,
  level,
  ancestorOptions,
  ancestorNames
}: {
  command: Command<any>;
  argv: string[];
  getUsage: GetUsageFn;
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
    /* eslint-disable no-console */
    console.log(getUsage({ commandPath }));
    /* eslint-enable no-console */

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
        getUsage,
        level,
        ancestors: ancestorNames
      });
    } catch (ex) {
      /* eslint-disable no-console */
      console.log(ex);
      /* eslint-enable no-console */

      /* eslint-disable unicorn/no-process-exit */
      return process.exit(1);
      /* eslint-enable unicorn/no-process-exit */
    }
  }

  if (command.subcommands === undefined || Object.keys(command.subcommands).length === 0) {
    const unknowOption = _unknown[0];

    /* eslint-disable no-console */
    console.log(`Unknown option '${unknowOption}'.`);
    /* eslint-enable no-console */

    /* eslint-disable unicorn/no-process-exit */
    return process.exit(1);
    /* eslint-enable unicorn/no-process-exit */
  }

  try {
    const { command: subCommandName, argv: subArgv } = commandLineCommands(
      Object.keys(command.subcommands),

      // Pass a copy of the _unknown array, since the commandLineCommands
      // function mutates the parameter in-place. To avoid this, spread it and
      // wrap the values within a new array.
      [ ..._unknown ]
    ) as { command: string; argv: string[] };

    const subCommand = command.subcommands[subCommandName];

    return await runCliRecursive({
      command: subCommand,
      argv: subArgv,
      getUsage,
      recommendCommand,
      level: level + 1,
      ancestorOptions: mergedOptions,
      ancestorNames: commandPath
    });
  } catch {
    const unknownCommand = _unknown[0];
    const recommendedCommand = recommendCommand({ commandPath: [ ...commandPath, unknownCommand ]});

    /* eslint-disable no-console */
    console.log(`Unknown command '${unknownCommand}'. Did you mean '${recommendedCommand}'?`);
    /* eslint-enable no-console */

    /* eslint-disable unicorn/no-process-exit */
    process.exit(1);
    /* eslint-enable unicorn/no-process-exit */
  }
};

export { runCliRecursive };
