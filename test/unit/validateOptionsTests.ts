import { assert } from 'assertthat';
import { OptionDefinition } from '../../lib/elements/OptionDefinition';
import { validateOptions } from 'lib/validateOptions';

suite('validateOptions', (): void => {
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
      ).is.throwing(`Option 'option' must be a number.`);
    });
  });
});
