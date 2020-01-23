import { addHelpCommandToCli } from '../../lib/addHelpCommandToCli';
import { assert } from 'assertthat';
import { builder } from '../shared/example/builder';
import { getShowUsage } from 'lib/usage/getShowUsage';
import { record } from 'record-stdstreams';
import { runCli } from '../../lib/runCli';

suite('Cli', (): void => {
  let stop: () => { stderr: string; stdout: string };

  setup(async (): Promise<void> => {
    stop = record(false);
  });

  teardown(async (): Promise<void> => {
    stop();
  });

  suite(`sample application 'builder'`, (): void => {
    const extendedBuilderCli = addHelpCommandToCli({ rootCommand: builder });

    suite('builder command', (): void => {
      test('runs the top level command.', async (): Promise<void> => {
        const command: string[] = [];

        await runCli({ rootCommand: builder, argv: command });

        const { stderr, stdout } = stop();

        assert.that(stderr).is.equalTo('');

        const lines = stdout.split('\n');

        assert.that(lines[0]).is.equalTo('builder command');
        assert.that(JSON.parse(lines[1])).is.equalTo({
          verbose: false,
          help: false
        });
      });

      test('runs the top level command and parser verbose flag.', async (): Promise<void> => {
        const command: string[] = [ '-v' ];

        await runCli({ rootCommand: builder, argv: command });

        const { stderr, stdout } = stop();

        assert.that(stderr).is.equalTo('');

        const lines = stdout.split('\n');

        assert.that(lines[0]).is.equalTo('builder command');
        assert.that(JSON.parse(lines[1])).is.equalTo({
          verbose: true,
          help: false
        });
      });

      test('displays the top level help with --help flag.', async (): Promise<void> => {
        const command: string[] = [ '--help' ];

        await runCli({ rootCommand: builder, argv: command });

        const { stderr, stdout } = stop();

        assert.that(stderr).is.equalTo('');
        assert.that(stdout).is.equalTo(`${getShowUsage({ rootCommand: extendedBuilderCli })({ commandPath: [ 'builder' ]})}\n`);
      });

      test('displays the top level help with --help flag, even if a subcommand is given.', async (): Promise<void> => {
        const command: string[] = [ '--help', 'build' ];

        await runCli({ rootCommand: builder, argv: command });

        const { stderr, stdout } = stop();

        assert.that(stderr).is.equalTo('');
        assert.that(stdout).is.equalTo(`${getShowUsage({ rootCommand: extendedBuilderCli })({ commandPath: [ 'builder' ]})}\n`);
      });

      test('suggests alternatives if subcommands exist and the given command is not recognized.', async (): Promise<void> => {
        const command: string[] = [ 'bliud' ];

        await runCli({ rootCommand: builder, argv: command });

        const { stderr, stdout } = stop();

        assert.that(stderr).is.equalTo('');

        const lines = stdout.split('\n');

        assert.that(lines[0]).is.equalTo(`Unknown command 'bliud'. Did you mean 'build'?`);
        assert.that(lines.slice(1).join('\n')).is.equalTo(`${getShowUsage({ rootCommand: extendedBuilderCli })({ commandPath: [ 'builder' ]})}\n`);
      });

      suite('builder.build command', (): void => {
        test('runs the second level build command and passes top level options.', async (): Promise<void> => {
          const command: string[] = [ '-v', 'build' ];

          await runCli({ rootCommand: builder, argv: command });

          const { stderr, stdout } = stop();

          assert.that(stderr).is.equalTo('');

          const lines = stdout.split('\n');

          assert.that(lines[0]).is.equalTo('builder.build command');
          assert.that(JSON.parse(lines[1])).is.equalTo({
            verbose: true,
            help: false,
            minify: false,
            uglify: false
          });
        });

        test('runs the second level build command and parses all options.', async (): Promise<void> => {
          const command: string[] = [ '-v', 'build', '-m', '--uglify' ];

          await runCli({ rootCommand: builder, argv: command });

          const { stderr, stdout } = stop();

          assert.that(stderr).is.equalTo('');

          const lines = stdout.split('\n');

          assert.that(lines[0]).is.equalTo('builder.build command');
          assert.that(JSON.parse(lines[1])).is.equalTo({
            verbose: true,
            help: false,
            minify: true,
            uglify: true
          });
        });

        test('displays an error and the current level help if an option is not recognized.', async (): Promise<void> => {
          const command: string[] = [ 'build', '--foo' ];

          await runCli({ rootCommand: builder, argv: command });

          const { stderr, stdout } = stop();

          assert.that(stderr).is.equalTo('');

          const lines = stdout.split('\n');

          assert.that(lines[0]).is.equalTo(`Unknown option '--foo'.`);
          assert.that(lines.slice(1).join('\n')).is.equalTo(`${getShowUsage({ rootCommand: extendedBuilderCli })({ commandPath: [ 'builder', 'build' ]})}\n`);
        });
      });

      suite('builder.remote command', (): void => {
        test('runs the second level remote command and parses all options.', async (): Promise<void> => {
          const command: string[] = [ '-v', 'remote', '-r', 'foo' ];

          await runCli({ rootCommand: builder, argv: command });

          const { stderr, stdout } = stop();

          assert.that(stderr).is.equalTo('');

          const lines = stdout.split('\n');

          assert.that(lines[0]).is.equalTo('builder.remote command');
          assert.that(JSON.parse(lines[1])).is.equalTo({
            verbose: true,
            help: false,
            remote: 'foo'
          });
        });

        suite('builder.remote.ls command', (): void => {
          test('runs the third level ls command and parses all options.', async (): Promise<void> => {
            const command: string[] = [ '-v', 'remote', '-r', 'foo', 'ls', '-a' ];

            await runCli({ rootCommand: builder, argv: command });

            const { stderr, stdout } = stop();

            assert.that(stderr).is.equalTo('');

            const lines = stdout.split('\n');

            assert.that(lines[0]).is.equalTo('builder.remote.ls command');
            assert.that(JSON.parse(lines[1])).is.equalTo({
              verbose: true,
              help: false,
              remote: 'foo',
              all: true
            });
          });
        });
      });

      suite('builder.help command', (): void => {
        test('displays the top level help if no command is given.', async (): Promise<void> => {
          const command: string[] = [ 'help' ];

          await runCli({ rootCommand: builder, argv: command });

          const { stderr, stdout } = stop();

          assert.that(stderr).is.equalTo('');
          assert.that(stdout).is.equalTo(`${getShowUsage({ rootCommand: extendedBuilderCli })({ commandPath: [ 'builder' ]})}\n`);
        });

        test('displays the help of the given command.', async (): Promise<void> => {
          const command: string[] = [ 'help', 'build' ];

          await runCli({ rootCommand: builder, argv: command });

          const { stderr, stdout } = stop();

          assert.that(stderr).is.equalTo('');
          assert.that(stdout).is.equalTo(`${getShowUsage({ rootCommand: extendedBuilderCli })({ commandPath: [ 'builder', 'build' ]})}\n`);
        });

        test('displays the help for the help command if the help flag is set.', async (): Promise<void> => {
          const command: string[] = [ 'help', '--help' ];

          await runCli({ rootCommand: builder, argv: command });

          const { stderr, stdout } = stop();

          assert.that(stderr).is.equalTo('');
          assert.that(stdout).is.equalTo(`${getShowUsage({ rootCommand: extendedBuilderCli })({ commandPath: [ 'builder', 'help' ]})}\n`);
        });

        // TODO: add tests for error message on unknown command
      });
    });
  });
});
