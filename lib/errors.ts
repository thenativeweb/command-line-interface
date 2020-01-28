import { defekt } from 'defekt';

const errors = defekt({
  CommandNotFound: {},
  InvalidOperation: {},
  NoSuggestionAvailable: {},
  OptionInvalid: {},
  OptionMissing: {}
});

export { errors };
