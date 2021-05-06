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
        content: [ 'Test description.' ]
      }, {
        header: 'Synopsis',
        content: [ getCommandSynopsis({ command }) ]
      }
    ]);
  });

  test('top level command with some options and no sub-commands.', async (): Promise<void> => {
    const command: Command<any> = {
      name: 'test',
      description: 'Test description.',
      remarks: `
        This is a remark.

        It spans multiple lines.
      `,
      optionDefinitions: [
        {
          name: 'test',
          defaultOption: true,
          parameterName: 'param',
          multiple: true,
          type: 'string'
        }
      ],
      handle (): void {
        // Intentionally left empty.
      }
    };

    const configuration = getCommandLineUsageConfiguration({ rootCommand: command, commandPath: [ 'test' ]});

    assert.that(configuration.length).is.equalTo(4);
    assert.that(configuration[0]).is.equalTo({
      header: 'test',
      content: [ 'Test description.' ]
    });
    assert.that(configuration[1]).is.equalTo({
      header: 'Synopsis',
      content: [ getCommandSynopsis({ command }) ]
    });
    assert.that(configuration[2]).is.atLeast({
      header: 'Options',
      optionList: [
        {
          name: 'test',
          alias: undefined,
          defaultOption: true,
          defaultValue: undefined,
          lazyMultiple: true,
          typeLabel: `{underline param}`
        }
      ]
    });
    assert.that(configuration[3]).is.equalTo({
      header: 'Remarks',
      content: [ 'This is a remark.\n\nIt spans multiple lines.' ]
    });
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
          multiple: true,
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

    assert.that(configuration.length).is.equalTo(4);
    assert.that(configuration[0]).is.equalTo({
      header: 'test',
      content: [ 'Test description.' ]
    });
    assert.that(configuration[1]).is.equalTo({
      header: 'Synopsis',
      content: [ getCommandSynopsis({ command }) ]
    });
    assert.that(configuration[2]).is.atLeast({
      header: 'Options',
      optionList: [
        {
          name: 'test',
          alias: undefined,
          defaultOption: true,
          defaultValue: undefined,
          lazyMultiple: true,
          typeLabel: `{underline param}`
        }
      ]
    });
    assert.that(configuration[3]).is.equalTo({
      header: 'Commands',
      content: [
        { name: 'sub1', description: 'description of sub1' },
        { name: 'sub2', description: 'description of sub2' }
      ]
    });
  });
});
