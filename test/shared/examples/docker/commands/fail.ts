import { Command } from '../../../../../lib';
import { ls } from './image/ls';
import { rm } from './image/rm';

const fail: Command<{}> = {
  name: 'fail',
  description: 'Fails.',
  optionDefinitions: [],
  subcommands: {
    ls,
    rm
  },
  handle ({ options }): void {
    throw Error('This command fails intentionally.');
  }
};

export { fail };
