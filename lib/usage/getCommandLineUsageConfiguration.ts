import { Command } from '../elements/Command';
import { CommandPath } from '../elements/CommandPath';
import { convertOptionDefinition } from '../convertOptionDefinition';
import { getCommandsByPath } from '../getCommandsByPath';
import { getCommandSynopsis } from './getCommandSynopsis';
import stripIndent from 'strip-indent';
import commandLineUsage, { Section } from 'command-line-usage';

const getCommandLineUsageConfiguration = function ({ rootCommand, commandPath }: {
  rootCommand: Command<any>;
  commandPath: CommandPath;
}): Section[] {
  const commandsInPath = getCommandsByPath({ rootCommand, commandPath });
  const command = commandsInPath.at(-1)!;

  const synopsis = commandsInPath.map((currentCommand): string => getCommandSynopsis({ command: currentCommand })).join(' ');

  const usage: Section[] = [
    {
      header: rootCommand.name,
      content: [ command.description ]
    }, {
      header: 'Synopsis',
      content: [ synopsis ]
    }
  ];

  if (command.optionDefinitions.length > 0) {
    usage.push({
      header: 'Options',
      optionList: command.optionDefinitions.map((optionDefinition): commandLineUsage.OptionDefinition => {
        const convertedOptionDefinition = convertOptionDefinition({ optionDefinition });

        return {
          ...convertedOptionDefinition,
          description: optionDefinition.description,
          typeLabel: `{underline ${optionDefinition.parameterName ?? optionDefinition.type}}`
        };
      })
    });
  }

  if (command.subcommands && Object.keys(command.subcommands).length > 0) {
    usage.push({
      header: 'Commands',
      content: Object.entries(command.subcommands).map(([ name, subcommand ]): any => ({
        name,
        description: subcommand.description
      }))
    });
  }

  if (command.remarks) {
    usage.push({
      header: 'Remarks',
      content: [ stripIndent(command.remarks).trim() ]
    });
  }

  return usage;
};

export { getCommandLineUsageConfiguration };
