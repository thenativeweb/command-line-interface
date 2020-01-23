import { docker } from './docker';
import { runCli } from '../../../../lib';

(async (): Promise<void> => {
  try {
    await runCli({ rootCommand: docker, argv: process.argv });
  } catch (ex) {
    console.log({ ex });
  }
})().catch(console.error);
