import { OptionDefinition } from '..';

const optionToString = ({ option }: {
  option: OptionDefinition;
}): string => {
  const optionSegment = option.defaultOption ? `[--${option.name}]` : `--${option.name}`;

  const parameterName = option.parameterName ?? option.type;
  const parameterDescriptionSegment = option.type === 'boolean' ? '' : `{underline ${parameterName}}`;

  const multiplierSegment = !option.multiple ? '' : `[${optionSegment} ...]`;

  return `${optionSegment} ${parameterDescriptionSegment} ${multiplierSegment}`.replace(/ +/gu, ' ').trim();
};

export { optionToString };
