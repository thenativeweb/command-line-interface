import { runCli } from '../../../../lib';
import { various } from './commands/various';

// eslint-disable-next-line @typescript-eslint/no-floating-promises, unicorn/prefer-top-level-await
(async (): Promise<void> => {
  try {
    await runCli({ rootCommand: various, argv: process.argv });
  } catch (ex: unknown) {
    // eslint-disable-next-line no-console
    console.log({ ex });
  }
})();
