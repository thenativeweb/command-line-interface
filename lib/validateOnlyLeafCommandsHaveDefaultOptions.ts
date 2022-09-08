import { Command } from './elements/Command';
import * as errors from './errors';

const validateOnlyLeafCommandsHaveDefaultOptions = function ({ command, ancestorNames = []}: {
  command: Command<any>;
  ancestorNames?: string[];
}): void {
  if (
    !('subcommands' in command) ||
    command.subcommands === undefined ||
    Object.keys(command.subcommands).length === 0
  ) {
    return;
  }

  const commandPath = [ ...ancestorNames, command.name ];

  for (const optionDefinition of command.optionDefinitions) {
    if (optionDefinition.defaultOption === true) {
      throw new errors.OptionInvalid(`Option '${optionDefinition.name}' in command '${commandPath.join(' ')}' may not be a default option, since the command has sub-commands.`);
    }
  }

  for (const subCommand of Object.values(command.subcommands)) {
    validateOnlyLeafCommandsHaveDefaultOptions({
      command: subCommand,
      ancestorNames: commandPath
    });
  }
};

export {
  validateOnlyLeafCommandsHaveDefaultOptions
};
