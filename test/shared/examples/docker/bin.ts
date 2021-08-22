import { docker } from './commands/docker';
import { runCli } from '../../../../lib';

try {
  await runCli({ rootCommand: docker, argv: process.argv });
} catch (ex: unknown) {
  // eslint-disable-next-line no-console
  console.log({ ex });
}
