import { errors } from './errors';
import { OptionDefinition } from './elements/OptionDefinition';

// Throws an error if any option does not match its defined type or is
// undefined. Since command-line-args handles default values, a check for
// undefined-ness here results in a check for required options and ignores op-
// tional options.
const validateOptions = function ({ options, optionDefinitions }: {
  options: any;
  optionDefinitions: OptionDefinition[];
}): void {
  for (const optionDefinition of optionDefinitions) {
    const value = options[optionDefinition.name];
    const optionRequired = optionDefinition.required ?? false;

    if (optionRequired && value === undefined) {
      throw new errors.OptionMissing(`Option '${optionDefinition.name}' is missing.`);
    }

    switch (optionDefinition.type) {
      case 'string':
      case 'boolean': {
        // String and boolean always work, since command-line-args handles them
        // so that no validation is necessary.
        break;
      }
      case 'number': {
        if (typeof value !== 'number' || Number.isNaN(value)) {
          throw new errors.OptionInvalid(`Option '${optionDefinition.name}' must be a number.`);
        }
        break;
      }
      default: {
        throw new errors.OperationInvalid();
      }
    }
  }
};

export {
  validateOptions
};
