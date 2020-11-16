import { Command } from '../elements/Command';
import { optionToString } from './optionToString';

const getCommandSynopsis = function ({ command }: {
  command: Command<any>;
}): any {
  const requiredOptions = command.optionDefinitions.filter(
    (optionDefinition): boolean =>
      (optionDefinition.defaultOption === undefined || !optionDefinition.defaultOption) &&
      (optionDefinition.isRequired !== undefined && optionDefinition.isRequired)
  );
  const optionalOptions = command.optionDefinitions.filter(
    (optionDefinition): boolean =>
      (optionDefinition.defaultOption === undefined || !optionDefinition.defaultOption) &&
      (optionDefinition.isRequired === undefined || !optionDefinition.isRequired)
  );
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
    synopsis += defaultOption.isRequired ?
      ` ${optionToString({ option: defaultOption })}` :
      ` [${optionToString({ option: defaultOption })}]`;
  }

  return synopsis;
};

export { getCommandSynopsis };
