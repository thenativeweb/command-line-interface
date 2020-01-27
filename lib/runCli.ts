import { addHelpCommandToCli } from './addHelpCommandToCli';
import { Command } from './elements/Command';
import { getGetUsage } from './usage/getGetUsage';
import { getRecommendCommand } from './recommend/getRecommendCommand';
import { runCliRecursive } from './runCliRecursive';

const runCli = async function ({ rootCommand, argv }: {
  rootCommand: Command<any>;
  argv: string[];
}): Promise<void> {
  const extendedRootCommand = addHelpCommandToCli({ rootCommand });

  const recommendCommand = getRecommendCommand({ rootCommand: extendedRootCommand });
  const getUsage = getGetUsage({ rootCommand: extendedRootCommand });

  await runCliRecursive({
    command: extendedRootCommand,
    argv,
    getUsage,
    recommendCommand,
    level: 0,
    ancestorOptions: {},
    ancestorNames: []
  });
};

export { runCli };
