import { addHelpCommandToCli } from '../../lib/addHelpCommandToCli';
import { assert } from 'assertthat';
import { docker } from '../shared/examples/docker/commands/docker';
import { getGetUsage } from '../../lib/usage/getGetUsage';
import { record } from 'record-stdstreams';
import { runCli } from '../../lib/runCli';
import { various } from '../shared/examples/various/commands/various';
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
    const extendedDockerCli = addHelpCommandToCli({ rootCommand: docker });

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
          debug: false,
          'log-level': 'info',
          help: false
        });
      });

      test('runs the top level command and parses the debug flag.', async (): Promise<void> => {
        const command: string[] = [ '-D' ];

        await runCli({ rootCommand: docker, argv: command });

        const { stderr, stdout } = stop();

        assert.that(stderr).is.equalTo('');

        const lines = stdout.split('\n');

        assert.that(lines[0]).is.equalTo('docker command');
        assert.that(JSON.parse(lines[1])).is.equalTo({
          config: '~/.docker',
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
        assert.that(stdout).is.equalTo(`${getGetUsage({ rootCommand: extendedDockerCli })({ commandPath: [ 'docker' ]})}\n`);
      });

      test('displays the top level help with --help flag, even if a subcommand is given.', async (): Promise<void> => {
        const command: string[] = [ '--help', 'image', '--help' ];

        await runCli({ rootCommand: docker, argv: command });

        const { stderr, stdout } = stop();

        assert.that(stderr).is.equalTo('');
        assert.that(stdout).is.equalTo(`${getGetUsage({ rootCommand: extendedDockerCli })({ commandPath: [ 'docker' ]})}\n`);
      });

      test('suggests alternatives and returns status code 1 if subcommands exist and the given command is not recognized.', async (): Promise<void> => {
        const command: string[] = [ 'imgea' ];

        await runCli({ rootCommand: docker, argv: command });

        const { stderr, stdout } = stop();

        assert.that(stdout).is.equalTo('');
        assert.that(stderr).is.containing(`Unknown command 'imgea'. Did you mean 'image'?`);
        assert.that((process.exit as unknown as SinonStub).calledWith(1)).is.true();
      });

      test('runs a custom error handler if subcommands exist and the given command is not recognized.', async (): Promise<void> => {
        const command: string[] = [ 'imgea' ];

        await runCli({
          rootCommand: docker,
          argv: command,
          handlers: {
            commandUnknown ({ unknownCommandName, recommendedCommandName }): void {
              // eslint-disable-next-line no-console
              console.error(`Unbekannter Befehl '${unknownCommandName}'. Meinten Sie '${recommendedCommandName}'?`);
            }
          }
        });

        const { stderr, stdout } = stop();

        assert.that(stdout).is.equalTo('');
        assert.that(stderr).is.containing(`Unbekannter Befehl 'imgea'. Meinten Sie 'image'?`);
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
            debug: true,
            'log-level': 'info',
            help: false
          });
        });

        suite('docker.image.ls command', (): void => {
          test('runs the third level ls command and parses all options.', async (): Promise<void> => {
            const command: string[] = [ '-D', 'image', 'ls', '-a', '--filter', 'some-filter', 'image-name' ];

            await runCli({ rootCommand: docker, argv: command });

            const { stderr, stdout } = stop();

            assert.that(stderr).is.equalTo('');

            const lines = stdout.split('\n');

            assert.that(lines[0]).is.equalTo('docker.image.ls command');
            assert.that(JSON.parse(lines[1])).is.equalTo({
              config: '~/.docker',
              debug: true,
              'log-level': 'info',
              help: false,
              all: true,
              digests: false,
              filter: 'some-filter',
              'no-trunc': false,
              quiet: false,
              image: [ 'image-name' ]
            });
          });

          test('displays an error and returns status code 1 if an option is not recognized.', async (): Promise<void> => {
            const command: string[] = [ 'image', 'ls', 'image-name', '--foo' ];

            await runCli({ rootCommand: docker, argv: command });

            const { stderr, stdout } = stop();

            assert.that(stdout).is.equalTo('');
            assert.that(stderr).is.containing(`Unknown option '--foo'.`);
            assert.that((process.exit as unknown as SinonStub).calledWith(1)).is.true();
          });

          test('runs a custom error handler if an option is not recognized.', async (): Promise<void> => {
            const command: string[] = [ 'image', 'ls', 'image-name', '--foo' ];

            await runCli({
              rootCommand: docker,
              argv: command,
              handlers: {
                optionUnknown ({ optionName }): void {
                  // eslint-disable-next-line no-console
                  console.error(`Unbekannte Option '${optionName}'.`);
                }
              }
            });

            const { stderr, stdout } = stop();

            assert.that(stdout).is.equalTo('');
            assert.that(stderr).is.containing(`Unbekannte Option '--foo'.`);
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
              debug: true,
              'log-level': 'info',
              help: false,
              filter: 'some-filter',
              quiet: false
            });
          });

          test('displays an error and returns status code 1 if an option is not recognized.', async (): Promise<void> => {
            const command: string[] = [ 'volume', 'ls', '--foo' ];

            await runCli({ rootCommand: docker, argv: command });

            const { stderr, stdout } = stop();

            assert.that(stdout).is.equalTo('');
            assert.that(stderr).is.containing(`Unknown option '--foo'.`);
            assert.that((process.exit as unknown as SinonStub).calledWith(1)).is.true();
          });

          test('runs a custom error handler if an option is not recognized.', async (): Promise<void> => {
            const command: string[] = [ 'volume', 'ls', '--foo' ];

            await runCli({
              rootCommand: docker,
              argv: command,
              handlers: {
                optionUnknown ({ optionName }): void {
                  // eslint-disable-next-line no-console
                  console.error(`Unbekannte Option '${optionName}'.`);
                }
              }
            });

            const { stderr, stdout } = stop();

            assert.that(stdout).is.equalTo('');
            assert.that(stderr).is.containing(`Unbekannte Option '--foo'.`);
            assert.that((process.exit as unknown as SinonStub).calledWith(1)).is.true();
          });
        });
      });

      suite('docker.fail command', (): void => {
        test('prints the error thrown in the handler to stderr and exits the process with status code 1.', async (): Promise<void> => {
          const command: string[] = [ 'fail' ];

          await runCli({ rootCommand: docker, argv: command });

          const { stderr, stdout } = stop();

          assert.that(stderr).is.containing('This command fails intentionally.');
          assert.that(stdout).is.equalTo('');
          assert.that((process.exit as unknown as SinonStub).calledWith(1)).is.true();
        });

        test('runs a custom error with the error thrown in the handler.', async (): Promise<void> => {
          const command: string[] = [ 'fail' ];

          await runCli({
            rootCommand: docker,
            argv: command,
            handlers: {
              commandFailed ({ ex }): void {
                // eslint-disable-next-line no-console
                console.error((ex as Error).message.toUpperCase());
              }
            }
          });

          const { stderr, stdout } = stop();

          assert.that(stderr).is.containing('THIS COMMAND FAILS INTENTIONALLY.');
          assert.that(stdout).is.equalTo('');
          assert.that((process.exit as unknown as SinonStub).calledWith(1)).is.true();
        });
      });

      suite('docker.help command', (): void => {
        test('displays the top level help if no command is given.', async (): Promise<void> => {
          const command: string[] = [ 'help' ];

          await runCli({ rootCommand: docker, argv: command });

          const { stderr, stdout } = stop();

          assert.that(stderr).is.equalTo('');
          assert.that(stdout).is.equalTo(`${getGetUsage({ rootCommand: extendedDockerCli })({ commandPath: [ 'docker' ]})}\n`);
        });

        test('displays the help of the given command.', async (): Promise<void> => {
          const command: string[] = [ 'help', 'image' ];

          await runCli({ rootCommand: docker, argv: command });

          const { stderr, stdout } = stop();

          assert.that(stderr).is.equalTo('');
          assert.that(stdout).is.equalTo(`${getGetUsage({ rootCommand: extendedDockerCli })({ commandPath: [ 'docker', 'image' ]})}\n`);
        });

        test('displays the help of the given multi-level command.', async (): Promise<void> => {
          const command: string[] = [ 'help', 'image', 'ls' ];

          await runCli({ rootCommand: docker, argv: command });

          const { stderr, stdout } = stop();

          assert.that(stderr).is.equalTo('');
          assert.that(stdout).is.equalTo(`${getGetUsage({ rootCommand: extendedDockerCli })({ commandPath: [ 'docker', 'image', 'ls' ]})}\n`);
        });

        test('displays the help for the help command if the help flag is set.', async (): Promise<void> => {
          const command: string[] = [ 'help', '--help' ];

          await runCli({ rootCommand: docker, argv: command });

          const { stderr, stdout } = stop();

          assert.that(stderr).is.equalTo('');
          assert.that(stdout).is.equalTo(`${getGetUsage({ rootCommand: extendedDockerCli })({ commandPath: [ 'docker', 'help' ]})}\n`);
        });
      });
    });
  });

  suite(`sample application 'various'`, (): void => {
    const extendedVariousCli = addHelpCommandToCli({ rootCommand: various });

    suite('various command', (): void => {
      suite('various.number command', (): void => {
        test('displays an error and returns status code 1 if the number option is not a number.', async (): Promise<void> => {
          const command: string[] = [ 'number', '--number', 'foo' ];

          await runCli({ rootCommand: extendedVariousCli, argv: command });

          const { stderr, stdout } = stop();

          assert.that(stdout).is.equalTo('');
          assert.that(stderr).is.containing(`Option 'number' must be a number.`);
          assert.that((process.exit as unknown as SinonStub).calledWith(1)).is.true();
        });

        test('runs a custom error handler if the number option is not a number.', async (): Promise<void> => {
          const command: string[] = [ 'number', '--number', 'foo' ];

          await runCli({
            rootCommand: extendedVariousCli,
            argv: command,
            handlers: {
              optionInvalid ({ optionDefinition }): void {
                // eslint-disable-next-line no-console
                console.error(`Die Option '${optionDefinition.name}' muss eine Zahl sein.`);
              }
            }
          });

          const { stderr, stdout } = stop();

          assert.that(stdout).is.equalTo('');
          assert.that(stderr).is.containing(`Die Option 'number' muss eine Zahl sein.`);
          assert.that((process.exit as unknown as SinonStub).calledWith(1)).is.true();
        });

        test('displays validator exception message.', async (): Promise<void> => {
          const command: string[] = [ 'number', '--number', '601' ];

          await runCli({ rootCommand: extendedVariousCli, argv: command });

          const { stderr, stdout } = stop();

          assert.that(stdout).is.equalTo('');
          assert.that(stderr).is.containing(`Number must not be bigger than 500.`);
          assert.that((process.exit as unknown as SinonStub).calledWith(1)).is.true();
        });
      });

      suite('various.required command', (): void => {
        test('displays an error and returns status code 1 if a required option is missing.', async (): Promise<void> => {
          const command: string[] = [ 'required' ];

          await runCli({ rootCommand: extendedVariousCli, argv: command });

          const { stderr, stdout } = stop();

          assert.that(stdout).is.equalTo('');
          assert.that(stderr).is.containing(`Option 'required' is missing.`);
          assert.that((process.exit as unknown as SinonStub).calledWith(1)).is.true();
        });

        test('runs a custom error handler if a required option is missing.', async (): Promise<void> => {
          const command: string[] = [ 'required' ];

          await runCli({
            rootCommand: extendedVariousCli,
            argv: command,
            handlers: {
              optionMissing ({ optionDefinition }): void {
                // eslint-disable-next-line no-console
                console.error(`Die Option '${optionDefinition.name}' fehlt.`);
              }
            }
          });

          const { stderr, stdout } = stop();

          assert.that(stdout).is.equalTo('');
          assert.that(stderr).is.containing(`Die Option 'required' fehlt.`);
          assert.that((process.exit as unknown as SinonStub).calledWith(1)).is.true();
        });
      });
    });
  });
});
