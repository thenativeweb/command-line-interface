import { BuilderOptions } from './BuilderOptions';

export interface BuildOptions extends BuilderOptions {
  minify: boolean;
  uglify: boolean;
}
