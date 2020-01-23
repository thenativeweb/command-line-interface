import { defekt } from 'defekt';

const errors = defekt({
  CommandNotFound: {},
  InvalidOperation: {}
});

export {
  errors
};
