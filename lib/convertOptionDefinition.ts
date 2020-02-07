import { OptionDefinition as CLAOptionDefinition } from 'command-line-args';
import { errors } from './errors';
import { OptionDefinition } from './elements/OptionDefinition';

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
    multiple: optionDefinition.multiple === 'on',
    lazyMultiple: optionDefinition.multiple === 'lazy',
    type
  };
};

export { convertOptionDefinition };
