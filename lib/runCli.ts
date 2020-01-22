import { Command } from './Command';
import commandLineCommands from 'command-line-commands';
import commandLineUsage from 'command-line-usage';
import { OptionDefinition } from './OptionDefinition';
import commandLineArgs, { OptionDefinition as CLAOptionDefinition } from 'command-line-args';

const convertOptionDefinition = function (optionDefinition: OptionDefinition): CLAOptionDefinition {
  let type: (value: string) => any;

  switch (optionDefinition.type) {
    case 'boolean':
      type = Boolean;
      break;
    case 'string':
      type = String;
      break;
    case 'number':
      type = Number;
      break;
    default:
      throw new Error('Invalid Operation.');
  }

  return {
    name: optionDefinition.name,
    alias: optionDefinition.alias,
    defaultOption: optionDefinition.defaultOption,
    defaultValue: optionDefinition.defaultValue,
    multiple: optionDefinition.multiple === 'on',
    lazyMultiple: optionDefinition.multiple === 'lazy',
    type
  };
};

const helpOption = {
  name: 'help',
  type: Boolean,
  description: 'Show this help text.',
  alias: 'h',
  defaultValue: false
};

interface HelpOptions {
  command: undefined | string[];
}

const helpCommand: Command<HelpOptions> = {
  name: 'help',
  description: 'Shows this help message.',
  optionDefinitions: [
    {
      name: 'command',
      type: 'string',
      description: 'The name of the command for which you need help.',
      defaultOption: true,
      multiple: 'on'
    }
  ],
  ignoreUnknownOptions: true,
  handle ({ options, showUsage, level, ancestors }): void {
    console.log('help command');
    if (options.command) {
      showUsage({ commandPath: [ ...ancestors, ...options.command ]});

      return;
    }
    showUsage({ commandPath: ancestors });
  }
};

const getShowUsage = function (rootCommand: Command<any>): (params: {
  commandPath: string[];
}) => void {
  return ({ commandPath }): void => {
    let command = rootCommand;

    if (commandPath[0] !== rootCommand.name) {
      throw new Error(`Can't find usage for root command '${commandPath[0]}', root actually is named '${rootCommand.name}'.`);
    }

    for (const pathElem of commandPath.slice(1)) {
      if (command.subcommands === undefined) {
        throw new Error(`Command '${command.name}' has no subcommands.`);
      }
      command = command.subcommands[pathElem];
      if (command === undefined) {
        throw new Error(`Could not find subcommand '${pathElem}'.`);
      }
    }

    console.log(`Showing usage for command ${commandPath.join('.')}`, { command });
  };
};

const selectSubCommand = function (argv: string[], commands: (string | null)[]): {
  command: string | null;
  argv: string[];
} {
  return commandLineCommands(commands, argv);
};

export const runCliRecursive = async function (
  command: Command<any>,
  argv: string[],
  showUsage: (params: { commandPath: string[] }) => void,
  level: number,
  additionalOptions: Record<string, any>,
  ancestors: string[]
): Promise<void> {
  const optionDefinitions = command.optionDefinitions.
    map((x): CLAOptionDefinition => convertOptionDefinition(x));

  const optionDefinitionsWithHelp = [
    ...optionDefinitions,
    helpOption
  ];

  const { _unknown, ...options } = commandLineArgs(optionDefinitionsWithHelp, { argv, stopAtFirstUnknown: true });
  const mergedOptions = {
    ...additionalOptions,
    ...options
  };

  if (options.help) {
    showUsage({
      commandPath: [ ...ancestors, command.name ]
    });

    return;
  }

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

const addHelpCommand = function <TOptions extends {}> (rootCommand: Command<TOptions>): Command<TOptions> {
  return {
    name: rootCommand.name,
    description: rootCommand.description,
    optionDefinitions: [
      ...rootCommand.optionDefinitions
    ],
    ignoreUnknownOptions: rootCommand.ignoreUnknownOptions,
    subcommands: rootCommand.subcommands ?
      {
        ...rootCommand.subcommands,
        help: helpCommand
      } :
      { help: helpCommand },
    handle: rootCommand.handle
  };
};

export const runCli = async function (
  rootCommand: Command<any>,
  argv: string[]
): Promise<void> {
  const extendedRootCommand = addHelpCommand(rootCommand);
  const showUsage = getShowUsage(extendedRootCommand);

  await runCliRecursive(
    extendedRootCommand,
    argv,
    showUsage,
    0,
    {},
    []
  );
};
