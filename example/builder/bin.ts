import { builder } from './';
import { runCli } from '../../lib/';

(async () => {
  try {
    await runCli(builder, process.argv);
  } catch (ex) {
    console.log({ ex });
  }
})();
