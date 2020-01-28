import { assert } from 'assertthat';
import { CustomError } from 'defekt';
import { OptionDefinition } from '../../lib/elements/OptionDefinition';
import { validateOptions } from 'lib/validateOptions';

suite('validateOptions', (): void => {
  suite('required', (): void => {
    test('fails if a required option is undefined.', async (): Promise<void> => {
      const options = {
        option: undefined
      };
      const optionDefinitions: OptionDefinition[] = [
        {
          name: 'option',
          type: 'string',
          required: true
        }
      ];

      assert.that(
        (): void => validateOptions({ options, optionDefinitions })
      ).is.throwing(
        (ex): boolean => ex.message === `Option 'option' is missing.` && (ex as CustomError).code === 'EOPTIONMISSING'
      );
    });
  });

  suite('string', (): void => {
    test('accepts a valid string option.', async (): Promise<void> => {
      const options = {
        option: 'foo'
      };
      const optionDefinitions: OptionDefinition[] = [
        {
          name: 'option',
          type: 'string'
        }
      ];

      assert.that(
        (): void => validateOptions({ options, optionDefinitions })
      ).is.not.throwing();
    });
  });

  suite('boolean', (): void => {
    test('accepts a valid boolean option.', async (): Promise<void> => {
      const options = {
        option: false
      };
      const optionDefinitions: OptionDefinition[] = [
        {
          name: 'option',
          type: 'boolean'
        }
      ];

      assert.that(
        (): void => validateOptions({ options, optionDefinitions })
      ).is.not.throwing();
    });
  });

  suite('number', (): void => {
    test('accepts a valid number option.', async (): Promise<void> => {
      const options = {
        option: 5
      };
      const optionDefinitions: OptionDefinition[] = [
        {
          name: 'option',
          type: 'number'
        }
      ];

      assert.that(
        (): void => validateOptions({ options, optionDefinitions })
      ).is.not.throwing();
    });

    test('fails if a number option is NaN.', async (): Promise<void> => {
      const options = {
        option: NaN
      };
      const optionDefinitions: OptionDefinition[] = [
        {
          name: 'option',
          type: 'number'
        }
      ];

      assert.that(
        (): void => validateOptions({ options, optionDefinitions })
      ).is.throwing(
        (ex): boolean => ex.message === `Option 'option' must be a number.` && (ex as CustomError).code === 'EOPTIONINVALID'
      );
    });
  });
});
