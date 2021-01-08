import { assert } from 'assertthat';
import { OptionDefinition } from '../../../lib/elements/OptionDefinition';
import { optionToString } from '../../../lib/usage/optionToString';

suite('optionToString', (): void => {
  test('not default, without parameter name, without multiplier, boolean.', async (): Promise<void> => {
    const option: OptionDefinition = {
      name: 'test',
      defaultOption: false,
      parameterName: undefined,
      multiple: false,
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
      multiple: false,
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
      multiple: false,
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
      multiple: true,
      type: 'boolean'
    };

    const optionString = optionToString({ option });

    assert.that(optionString).is.equalTo('--test [--test ...]');
  });

  test('not default, without parameter name, with multiplier, string.', async (): Promise<void> => {
    const option: OptionDefinition = {
      name: 'test',
      defaultOption: false,
      parameterName: undefined,
      multiple: true,
      type: 'string'
    };

    const optionString = optionToString({ option });

    assert.that(optionString).is.equalTo('--test {underline string} [--test ...]');
  });

  test('not default, without parameter name, with multiplier, number.', async (): Promise<void> => {
    const option: OptionDefinition = {
      name: 'test',
      defaultOption: false,
      parameterName: undefined,
      multiple: true,
      type: 'number'
    };

    const optionString = optionToString({ option });

    assert.that(optionString).is.equalTo('--test {underline number} [--test ...]');
  });

  test('not default, with parameter name, without multiplier, boolean.', async (): Promise<void> => {
    const option: OptionDefinition = {
      name: 'test',
      defaultOption: false,
      parameterName: 'param',
      multiple: false,
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
      multiple: false,
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
      multiple: false,
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
      multiple: true,
      type: 'boolean'
    };

    const optionString = optionToString({ option });

    assert.that(optionString).is.equalTo('--test [--test ...]');
  });

  test('not default, with parameter name, with multiplier, string.', async (): Promise<void> => {
    const option: OptionDefinition = {
      name: 'test',
      defaultOption: false,
      parameterName: 'param',
      multiple: true,
      type: 'string'
    };

    const optionString = optionToString({ option });

    assert.that(optionString).is.equalTo('--test {underline param} [--test ...]');
  });

  test('not default, with parameter name, with multiplier, number.', async (): Promise<void> => {
    const option: OptionDefinition = {
      name: 'test',
      defaultOption: false,
      parameterName: 'param',
      multiple: true,
      type: 'number'
    };

    const optionString = optionToString({ option });

    assert.that(optionString).is.equalTo('--test {underline param} [--test ...]');
  });

  test('default, without parameter name, without multiplier, string.', async (): Promise<void> => {
    const option: OptionDefinition = {
      name: 'test',
      defaultOption: true,
      parameterName: undefined,
      multiple: false,
      type: 'string'
    };

    const optionString = optionToString({ option });

    assert.that(optionString).is.equalTo('[--test] {underline string}');
  });

  test('default, without parameter name, without multiplier, number.', async (): Promise<void> => {
    const option: OptionDefinition = {
      name: 'test',
      defaultOption: true,
      parameterName: undefined,
      multiple: false,
      type: 'number'
    };

    const optionString = optionToString({ option });

    assert.that(optionString).is.equalTo('[--test] {underline number}');
  });

  test('default, without parameter name, with multiplier, string.', async (): Promise<void> => {
    const option: OptionDefinition = {
      name: 'test',
      defaultOption: true,
      parameterName: undefined,
      multiple: true,
      type: 'string'
    };

    const optionString = optionToString({ option });

    assert.that(optionString).is.equalTo('[--test] {underline string} [[--test] ...]');
  });

  test('default, without parameter name, with multiplier, number.', async (): Promise<void> => {
    const option: OptionDefinition = {
      name: 'test',
      defaultOption: true,
      parameterName: undefined,
      multiple: true,
      type: 'number'
    };

    const optionString = optionToString({ option });

    assert.that(optionString).is.equalTo('[--test] {underline number} [[--test] ...]');
  });

  test('default, with parameter name, without multiplier, string.', async (): Promise<void> => {
    const option: OptionDefinition = {
      name: 'test',
      defaultOption: true,
      parameterName: 'param',
      multiple: false,
      type: 'string'
    };

    const optionString = optionToString({ option });

    assert.that(optionString).is.equalTo('[--test] {underline param}');
  });

  test('default, with parameter name, without multiplier, number.', async (): Promise<void> => {
    const option: OptionDefinition = {
      name: 'test',
      defaultOption: true,
      parameterName: 'param',
      multiple: false,
      type: 'number'
    };

    const optionString = optionToString({ option });

    assert.that(optionString).is.equalTo('[--test] {underline param}');
  });

  test('default, with parameter name, with multiplier, string.', async (): Promise<void> => {
    const option: OptionDefinition = {
      name: 'test',
      defaultOption: true,
      parameterName: 'param',
      multiple: true,
      type: 'string'
    };

    const optionString = optionToString({ option });

    assert.that(optionString).is.equalTo('[--test] {underline param} [[--test] ...]');
  });

  test('default, with parameter name, with multiplier, number.', async (): Promise<void> => {
    const option: OptionDefinition = {
      name: 'test',
      defaultOption: true,
      parameterName: 'param',
      multiple: true,
      type: 'number'
    };

    const optionString = optionToString({ option });

    assert.that(optionString).is.equalTo('[--test] {underline param} [[--test] ...]');
  });
});
