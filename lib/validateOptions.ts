import { errors } from './errors';
import { OptionDefinition } from './elements/OptionDefinition';

const validateOptions = function ({ options, optionDefinitions }: {
  options: any;
  optionDefinitions: OptionDefinition[];
}): void {
  for (const [ name, value ] of Object.entries(options)) {
    if (name === 'help') {
      continue;
    }

    const optionDefinition = optionDefinitions.find((definition): boolean => definition.name === name);

    if (optionDefinition === undefined) {
      throw new errors.OperationInvalid('Option was parsed without option definition.');
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
          throw new errors.OptionInvalid(`Option '${name}' must be a number.`);
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
