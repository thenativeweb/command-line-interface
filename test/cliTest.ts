import { builder } from '../example/builder';
import { runCli } from '../lib/runCli';

suite('Cli', (): void => {
  test('sample application.', async (): Promise<void> => {
    const command = 'node cli.js -v remote -r https://localhost:1234/ show -a'.split(' ');

    await runCli(builder, command);
  });
});
