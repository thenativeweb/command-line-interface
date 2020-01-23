import { Command } from '../elements/Command';
import commandLineUsage from 'command-line-usage';
import { getCommandLineUsageConfiguration } from './getCommandLineUsageConfiguration';
import { ShowUsageFn } from './ShowUsageFn';

const getShowUsage = function ({ rootCommand }: {
  rootCommand: Command<any>;
}): ShowUsageFn {
  return ({ commandPath }): string => {
    const commandLineUsageConfiguration = getCommandLineUsageConfiguration({ rootCommand, commandPath });

    return commandLineUsage(commandLineUsageConfiguration);
  };
};

export {
  getShowUsage
};
