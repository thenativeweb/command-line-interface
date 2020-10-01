import { Command } from '../../../../../lib';

const fail: Command<Record<string, unknown>> = {
  name: 'fail',
  description: 'Fails.',
  optionDefinitions: [],
  handle (): void {
    throw new Error('This command fails intentionally.');
  }
};

export { fail };
