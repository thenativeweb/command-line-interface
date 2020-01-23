import { Command } from '../../../../lib';
import { ImageOptions } from './ImageOptions';
import { ls } from './image/ls';
import { rm } from './image/rm';

export const image: Command<ImageOptions> = {
  name: 'image',
  description: 'Manage images',
  optionDefinitions: [],
  subcommands: {
    ls,
    rm
  },
  handle ({ options }): void {
    console.log('docker.image command');
    console.log(JSON.stringify(options));
  }
};
