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
      isRequired: true
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
