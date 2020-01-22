export interface OptionDefinition {
  name: string;
  type: 'boolean' | 'number' | 'string';
  description?: string;
  alias?: string;
  multiple?: 'off' | 'on' | 'lazy';
  defaultOption?: boolean;
  defaultValue?: any;
}
