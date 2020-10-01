import { docker } from './commands/docker';
import { runCli } from '../../../../lib';

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async (): Promise<void> => {
  try {
    await runCli({ rootCommand: docker, argv: process.argv });
  } catch (ex: unknown) {
    // eslint-disable-next-line no-console
    console.log({ ex });
  }
})();
