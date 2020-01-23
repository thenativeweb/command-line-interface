import { assert } from 'assertthat';
import { Command } from '../../../lib/elements/Command';
import { getCommandLineUsageConfiguration } from '../../../lib/usage/getCommandLineUsageConfiguration';
import { getCommandSynopsis } from '../../../lib/usage/getCommandSynopsis';

suite('getCommandLineUsageConfiguration', (): void => {
  test('top level command without options or sub-commands.', async (): Promise<void> => {
    const command: Command<any> = {
      name: 'test',
      description: 'Test description.',
      optionDefinitions: [],
      handle (): void {
        // Intentionally left empty.
      }
    };

    const configuration = getCommandLineUsageConfiguration({ rootCommand: command, commandPath: [ 'test' ]});

    assert.that(configuration).is.equalTo([
      {
        header: 'test',
        content: [
          `> ${getCommandSynopsis({ command })}`,
          '',
          'Test description.'
        ]
      }
    ]);
  });

  test('top level command with some options and no sub-commands.', async (): Promise<void> => {
    const command: Command<any> = {
      name: 'test',
      description: 'Test description.',
      optionDefinitions: [
        {
          name: 'test',
          defaultOption: true,
          parameterName: 'param',
          multiple: 'on',
          type: 'string'
        }
      ],
      handle (): void {
        // Intentionally left empty.
      }
    };

    const configuration = getCommandLineUsageConfiguration({ rootCommand: command, commandPath: [ 'test' ]});

    assert.that(configuration).is.atLeast([
      {
        header: 'test',
        content: [
          `> ${getCommandSynopsis({ command })}`,
          '',
          'Test description.'
        ]
      },
      {
        header: 'Options',
        optionList: [
          {
            name: 'test',
            alias: undefined,
            defaultOption: true,
            defaultValue: undefined,
            multiple: true,
            lazyMultiple: false,
            typeLabel: `{underline param}`
          }
        ]
      }
    ]);
  });

  test('top level command with some options and some sub-commands.', async (): Promise<void> => {
    const command: Command<any> = {
      name: 'test',
      description: 'Test description.',
      optionDefinitions: [
        {
          name: 'test',
          defaultOption: true,
          parameterName: 'param',
          multiple: 'on',
          type: 'string'
        }
      ],
      subcommands: {
        sub1: {
          name: 'sub1',
          description: 'description of sub1'
        } as Command<any>,
        sub2: {
          name: 'sub2',
          description: 'description of sub2'
        } as Command<any>
      },
      handle (): void {
        // Intentionally left empty.
      }
    };

    const configuration = getCommandLineUsageConfiguration({ rootCommand: command, commandPath: [ 'test' ]});

    assert.that(configuration).is.atLeast([
      {
        header: 'test',
        content: [
          `> ${getCommandSynopsis({ command })}`,
          '',
          'Test description.'
        ]
      },
      {
        header: 'Options',
        optionList: [
          {
            name: 'test',
            alias: undefined,
            defaultOption: true,
            defaultValue: undefined,
            multiple: true,
            lazyMultiple: false,
            typeLabel: `{underline param}`
          }
        ]
      },
      {
        header: 'Commands',
        content: [
          { name: 'sub1', description: 'description of sub1' },
          { name: 'sub2', description: 'description of sub2' }
        ]
      }
    ]);
  });
});
