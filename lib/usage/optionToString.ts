import { OptionDefinition } from '../elements/OptionDefinition';

const optionToString = ({ option }: {
  option: OptionDefinition;
}): string => {
  const parameterName = option.parameterName ?? option.type;
  const multiplier = option.multiple === undefined || option.multiple === 'off' ? '' : '[]';
  const parameterDescription = option.type === 'boolean' ? '' : `{underline ${parameterName}${multiplier}}`;

  if (option.defaultOption) {
    return `[--${option.name}] ${parameterDescription}`;
  }

  return `--${option.name}${parameterDescription ? ' ' : ''}${parameterDescription}`;
};

export { optionToString };
