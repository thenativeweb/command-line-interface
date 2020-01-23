import { OptionDefinition as CLAOptionDefinition } from 'command-line-args';
import { OptionDefinition } from './elements/OptionDefinition';

export const convertOptionDefinition = function ({ optionDefinition }: {
  optionDefinition: OptionDefinition;
}): CLAOptionDefinition {
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
