import { Command } from '../Command';
import { optionToString } from './optionToString';

const getCommandSynopsis = function ({ command }: {
  command: Command<any>;
}): any {
  const requiredOptions = command.optionDefinitions.filter((optionDefinition): boolean => optionDefinition.defaultValue === undefined && !optionDefinition.defaultOption);
  const optionalOptions = command.optionDefinitions.filter((optionDefinition): boolean => optionDefinition.defaultValue !== undefined && !optionDefinition.defaultOption);
  const defaultOption = command.optionDefinitions.find((optionDefinition): boolean => optionDefinition.defaultOption === true);

  const requiredOptionsString = requiredOptions.
    map((option): string => optionToString({ option })).
    join(' ');

  const optionalOptionsString = optionalOptions.
    map((option): string => optionToString({ option })).
    join(' ');

  let synopsis = command.name;

  if (requiredOptionsString) {
    synopsis += ` ${requiredOptionsString}`;
  }
  if (optionalOptionsString) {
    synopsis += ` [${optionalOptionsString}]`;
  }

  if (defaultOption) {
    synopsis += ` ${optionToString({ option: defaultOption })}`;
  }

  return synopsis;
};

export {
  getCommandSynopsis
};
