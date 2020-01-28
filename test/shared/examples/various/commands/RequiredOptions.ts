import { VariousOptions } from './VariousOptions';

export interface RequiredOptions extends VariousOptions {
  optional?: string;
  required: string;
}
