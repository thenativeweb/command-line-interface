import { Command } from '../../../../../lib';
import { FailOptions } from './FailOptions';

export const fail: Command<FailOptions> = {
  name: 'fail',
  description: 'Fail your application on remote.',
  optionDefinitions: [],
  handle ({ options }: { options: FailOptions }): void {
    console.log('builder.remote.fail command');
    console.log(JSON.stringify(options));

    throw new Error('Something went purposefully wrong.');
  }
};
