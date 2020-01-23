import { BuildOptions } from './BuildOptions';
import { Command } from '../../lib';

export const build: Command<BuildOptions> = {
  name: 'build',
  description: 'Builds your application.',
  optionDefinitions: [
    {
      name: 'minify',
      type: 'boolean',
      description: 'Minify the build result.',
      alias: 'm',
      defaultValue: false
    },
    {
      name: 'uglify',
      type: 'boolean',
      description: 'Uglify the build result.',
      alias: 'u',
      defaultValue: false
    }
  ],
  handle ({ options }): void {
    console.log('builder.build command');
    console.log(JSON.stringify(options));
  }
};
