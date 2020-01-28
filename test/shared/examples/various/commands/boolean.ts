import { BooleanOptions } from './BooleanOptions';
import { Command } from '../../../../../lib';

const boolean: Command<BooleanOptions> = {
  name: 'boolean',
  description: 'Fails.',
  optionDefinitions: [
    {
      name: 'boolean',
      type: 'boolean',
      alias: 'n'
    }
  ],
  handle ({ options }): void {
    /* eslint-disable no-console */
    console.log('various.boolean command');
    console.log(JSON.stringify(options));
    /* eslint-enable no-console */
  }
};

export { boolean };
