import { Command } from '../../../../../../lib';
import { InspectOptions } from './InspectOptions';

const inspect: Command<InspectOptions> = {
  name: 'inspect',
  description: 'Display detailed information on one or more volumes.',
  optionDefinitions: [
    {
      name: 'format',
      description: 'Format the output using the given Go template.',
      type: 'string',
      alias: 'f',
      defaultValue: ''
    },
    {
      name: 'volume',
      type: 'string',
      multiple: 'on',
      defaultOption: true,
      defaultValue: [],
      parameterName: 'VOLUME'
    }
  ],
  handle ({ options }): void {
    /* eslint-disable no-console */
    console.log('docker.volume.inspect command');
    console.log(JSON.stringify(options));
    /* eslint-enable no-console */
  }
};

export { inspect };
