import { Command } from '../../../../../lib';
import { NumberOptions } from './NumberOptions';

const number: Command<NumberOptions> = {
  name: 'number',
  description: 'Fails.',
  optionDefinitions: [
    {
      name: 'number',
      type: 'number',
      alias: 'n'
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
