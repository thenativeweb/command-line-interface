import { assert } from 'assertthat';
import { Command } from '../../lib/elements/Command';
import { CustomError } from 'defekt';
import { getCommandByPath } from '../../lib/getCommandByPath';
import * as errors from '../../lib/errors';

suite('getCommandByPath', (): void => {
  const rootCommand: Command<any> = {
    name: 'level-zero',
    description: '',
    optionDefinitions: [],
    subcommands: {
      'level-one-a': {
        name: 'level-one-a',
        description: '',
        optionDefinitions: [],
        handle (): void {
          // Intentionally left empty.
        }
      },
      'level-one-b': {
        name: 'level-one-b',
        description: '',
        optionDefinitions: [],
        subcommands: {
          'level-two-b-a': {
            name: 'level-two-b-a',
            description: '',
            optionDefinitions: [],
            handle (): void {
              // Intentionally left empty.
            }
          },
          'level-two-b-b': {
            name: 'level-two-b-b',
            description: '',
            optionDefinitions: [],
            handle (): void {
              // Intentionally left empty.
            }
          }
        },
        handle (): void {
          // Intentionally left empty.
        }
      }
    },
    handle (): void {
      // Intentionally left empty.
    }
  };

  test('one level.', async (): Promise<void> => {
    const commandPath = [ 'level-zero' ];

    const command = getCommandByPath({ rootCommand, commandPath });

    assert.that(command.name).is.equalTo('level-zero');
  });

  test('two levels a.', async (): Promise<void> => {
    const commandPath = [ 'level-zero', 'level-one-a' ];

    const command = getCommandByPath({ rootCommand, commandPath });

    assert.that(command.name).is.equalTo('level-one-a');
  });

  test('two levels b.', async (): Promise<void> => {
    const commandPath = [ 'level-zero', 'level-one-b' ];

    const command = getCommandByPath({ rootCommand, commandPath });

    assert.that(command.name).is.equalTo('level-one-b');
  });

  test('three levels b-a.', async (): Promise<void> => {
    const commandPath = [ 'level-zero', 'level-one-b', 'level-two-b-a' ];

    const command = getCommandByPath({ rootCommand, commandPath });

    assert.that(command.name).is.equalTo('level-two-b-a');
  });

  test('three levels b-b.', async (): Promise<void> => {
    const commandPath = [ 'level-zero', 'level-one-b', 'level-two-b-b' ];

    const command = getCommandByPath({ rootCommand, commandPath });

    assert.that(command.name).is.equalTo('level-two-b-b');
  });

  test(`throws an error if the root command's name doesn't match.`, async (): Promise<void> => {
    const commandPath = [ 'foo' ];

    assert.that((): any => getCommandByPath({ rootCommand, commandPath })).
      is.throwing(
        (ex): boolean => (ex as CustomError).code === errors.InvalidOperation.code
      );
  });

  test(`throws an error if a command doesn't have any sub-commands.`, async (): Promise<void> => {
    const commandPath = [ 'level-zero', 'level-one-a', 'level-two-a-a' ];

    assert.that((): any => getCommandByPath({ rootCommand, commandPath })).
      is.throwing(
        (ex): boolean => (ex as CustomError).code === errors.CommandNotFound.code
      );
  });

  test(`throws an error if a command doesn't have a matching sub-command.`, async (): Promise<void> => {
    const commandPath = [ 'level-zero', 'level-one-b', 'level-two-b-c' ];

    assert.that((): any => getCommandByPath({ rootCommand, commandPath })).
      is.throwing(
        (ex): boolean => (ex as CustomError).code === errors.CommandNotFound.code
      );
  });
});
