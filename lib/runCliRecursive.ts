import { Command } from './Command';
import { CommandPath } from './CommandPath';
import { convertOptionDefinition } from './convertOptionDefinition';
import { RecommendCommandFn } from './recommend/RecommendCommandFn';
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

export const runCliRecursive = async function ({
  command,
  argv,
  showUsage,
  recommendCommand,
  level,
  additionalOptions,
  ancestors
}: {
  command: Command<any>;
  argv: string[];
  showUsage: ShowUsageFn;
  recommendCommand: RecommendCommandFn;
  level: number;
  additionalOptions: Record<string, any>;
  ancestors: CommandPath;
}): Promise<void> {
  const commandPath = [ ...ancestors, command.name ];
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
    ...additionalOptions,
    ...options
  };

  if (_unknown !== undefined && !command.ignoreUnknownOptions) {
    if (command.subcommands === undefined) {
      const unknowOption = _unknown[0];

      console.log(`Unknown option '${unknowOption}'.`);
      console.log(showUsage({
        commandPath
      }));

      return;
    }

    try {
      const { command: subCommandName, argv: subArgv } = selectSubCommand({
        // Pass copy of unknown since selectSubCommand modifies it.
        argv: [ ..._unknown ],
        commands: [ ...Object.keys(command.subcommands) ]
      }) as { command: string; argv: string[] };

      const subCommand = command.subcommands[subCommandName];

      await runCliRecursive({
        command: subCommand,
        argv: subArgv,
        showUsage,
        recommendCommand,
        level: level + 1,
        additionalOptions: mergedOptions,
        ancestors: commandPath
      });

      return;
    } catch {
      const unknownCommand = _unknown[0];
      const recommendedCommand = recommendCommand({ commandPath: [ ...ancestors, command.name, unknownCommand ]});

      console.log(`Unknown command '${unknownCommand}'. Did you mean '${recommendedCommand}'?`);
      console.log(showUsage({
        commandPath
      }));

      return;
    }
  }

  await command.handle({
    options: mergedOptions,
    showUsage,
    level,
    ancestors
  });
};
