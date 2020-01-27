import { Command } from '../../../../../lib';
import { DockerOptions } from './DockerOptions';
import { fail } from './fail';
import { image } from './image';
import { volume } from './volume';

const docker: Command<DockerOptions> = {
  name: 'docker',
  description: 'A self-sufficient runtime for containers.',
  optionDefinitions: [
    {
      name: 'config',
      description: 'Location of client config files.',
      type: 'string',
      defaultValue: '~/.docker'
    },
    {
      name: 'context',
      description: 'Name of the context to use to connect to the daemon (overrides DOCKER_HOST env var and default context set with "docker context use").',
      type: 'string',
      alias: 'c',
      defaultValue: ''
    },
    {
      name: 'debug',
      description: 'Enable debug mode.',
      type: 'boolean',
      alias: 'D',
      defaultValue: false
    },
    {
      name: 'log-level',
      description: 'Set the log level ("debug"|"info"|"warn"|"error"|"fatal").',
      type: 'string',
      alias: 'l',
      defaultValue: 'info'
    }
  ],
  subcommands: {
    image,
    volume,
    fail
  },
  handle ({ options }): void {
    /* eslint-disable no-console */
    console.log('docker command');
    console.log(JSON.stringify(options));
    /* eslint-enable no-console */
  }
};

export { docker };
