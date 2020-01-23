import { OptionDefinition } from '../elements/OptionDefinition';

const optionToString = ({ option }: {
  option: OptionDefinition;
}): string => {
  const prefix = option.defaultOption ? '' : '--';

  const parameterName = option.parameterName ?? option.type;
  const multiplier = option.multiple === undefined || option.multiple === 'off' ? '' : '[]';
  const parameterDescription = option.type === 'boolean' ? '' : ` {underline ${parameterName}${multiplier}}`;

  return `${prefix}${option.name}${parameterDescription}`;
};

export { optionToString };
