import { CustomError } from 'defekt';
import { OptionDefinition } from './elements/OptionDefinition';
import * as errors from './errors';

// Throws an error if any option does not match its defined type or is undefined.
// Since command-line-args handles default values, a check for undefined-ness here
// results in a check for required options and ignores optional options.
const validateOptions = function ({ options, optionDefinitions }: {
  options: any;
  optionDefinitions: OptionDefinition[];
}): void {
  for (const optionDefinition of optionDefinitions) {
    const value = options[optionDefinition.name];
    const optionRequired = optionDefinition.isRequired ?? false;

    if (optionRequired && value === undefined) {
      throw new errors.OptionMissing({
        message: `Option '${optionDefinition.name}' is missing.`,
        data: { optionDefinition }
      });
    }

    switch (optionDefinition.type) {
      case 'string':
      case 'boolean': {
        // String and boolean always work, since command-line-args handles them
        // so that no validation is necessary.
        break;
      }
      case 'number': {
        if (!optionRequired && value === undefined) {
          break;
        }

        if (typeof value !== 'number' || Number.isNaN(value)) {
          throw new errors.OptionInvalid({
            message: `Option '${optionDefinition.name}' must be a number.`,
            data: { optionDefinition }
          });
        }
        break;
      }
      default: {
        throw new errors.InvalidOperation();
      }
    }

    if (value !== undefined && optionDefinition.validate) {
      try {
        optionDefinition.validate(value);
      } catch (ex: unknown) {
        throw new errors.OptionInvalid({
          message: (ex as CustomError).message,
          data: { optionDefinition }
        });
      }
    }
  }
};

export {
  validateOptions
};
