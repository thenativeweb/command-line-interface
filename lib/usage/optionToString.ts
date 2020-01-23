import { OptionDefinition } from '../OptionDefinition';

const optionToString = ({ option }: {
  option: OptionDefinition;
}): string => {
  let optionString = `--${option.name}`;

  if (option.type !== 'boolean') {
    if (option.multiple === 'off') {
      optionString += ` {underline ${option.type}}`;
    } else {
      optionString += ` {underline ${option.type}[]}`;
    }
  }

  return optionString;
};

export {
  optionToString
};
