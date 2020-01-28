import { defekt } from 'defekt';

const errors = defekt({
  CommandNotFound: {},
  OperationInvalid: {},
  NoSuggestionAvailable: {},
  OptionInvalid: {}
});

export { errors };
