import { assert } from 'assertthat';
import { Command } from '../../../lib/elements/Command';
import { getCommandSynopsis } from '../../../lib/usage/getCommandSynopsis';

suite('getCommandSynopsis', (): void => {
  test('a minimal command synopsis.', async (): Promise<void> => {
    const command: Command<any> = {
      name: 'test',
      description: '',
      optionDefinitions: [],
      handle (): void {
        // Intentionally left empty.
      }
    };

    const synopsis = getCommandSynopsis({ command });

    assert.that(synopsis).is.equalTo('test');
  });

  suite('boolean parameter', (): void => {
    test('a required boolean parameter.', async (): Promise<void> => {
      const command: Command<any> = {
        name: 'test',
        description: '',
        optionDefinitions: [
          {
            name: 'debug',
            type: 'boolean'
          }
        ],
        handle (): void {
          // Intentionally left empty.
        }
      };

      const synopsis = getCommandSynopsis({ command });

      assert.that(synopsis).is.equalTo('test --debug');
    });

    test('an optional boolean parameter.', async (): Promise<void> => {
      const command: Command<any> = {
        name: 'test',
        description: '',
        optionDefinitions: [
          {
            name: 'debug',
            type: 'boolean',
            defaultValue: false
          }
        ],
        handle (): void {
          // Intentionally left empty.
        }
      };

      const synopsis = getCommandSynopsis({ command });

      assert.that(synopsis).is.equalTo('test [--debug]');
    });
  });

  suite('string parameter', (): void => {
    test('a required string parameter.', async (): Promise<void> => {
      const command: Command<any> = {
        name: 'test',
        description: '',
        optionDefinitions: [
          {
            name: 'format',
            type: 'string'
          }
        ],
        handle (): void {
          // Intentionally left empty.
        }
      };

      const synopsis = getCommandSynopsis({ command });

      assert.that(synopsis).is.equalTo('test --format {underline string}');
    });

    test('an optional string parameter.', async (): Promise<void> => {
      const command: Command<any> = {
        name: 'test',
        description: '',
        optionDefinitions: [
          {
            name: 'format',
            type: 'string',
            defaultValue: false
          }
        ],
        handle (): void {
          // Intentionally left empty.
        }
      };

      const synopsis = getCommandSynopsis({ command });

      assert.that(synopsis).is.equalTo('test [--format {underline string}]');
    });

    test('a required multiple string parameter.', async (): Promise<void> => {
      const command: Command<any> = {
        name: 'test',
        description: '',
        optionDefinitions: [
          {
            name: 'format',
            type: 'string',
            multiple: 'on'
          }
        ],
        handle (): void {
          // Intentionally left empty.
        }
      };

      const synopsis = getCommandSynopsis({ command });

      assert.that(synopsis).is.equalTo('test --format {underline string[]}');
    });

    test('a required string parameter with parameter name.', async (): Promise<void> => {
      const command: Command<any> = {
        name: 'test',
        description: '',
        optionDefinitions: [
          {
            name: 'format',
            type: 'string',
            parameterName: 'foo'
          }
        ],
        handle (): void {
          // Intentionally left empty.
        }
      };

      const synopsis = getCommandSynopsis({ command });

      assert.that(synopsis).is.equalTo('test --format {underline foo}');
    });
  });

  suite('number parameter', (): void => {
    test('a required number parameter.', async (): Promise<void> => {
      const command: Command<any> = {
        name: 'test',
        description: '',
        optionDefinitions: [
          {
            name: 'format',
            type: 'number'
          }
        ],
        handle (): void {
          // Intentionally left empty.
        }
      };

      const synopsis = getCommandSynopsis({ command });

      assert.that(synopsis).is.equalTo('test --format {underline number}');
    });

    test('an optional number parameter.', async (): Promise<void> => {
      const command: Command<any> = {
        name: 'test',
        description: '',
        optionDefinitions: [
          {
            name: 'format',
            type: 'number',
            defaultValue: false
          }
        ],
        handle (): void {
          // Intentionally left empty.
        }
      };

      const synopsis = getCommandSynopsis({ command });

      assert.that(synopsis).is.equalTo('test [--format {underline number}]');
    });

    test('a required multiple number parameter.', async (): Promise<void> => {
      const command: Command<any> = {
        name: 'test',
        description: '',
        optionDefinitions: [
          {
            name: 'format',
            type: 'number',
            multiple: 'on'
          }
        ],
        handle (): void {
          // Intentionally left empty.
        }
      };

      const synopsis = getCommandSynopsis({ command });

      assert.that(synopsis).is.equalTo('test --format {underline number[]}');
    });

    test('a required number parameter with parameter name.', async (): Promise<void> => {
      const command: Command<any> = {
        name: 'test',
        description: '',
        optionDefinitions: [
          {
            name: 'format',
            type: 'number',
            parameterName: 'foo'
          }
        ],
        handle (): void {
          // Intentionally left empty.
        }
      };

      const synopsis = getCommandSynopsis({ command });

      assert.that(synopsis).is.equalTo('test --format {underline foo}');
    });
  });

  suite('mix', (): void => {
    test('a mix of options.', async (): Promise<void> => {
      const command: Command<any> = {
        name: 'test',
        description: '',
        optionDefinitions: [
          {
            name: 'size',
            type: 'number',
            parameterName: 'kilobytes'
          },
          {
            name: 'verbose',
            type: 'boolean'
          },
          {
            name: 'format',
            type: 'string',
            defaultValue: ''
          }
        ],
        handle (): void {
          // Intentionally left empty.
        }
      };

      const synopsis = getCommandSynopsis({ command });

      assert.that(synopsis).is.equalTo('test --size {underline kilobytes} --verbose [--format {underline string}]');
    });
  });
});