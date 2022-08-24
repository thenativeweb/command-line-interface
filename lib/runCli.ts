import { addHelpCommandToCli } from './addHelpCommandToCli';
import { Command } from './elements/Command';
import { getGetUsage } from './usage/getGetUsage';
import { getRecommendCommand } from './recommend/getRecommendCommand';
import { Handlers } from './Handlers';
import { runCliRecursive } from './runCliRecursive';
import { validateOnlyLeafCommandsHaveDefaultOptions } from './validateOnlyLeafCommandsHaveDefaultOptions';

const runCli = async function ({ rootCommand, argv, handlers = {}}: {
  rootCommand: Command<any>;
  argv: string[];
  handlers?: Partial<Handlers>;
}): Promise<void> {
  const handlersWithDefaults: Handlers = {
    commandFailed ({ ex }): void {
      // eslint-disable-next-line no-console
      console.error(ex);
    },
    commandUnknown ({ unknownCommandName, recommendedCommandName }): void {
      // eslint-disable-next-line no-console
      console.error(`Unknown command '${unknownCommandName}'. Did you mean '${recommendedCommandName}'?`);
    },
    optionInvalid ({ reason }): void {
      // eslint-disable-next-line no-console
      console.error(reason);
    },
    optionMissing ({ optionDefinition }): void {
      // eslint-disable-next-line no-console
      console.error(`Option '${optionDefinition.name}' is missing.`);
    },
    optionUnknown ({ optionName }): void {
      // eslint-disable-next-line no-console
      console.error(`Unknown option '${optionName}'.`);
    },
    ...handlers
  };

  validateOnlyLeafCommandsHaveDefaultOptions({
    command: rootCommand
  });

  const extendedRootCommand = addHelpCommandToCli({ rootCommand });

  const recommendCommand = getRecommendCommand({ rootCommand: extendedRootCommand });
  const getUsage = getGetUsage({ rootCommand: extendedRootCommand });

  await runCliRecursive({
    command: extendedRootCommand,
    argv,
    handlers: handlersWithDefaults,
    getUsage,
    recommendCommand,
    level: 0,
    ancestorOptions: {},
    ancestorNames: []
  });
};

export { runCli };
