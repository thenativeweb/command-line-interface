import { defekt } from 'defekt';

class CommandNotFound extends defekt({ code: 'CommandNotFound' }) {}
class InvalidOperation extends defekt({ code: 'InvalidOperation' }) {}
class NoSuggestionAvailable extends defekt({ code: 'NoSuggestionAvailable' }) {}
class OptionInvalid extends defekt({ code: 'OptionInvalid' }) {}
class OptionMissing extends defekt({ code: 'OptionMissing' }) {}

export {
  CommandNotFound,
  InvalidOperation,
  NoSuggestionAvailable,
  OptionInvalid,
  OptionMissing
};
