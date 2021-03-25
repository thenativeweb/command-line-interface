import { OptionDefinition as CLAOptionDefinition } from 'command-line-args';
import { OptionDefinition } from './elements/OptionDefinition';
import * as errors from './errors';

const convertOptionDefinition = function ({ optionDefinition }: {
  optionDefinition: OptionDefinition;
}): CLAOptionDefinition {
  let type: (value: string) => any;

  if (optionDefinition.type === 'boolean' && optionDefinition.defaultOption) {
    throw new errors.OptionInvalid(`Option '${optionDefinition.name}' must not be a default option, because it is boolean.`);
  }

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
      throw new errors.InvalidOperation();
  }

  return {
    name: optionDefinition.name,
    alias: optionDefinition.alias,
    defaultOption: optionDefinition.defaultOption,
    defaultValue: optionDefinition.defaultValue,
    lazyMultiple: optionDefinition.multiple === true,
    type
  };
};

export { convertOptionDefinition };
