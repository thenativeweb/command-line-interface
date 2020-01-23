import { Command } from '../Command';
import { convertOptionDefinition } from '../convertOptionDefinition';
import { getCommandsByPath } from '../getCommandsByPath';
import { getCommandSynopsis } from './getCommandSynopsis';
import { ShowUsageFn } from './ShowUsageFn';
import commandLineUsage, { Section } from 'command-line-usage';

const getShowUsage = function ({ rootCommand }: {
  rootCommand: Command<any>;
}): ShowUsageFn {
  return ({ commandPath }): string => {
    const commandsInPath = getCommandsByPath({ rootCommand, commandPath });
    const command = commandsInPath[commandsInPath.length - 1];

    const synopsis = commandsInPath.map((currentCommand): string => getCommandSynopsis({ command: currentCommand })).join(' ');

    const usage: Section[] = [
      {
        header: rootCommand.name,
        content: [
          `> ${synopsis}`,
          '',
          command.description
        ]
      }
    ];

    if (command.optionDefinitions.length > 0) {
      usage.push(
        {
          header: 'Options',
          optionList: command.optionDefinitions.map((optionDefinition): commandLineUsage.OptionDefinition => {
            const convertedOptionDefinition = convertOptionDefinition({ optionDefinition });

            return {
              ...convertedOptionDefinition,
              description: optionDefinition.description,
              typeLabel: `{underline ${optionDefinition.parameterName ?? optionDefinition.type}}`
            };
          })
        }
      );
    }

    if (command.subcommands && Object.keys(command.subcommands).length > 0) {
      usage.push(
        {
          header: 'Commands',
          content: Object.entries(command.subcommands).map(([ name, subcommand ]): any => ({
            desc: name,
            example: subcommand.description
          }))
        }
      );
    }

    return commandLineUsage(usage);
  };
};

export {
  getShowUsage
};
