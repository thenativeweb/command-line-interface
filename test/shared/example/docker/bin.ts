import { docker } from './docker';
import { runCli } from '../../../../lib';

/* eslint-disable @typescript-eslint/no-floating-promises */
(async (): Promise<void> => {
  try {
    await runCli({ rootCommand: docker, argv: process.argv });
  } catch (ex) {
    /* eslint-disable no-console */
    console.log({ ex });
    /* eslint-enable no-console */
  }
})();
/* eslint-enable @typescript-eslint/no-floating-promises */
