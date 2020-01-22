import { addHelpCommandToCli } from '../../lib/addHelpCommandToCli';
import { assert } from 'assertthat';
import { builder } from '../../example/builder';
import { getShowUsage } from 'lib/usage/getShowUsage';
import { record } from 'record-stdstreams';
import { runCli } from '../../lib/runCli';

suite('Cli', (): void => {
  suite(`sample application 'builder'`, (): void => {
    const extendedBuilderCli = addHelpCommandToCli(builder);

    suite('builder command', (): void => {
      test('runs the top level command.', async (): Promise<void> => {
        const stop = record(false);
        const command: string[] = [];

        await runCli(builder, command);

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
        const stop = record(false);
        const command: string[] = [ '-v' ];

        await runCli(builder, command);

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
        const stop = record(false);
        const command: string[] = [ '--help' ];

        await runCli(builder, command);

        const { stderr, stdout } = stop();

        assert.that(stderr).is.equalTo('');
        assert.that(stdout).is.equalTo(`${getShowUsage(extendedBuilderCli)({ commandPath: [ 'builder' ]})}\n`);
      });

      test('displays the top level help with --help flag, even if a subcommand is given.', async (): Promise<void> => {
        const stop = record(false);
        const command: string[] = [ '--help', 'build' ];

        await runCli(builder, command);

        const { stderr, stdout } = stop();

        assert.that(stderr).is.equalTo('');
        assert.that(stdout).is.equalTo(`${getShowUsage(extendedBuilderCli)({ commandPath: [ 'builder' ]})}\n`);
      });

      // TODO: add tests for error messag if an option is unexpected
    });

    // TODO: add tests for command suggestions if no command is recognized

    suite('builder.build command', (): void => {
      test('runs the second level build command and passes top level options.', async (): Promise<void> => {
        const stop = record(false);
        const command: string[] = [ '-v', 'build' ];

        await runCli(builder, command);

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
        const stop = record(false);
        const command: string[] = [ '-v', 'build', '-m', '--uglify' ];

        await runCli(builder, command);

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
    });

    suite('builder.help command', (): void => {
      test('displays the top level help if no command is given.', async (): Promise<void> => {
        const stop = record(false);
        const command: string[] = [ 'help' ];

        await runCli(builder, command);

        const { stderr, stdout } = stop();

        assert.that(stderr).is.equalTo('');

        const lines = stdout.split('\n');

        assert.that(lines[0]).is.equalTo('builder.help command');
        assert.that(lines.slice(1).join('\n')).is.equalTo(`${getShowUsage(extendedBuilderCli)({ commandPath: [ 'builder' ]})}\n`);
      });

      test('displays the help of the given command.', async (): Promise<void> => {
        const stop = record(false);
        const command: string[] = [ 'help', 'build' ];

        await runCli(builder, command);

        const { stderr, stdout } = stop();

        assert.that(stderr).is.equalTo('');

        const lines = stdout.split('\n');

        assert.that(lines[0]).is.equalTo('builder.help command');
        assert.that(lines.slice(1).join('\n')).is.equalTo(`${getShowUsage(extendedBuilderCli)({ commandPath: [ 'builder', 'build' ]})}\n`);
      });

      test('displays the help for the help command if the help flag is set.', async (): Promise<void> => {
        const stop = record(false);
        const command: string[] = [ 'help', '--help' ];

        await runCli(builder, command);

        const { stderr, stdout } = stop();

        assert.that(stderr).is.equalTo('');
        assert.that(stdout).is.equalTo(`${getShowUsage(extendedBuilderCli)({ commandPath: [ 'builder', 'help' ]})}\n`);
      });

      // TODO: add tests for error message on unknown command
    });
  });
});
