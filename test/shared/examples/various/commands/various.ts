import { Command } from '../../../../../lib';
import { number } from './number';
import { required } from './required';
import { VariousOptions } from './VariousOptions';

const various: Command<VariousOptions> = {
  name: 'various',
  description: 'A tool for various tests.',
  optionDefinitions: [],
  subcommands: {
    number,
    required
  },
  handle ({ options }): void {
    /* eslint-disable no-console */
    console.log('various command');
    console.log(JSON.stringify(options));
    /* eslint-enable no-console */
  }
};

export { various };
