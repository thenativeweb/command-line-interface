import { assert } from 'assertthat';
import { Command, runCli } from '../../../lib';

suite('Command', (): void => {
  test('intermediary command can not have a default option.', async (): Promise<void> => {
    const command: Command<any> = {
      name: 'test',
      description: '',
      optionDefinitions: [
        {
          name: 'format',
          type: 'number',
          isRequired: true,
          defaultOption: true
        }
      ],
      handle (): void {
        // Intentionally left empty.
      },
      subcommands: {
        foobar: {
          name: 'foobar',
          description: '',
          optionDefinitions: [],
          handle (): void {
            // Intentionally left empty.
          }
        }
      }
    };

    await assert.that(async (): Promise<void> => {
      await runCli({
        rootCommand: command,
        argv: [ '--format', '100' ]
      });
    }).is.throwingAsync(`Option 'format' in command 'test' may not be a default option, since the command has sub-commands.`);
  });
});
