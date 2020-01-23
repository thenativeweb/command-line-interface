import { docker } from './docker';
import { runCli } from '../../../../lib';

/* eslint-disable no-console, @typescript-eslint/no-floating-promises */
(async (): Promise<void> => {
  try {
    await runCli({ rootCommand: docker, argv: process.argv });
  } catch (ex) {
    console.log({ ex });
  }
})();
/* eslint-enable no-console, @typescript-eslint/no-floating-promises */
