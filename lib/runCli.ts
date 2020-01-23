import { addHelpCommandToCli } from './addHelpCommandToCli';
import { Command } from './elements/Command';
import { getRecommendCommand } from './recommend/getRecommendCommand';
import { getShowUsage } from './usage/getShowUsage';
import { runCliRecursive } from './runCliRecursive';

const runCli = async function ({ rootCommand, argv }: {
  rootCommand: Command<any>;
  argv: string[];
}): Promise<void> {
  const extendedRootCommand = addHelpCommandToCli({ rootCommand });

  const recommendCommand = getRecommendCommand({ rootCommand: extendedRootCommand });
  const showUsage = getShowUsage({ rootCommand: extendedRootCommand });

  await runCliRecursive({
    command: extendedRootCommand,
    argv,
    showUsage,
    recommendCommand,
    level: 0,
    ancestorOptions: {},
    ancestorNames: []
  });
};

export { runCli };
