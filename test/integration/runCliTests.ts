import { addHelpCommandToCli } from '../../lib/addHelpCommandToCli';
import { assert } from 'assertthat';
import { docker } from '../shared/example/docker/docker';
import { getShowUsage } from 'lib/usage/getShowUsage';
import { record } from 'record-stdstreams';
import { runCli } from '../../lib/runCli';
import sinon, { SinonStub } from 'sinon';

suite('Cli', (): void => {
  let stop: () => { stderr: string; stdout: string };

  setup(async (): Promise<void> => {
    stop = record(false);
    sinon.stub(process, 'exit');
  });

  teardown(async (): Promise<void> => {
    stop();
    (process.exit as unknown as SinonStub).restore();
  });

  suite(`sample application 'docker'`, (): void => {
    const extendedBuilderCli = addHelpCommandToCli({ rootCommand: docker });

    suite('docker command', (): void => {
      test('runs the top level command.', async (): Promise<void> => {
        const command: string[] = [];

        await runCli({ rootCommand: docker, argv: command });

        const { stderr, stdout } = stop();

        assert.that(stderr).is.equalTo('');

        const lines = stdout.split('\n');

        assert.that(lines[0]).is.equalTo('docker command');
        assert.that(JSON.parse(lines[1])).is.equalTo({
          config: '~/.docker',
          context: '',
          debug: false,
          'log-level': 'info',
          help: false
        });
      });

      test('runs the top level command and parse debug flag.', async (): Promise<void> => {
        const command: string[] = [ '-D' ];

        await runCli({ rootCommand: docker, argv: command });

        const { stderr, stdout } = stop();

        assert.that(stderr).is.equalTo('');

        const lines = stdout.split('\n');

        assert.that(lines[0]).is.equalTo('docker command');
        assert.that(JSON.parse(lines[1])).is.equalTo({
          config: '~/.docker',
          context: '',
          debug: true,
          'log-level': 'info',
          help: false
        });
      });

      test('displays the top level help with --help flag.', async (): Promise<void> => {
        const command: string[] = [ '--help' ];

        await runCli({ rootCommand: docker, argv: command });

        const { stderr, stdout } = stop();

        assert.that(stderr).is.equalTo('');
        assert.that(stdout).is.equalTo(`${getShowUsage({ rootCommand: extendedBuilderCli })({ commandPath: [ 'docker' ]})}\n`);
      });

      test('displays the top level help with --help flag, even if a subcommand is given.', async (): Promise<void> => {
        const command: string[] = [ '--help', 'image', '--help' ];

        await runCli({ rootCommand: docker, argv: command });

        const { stderr, stdout } = stop();

        assert.that(stderr).is.equalTo('');
        assert.that(stdout).is.equalTo(`${getShowUsage({ rootCommand: extendedBuilderCli })({ commandPath: [ 'docker' ]})}\n`);
      });

      test('suggests alternatives and returns status code 1 if subcommands exist and the given command is not recognized.', async (): Promise<void> => {
        const command: string[] = [ 'imgea' ];

        await runCli({ rootCommand: docker, argv: command });

        const { stderr, stdout } = stop();

        assert.that(stderr).is.equalTo('');
        assert.that(stdout).is.equalTo(`Unknown command 'imgea'. Did you mean 'image'?\n`);
        assert.that((process.exit as unknown as SinonStub).calledWith(1)).is.true();
      });

      suite('docker.image command', (): void => {
        test('runs the second level image command and passes top level options.', async (): Promise<void> => {
          const command: string[] = [ '-D', 'image' ];

          await runCli({ rootCommand: docker, argv: command });

          const { stderr, stdout } = stop();

          assert.that(stderr).is.equalTo('');

          const lines = stdout.split('\n');

          assert.that(lines[0]).is.equalTo('docker.image command');
          assert.that(JSON.parse(lines[1])).is.equalTo({
            config: '~/.docker',
            context: '',
            debug: true,
            'log-level': 'info',
            help: false
          });
        });

        suite('docker.image.ls command', (): void => {
          test('runs the third level ls command and parses all options.', async (): Promise<void> => {
            const command: string[] = [ '-D', 'image', 'ls', '-a', '--filter', 'some-filter' ];

            await runCli({ rootCommand: docker, argv: command });

            const { stderr, stdout } = stop();

            assert.that(stderr).is.equalTo('');

            const lines = stdout.split('\n');

            assert.that(lines[0]).is.equalTo('docker.image.ls command');
            assert.that(JSON.parse(lines[1])).is.equalTo({
              config: '~/.docker',
              context: '',
              debug: true,
              'log-level': 'info',
              help: false,
              all: true,
              digests: false,
              filter: 'some-filter',
              format: '',
              'no-trunc': false,
              quiet: false
            });
          });

          test('displays an error and returns status code 1 if an option is not recognized.', async (): Promise<void> => {
            const command: string[] = [ 'image', 'ls', '--foo' ];

            await runCli({ rootCommand: docker, argv: command });

            const { stderr, stdout } = stop();

            assert.that(stderr).is.equalTo('');
            assert.that(stdout).is.equalTo(`Unknown option '--foo'.\n`);
            assert.that((process.exit as unknown as SinonStub).calledWith(1)).is.true();
          });
        });

        suite('docker.image.rm command', (): void => {
          test('runs the third level rm command and parses the default option.', async (): Promise<void> => {
            const command: string[] = [ 'image', 'rm', 'image-name' ];

            await runCli({ rootCommand: docker, argv: command });

            const { stderr, stdout } = stop();

            assert.that(stderr).is.equalTo('');

            const lines = stdout.split('\n');

            assert.that(lines[0]).is.equalTo('docker.image.rm command');
            assert.that(JSON.parse(lines[1])).is.equalTo({
              config: '~/.docker',
              context: '',
              debug: false,
              'log-level': 'info',
              help: false,
              force: false,
              'no-prune': false,
              image: [ 'image-name' ]
            });
          });
        });
      });

      suite('docker.volume command', (): void => {
        test('runs the second level volume command and passes top level options.', async (): Promise<void> => {
          const command: string[] = [ '-D', 'volume' ];

          await runCli({ rootCommand: docker, argv: command });

          const { stderr, stdout } = stop();

          assert.that(stderr).is.equalTo('');

          const lines = stdout.split('\n');

          assert.that(lines[0]).is.equalTo('docker.volume command');
          assert.that(JSON.parse(lines[1])).is.equalTo({
            config: '~/.docker',
            context: '',
            debug: true,
            'log-level': 'info',
            help: false
          });
        });

        suite('docker.volume.ls command', (): void => {
          test('runs the third level ls command and parses all options.', async (): Promise<void> => {
            const command: string[] = [ '-D', 'volume', 'ls', '--filter', 'some-filter' ];

            await runCli({ rootCommand: docker, argv: command });

            const { stderr, stdout } = stop();

            assert.that(stderr).is.equalTo('');

            const lines = stdout.split('\n');

            assert.that(lines[0]).is.equalTo('docker.volume.ls command');
            assert.that(JSON.parse(lines[1])).is.equalTo({
              config: '~/.docker',
              context: '',
              debug: true,
              'log-level': 'info',
              help: false,
              filter: 'some-filter',
              format: '',
              quiet: false
            });
          });

          test('displays an error and returns status code 1 if an option is not recognized.', async (): Promise<void> => {
            const command: string[] = [ 'volume', 'ls', '--foo' ];

            await runCli({ rootCommand: docker, argv: command });

            const { stderr, stdout } = stop();

            assert.that(stderr).is.equalTo('');
            assert.that(stdout).is.equalTo(`Unknown option '--foo'.\n`);
            assert.that((process.exit as unknown as SinonStub).calledWith(1)).is.true();
          });
        });
      });

      suite('docker.help command', (): void => {
        test('displays the top level help if no command is given.', async (): Promise<void> => {
          const command: string[] = [ 'help' ];

          await runCli({ rootCommand: docker, argv: command });

          const { stderr, stdout } = stop();

          assert.that(stderr).is.equalTo('');
          assert.that(stdout).is.equalTo(`${getShowUsage({ rootCommand: extendedBuilderCli })({ commandPath: [ 'docker' ]})}\n`);
        });

        test('displays the help of the given command.', async (): Promise<void> => {
          const command: string[] = [ 'help', 'image' ];

          await runCli({ rootCommand: docker, argv: command });

          const { stderr, stdout } = stop();

          assert.that(stderr).is.equalTo('');
          assert.that(stdout).is.equalTo(`${getShowUsage({ rootCommand: extendedBuilderCli })({ commandPath: [ 'docker', 'image' ]})}\n`);
        });

        test('displays the help of the given multi-level command.', async (): Promise<void> => {
          const command: string[] = [ 'help', 'image', 'ls' ];

          await runCli({ rootCommand: docker, argv: command });

          const { stderr, stdout } = stop();

          assert.that(stderr).is.equalTo('');
          assert.that(stdout).is.equalTo(`${getShowUsage({ rootCommand: extendedBuilderCli })({ commandPath: [ 'docker', 'image', 'ls' ]})}\n`);
        });

        test('displays the help for the help command if the help flag is set.', async (): Promise<void> => {
          const command: string[] = [ 'help', '--help' ];

          await runCli({ rootCommand: docker, argv: command });

          const { stderr, stdout } = stop();

          assert.that(stderr).is.equalTo('');
          assert.that(stdout).is.equalTo(`${getShowUsage({ rootCommand: extendedBuilderCli })({ commandPath: [ 'docker', 'help' ]})}\n`);
        });
      });
    });
  });
});
