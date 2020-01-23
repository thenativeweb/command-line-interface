import { defekt } from 'defekt';

const errors = defekt({
  CommandNotFound: {},
  InvalidOperation: {},
  NoSuggestionAvailable: {}
});

export { errors };
