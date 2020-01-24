import { Command } from '../elements/Command';
import commandLineUsage from 'command-line-usage';
import { getCommandLineUsageConfiguration } from './getCommandLineUsageConfiguration';
import { GetUsageFn } from '../elements/GetUsageFn';

const getGetUsage = function ({ rootCommand }: {
  rootCommand: Command<any>;
}): GetUsageFn {
  return ({ commandPath }): string => {
    const commandLineUsageConfiguration = getCommandLineUsageConfiguration({ rootCommand, commandPath });

    return commandLineUsage(commandLineUsageConfiguration);
  };
};

export { getGetUsage };
