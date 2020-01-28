import { Command } from '../../../../../lib';
import { RequiredOptions } from './RequiredOptions';

const required: Command<RequiredOptions> = {
  name: 'required',
  description: 'Required.',
  optionDefinitions: [
    {
      name: 'required',
      type: 'string',
      alias: 'r',
      isRequired: true
    },
    {
      name: 'optional',
      type: 'string',
      alias: 'o'
    }
  ],
  handle ({ options }): void {
    /* eslint-disable no-console */
    console.log('various.required command');
    console.log(JSON.stringify(options));
    /* eslint-enable no-console */
  }
};

export { required };
