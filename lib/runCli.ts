import { addHelpCommandToCli } from './addHelpCommandToCli';
import { Command } from './Command';
import { getShowUsage } from './usage/getShowUsage';
import { runCliRecursive } from './runCliRecursive';

export const runCli = async function (
  rootCommand: Command<any>,
  argv: string[]
): Promise<void> {
  const extendedRootCommand = addHelpCommandToCli(rootCommand);
  const showUsage = getShowUsage(extendedRootCommand);

  await runCliRecursive(
    extendedRootCommand,
    argv,
    showUsage,
    0,
    {},
    []
  );
};
