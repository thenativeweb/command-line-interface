import { assert } from 'assertthat';
import { OptionDefinition } from '../../../lib/elements/OptionDefinition';
import { optionToString } from '../../../lib/usage/optionToString';

suite('optionToString', (): void => {
  test('not default, without parameter name, without multiplier, boolean.', async (): Promise<void> => {
    const option: OptionDefinition = {
      name: 'test',
      defaultOption: false,
      parameterName: undefined,
      multiple: 'off',
      type: 'boolean'
    };

    const optionString = optionToString({ option });

    assert.that(optionString).is.equalTo('--test');
  });

  test('not default, without parameter name, without multiplier, string.', async (): Promise<void> => {
    const option: OptionDefinition = {
      name: 'test',
      defaultOption: false,
      parameterName: undefined,
      multiple: 'off',
      type: 'string'
    };

    const optionString = optionToString({ option });

    assert.that(optionString).is.equalTo('--test {underline string}');
  });

  test('not default, without parameter name, without multiplier, number.', async (): Promise<void> => {
    const option: OptionDefinition = {
      name: 'test',
      defaultOption: false,
      parameterName: undefined,
      multiple: 'off',
      type: 'number'
    };

    const optionString = optionToString({ option });

    assert.that(optionString).is.equalTo('--test {underline number}');
  });

  test('not default, without parameter name, with multiplier, boolean.', async (): Promise<void> => {
    const option: OptionDefinition = {
      name: 'test',
      defaultOption: false,
      parameterName: undefined,
      multiple: 'on',
      type: 'boolean'
    };

    const optionString = optionToString({ option });

    assert.that(optionString).is.equalTo('--test');
  });

  test('not default, without parameter name, with multiplier, string.', async (): Promise<void> => {
    const option: OptionDefinition = {
      name: 'test',
      defaultOption: false,
      parameterName: undefined,
      multiple: 'on',
      type: 'string'
    };

    const optionString = optionToString({ option });

    assert.that(optionString).is.equalTo('--test {underline string[]}');
  });

  test('not default, without parameter name, with multiplier, number.', async (): Promise<void> => {
    const option: OptionDefinition = {
      name: 'test',
      defaultOption: false,
      parameterName: undefined,
      multiple: 'on',
      type: 'number'
    };

    const optionString = optionToString({ option });

    assert.that(optionString).is.equalTo('--test {underline number[]}');
  });

  test('not default, with parameter name, without multiplier, boolean.', async (): Promise<void> => {
    const option: OptionDefinition = {
      name: 'test',
      defaultOption: false,
      parameterName: 'param',
      multiple: 'off',
      type: 'boolean'
    };

    const optionString = optionToString({ option });

    assert.that(optionString).is.equalTo('--test');
  });

  test('not default, with parameter name, without multiplier, string.', async (): Promise<void> => {
    const option: OptionDefinition = {
      name: 'test',
      defaultOption: false,
      parameterName: 'param',
      multiple: 'off',
      type: 'string'
    };

    const optionString = optionToString({ option });

    assert.that(optionString).is.equalTo('--test {underline param}');
  });

  test('not default, with parameter name, without multiplier, number.', async (): Promise<void> => {
    const option: OptionDefinition = {
      name: 'test',
      defaultOption: false,
      parameterName: 'param',
      multiple: 'off',
      type: 'number'
    };

    const optionString = optionToString({ option });

    assert.that(optionString).is.equalTo('--test {underline param}');
  });

  test('not default, with parameter name, with multiplier, boolean.', async (): Promise<void> => {
    const option: OptionDefinition = {
      name: 'test',
      defaultOption: false,
      parameterName: 'param',
      multiple: 'on',
      type: 'boolean'
    };

    const optionString = optionToString({ option });

    assert.that(optionString).is.equalTo('--test');
  });

  test('not default, with parameter name, with multiplier, string.', async (): Promise<void> => {
    const option: OptionDefinition = {
      name: 'test',
      defaultOption: false,
      parameterName: 'param',
      multiple: 'on',
      type: 'string'
    };

    const optionString = optionToString({ option });

    assert.that(optionString).is.equalTo('--test {underline param[]}');
  });

  test('not default, with parameter name, with multiplier, number.', async (): Promise<void> => {
    const option: OptionDefinition = {
      name: 'test',
      defaultOption: false,
      parameterName: 'param',
      multiple: 'on',
      type: 'number'
    };

    const optionString = optionToString({ option });

    assert.that(optionString).is.equalTo('--test {underline param[]}');
  });

  test('default, without parameter name, without multiplier, boolean.', async (): Promise<void> => {
    const option: OptionDefinition = {
      name: 'test',
      defaultOption: true,
      parameterName: undefined,
      multiple: 'off',
      type: 'boolean'
    };

    const optionString = optionToString({ option });

    assert.that(optionString).is.equalTo('--test');
  });

  test('default, without parameter name, without multiplier, string.', async (): Promise<void> => {
    const option: OptionDefinition = {
      name: 'test',
      defaultOption: true,
      parameterName: undefined,
      multiple: 'off',
      type: 'string'
    };

    const optionString = optionToString({ option });

    assert.that(optionString).is.equalTo('--test {underline string}');
  });

  test('default, without parameter name, without multiplier, number.', async (): Promise<void> => {
    const option: OptionDefinition = {
      name: 'test',
      defaultOption: true,
      parameterName: undefined,
      multiple: 'off',
      type: 'number'
    };

    const optionString = optionToString({ option });

    assert.that(optionString).is.equalTo('--test {underline number}');
  });

  test('default, without parameter name, with multiplier, boolean.', async (): Promise<void> => {
    const option: OptionDefinition = {
      name: 'test',
      defaultOption: true,
      parameterName: undefined,
      multiple: 'on',
      type: 'boolean'
    };

    const optionString = optionToString({ option });

    assert.that(optionString).is.equalTo('--test');
  });

  test('default, without parameter name, with multiplier, string.', async (): Promise<void> => {
    const option: OptionDefinition = {
      name: 'test',
      defaultOption: true,
      parameterName: undefined,
      multiple: 'on',
      type: 'string'
    };

    const optionString = optionToString({ option });

    assert.that(optionString).is.equalTo('--test {underline string[]}');
  });

  test('default, without parameter name, with multiplier, number.', async (): Promise<void> => {
    const option: OptionDefinition = {
      name: 'test',
      defaultOption: true,
      parameterName: undefined,
      multiple: 'on',
      type: 'number'
    };

    const optionString = optionToString({ option });

    assert.that(optionString).is.equalTo('--test {underline number[]}');
  });

  test('default, with parameter name, without multiplier, boolean.', async (): Promise<void> => {
    const option: OptionDefinition = {
      name: 'test',
      defaultOption: true,
      parameterName: 'param',
      multiple: 'off',
      type: 'boolean'
    };

    const optionString = optionToString({ option });

    assert.that(optionString).is.equalTo('--test');
  });

  test('default, with parameter name, without multiplier, string.', async (): Promise<void> => {
    const option: OptionDefinition = {
      name: 'test',
      defaultOption: true,
      parameterName: 'param',
      multiple: 'off',
      type: 'string'
    };

    const optionString = optionToString({ option });

    assert.that(optionString).is.equalTo('--test {underline param}');
  });

  test('default, with parameter name, without multiplier, number.', async (): Promise<void> => {
    const option: OptionDefinition = {
      name: 'test',
      defaultOption: true,
      parameterName: 'param',
      multiple: 'off',
      type: 'number'
    };

    const optionString = optionToString({ option });

    assert.that(optionString).is.equalTo('--test {underline param}');
  });

  test('default, with parameter name, with multiplier, boolean.', async (): Promise<void> => {
    const option: OptionDefinition = {
      name: 'test',
      defaultOption: true,
      parameterName: 'param',
      multiple: 'on',
      type: 'boolean'
    };

    const optionString = optionToString({ option });

    assert.that(optionString).is.equalTo('--test');
  });

  test('default, with parameter name, with multiplier, string.', async (): Promise<void> => {
    const option: OptionDefinition = {
      name: 'test',
      defaultOption: true,
      parameterName: 'param',
      multiple: 'on',
      type: 'string'
    };

    const optionString = optionToString({ option });

    assert.that(optionString).is.equalTo('--test {underline param[]}');
  });

  test('default, with parameter name, with multiplier, number.', async (): Promise<void> => {
    const option: OptionDefinition = {
      name: 'test',
      defaultOption: true,
      parameterName: 'param',
      multiple: 'on',
      type: 'number'
    };

    const optionString = optionToString({ option });

    assert.that(optionString).is.equalTo('--test {underline param[]}');
  });
});
