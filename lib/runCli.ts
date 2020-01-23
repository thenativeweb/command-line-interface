import { addHelpCommandToCli } from './addHelpCommandToCli';
import { Command } from './Command';
import { getShowUsage } from './usage/getShowUsage';
import { runCliRecursive } from './runCliRecursive';

export const runCli = async function ({ rootCommand, argv }: {
  rootCommand: Command<any>;
  argv: string[];
}): Promise<void> {
  const extendedRootCommand = addHelpCommandToCli({ rootCommand });
  const showUsage = getShowUsage({ rootCommand: extendedRootCommand });

  await runCliRecursive({
    command: extendedRootCommand,
    argv,
    showUsage,
    level: 0,
    additionalOptions: {},
    ancestors: []
  });
};
