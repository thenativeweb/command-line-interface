import { Command } from '../../../../../lib';
import { NumberOptions } from './NumberOptions';

const number: Command<NumberOptions> = {
  name: 'number',
  description: 'Number.',
  optionDefinitions: [
    {
      name: 'number',
      type: 'number',
      alias: 'n',
      description: 'Must not be bigger than 500.',
      isRequired: true,
      validate (value): void {
        if (value > 500) {
          throw new Error('Number must not be bigger than 500.');
        }
      }
    }
  ],
  handle ({ options }): void {
    /* eslint-disable no-console */
    console.log('various.number command');
    console.log(JSON.stringify(options));
    /* eslint-enable no-console */
  }
};

export { number };
