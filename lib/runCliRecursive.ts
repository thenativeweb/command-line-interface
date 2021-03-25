import { Command } from './elements/Command';
import commandLineCommands from 'command-line-commands';
import { CommandPath } from './elements/CommandPath';
import { convertOptionDefinition } from './convertOptionDefinition';
import { CustomError } from 'defekt';
import { GetUsageFn } from './elements/GetUsageFn';
import { Handlers } from './Handlers';
import { helpOption } from './commands/helpOption';
import { RecommendCommandFn } from './elements/RecommendCommandFn';
import { validateOptions } from './validateOptions';
import commandLineArgs, { OptionDefinition as CLAOptionDefinition } from 'command-line-args';
import * as errors from './errors';

const runCliRecursive = async function ({
  command,
  argv,
  handlers,
  getUsage,
  recommendCommand,
  level,
  ancestorOptions,
  ancestorNames
}: {
  command: Command<any>;
  argv: string[];
  handlers: Handlers;
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

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { _unknown, ...options } = commandLineArgs(optionDefinitionsWithHelp, { argv, stopAtFirstUnknown: true });

  if (options.help) {
    // eslint-disable-next-line no-console
    console.log(getUsage({ commandPath }));

    return;
  }

  try {
    validateOptions({ options, optionDefinitions: command.optionDefinitions });
  } catch (ex: unknown) {
    switch ((ex as CustomError).code) {
      case errors.OptionMissing.code:
        handlers.optionMissing({ optionDefinition: (ex as CustomError).data.optionDefinition });

        // eslint-disable-next-line unicorn/no-process-exit
        return process.exit(1);
      case errors.OptionInvalid.code: {
        handlers.optionInvalid({ optionDefinition: (ex as CustomError).data.optionDefinition, reason: (ex as CustomError).message });

        // eslint-disable-next-line unicorn/no-process-exit
        return process.exit(1);
      }
      default: {
        throw ex;
      }
    }
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
    } catch (ex: unknown) {
      handlers.commandFailed({ ex });

      // eslint-disable-next-line unicorn/no-process-exit
      return process.exit(1);
    }
  }

  if (command.subcommands === undefined || Object.keys(command.subcommands).length === 0) {
    const unknowOption = _unknown[0];

    handlers.optionUnknown({ optionName: unknowOption });

    // eslint-disable-next-line unicorn/no-process-exit
    return process.exit(1);
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
      handlers,
      getUsage,
      recommendCommand,
      level: level + 1,
      ancestorOptions: mergedOptions,
      ancestorNames: commandPath
    });
  } catch {
    const unknownCommand = _unknown[0];
    const recommendedCommand = recommendCommand({ commandPath: [ ...commandPath, unknownCommand ]});

    handlers.commandUnknown({
      unknownCommandName: unknownCommand,
      recommendedCommandName: recommendedCommand,
      ancestors: ancestorNames
    });

    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1);
  }
};

export { runCliRecursive };
