import { builder } from '../builder';
import { runCli } from '../../../../lib';

(async (): Promise<void> => {
  console.log({ argv: process.argv });
  try {
    await runCli({ rootCommand: builder, argv: process.argv });
  } catch (ex) {
    console.log({ ex });
  }
})().catch(console.error);
