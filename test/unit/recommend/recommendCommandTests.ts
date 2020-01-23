import { assert } from 'assertthat';
import { Command } from '../../../lib/elements/Command';
import { CustomError } from 'defekt';
import { recommendCommand } from '../../../lib/recommend/recommendCommand';

suite('recommendCommand', (): void => {
  const rootCommand: Command<any> = {
    name: 'level-zero',
    description: '',
    optionDefinitions: [],
    subcommands: {
      abcd: {
        name: 'abcd',
        description: '',
        optionDefinitions: [],
        handle (): void {
          // Intentionally left empty.
        }
      },
      wxyz: {
        name: 'wxyz',
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
  };

  test('recommends a matching command.', async (): Promise<void> => {
    const commandPath = [ 'level-zero', 'abef' ];

    const recommendation = recommendCommand({ rootCommand, commandPath });

    assert.that(recommendation).is.equalTo('abcd');
  });

  test(`throws an error if the command path doesn't match the root command's structure.`, async (): Promise<void> => {
    const commandPath = [ 'level-zero', 'wxyz', 'foo' ];

    assert.that((): any => recommendCommand({ rootCommand, commandPath })).
      is.throwing(
        (ex): boolean => (ex as CustomError).code === 'ENOSUGGESTIONAVAILABLE'
      );
  });
});
