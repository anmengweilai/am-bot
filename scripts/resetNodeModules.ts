import { chalk, fastGlob, isLinux, isMacintosh } from '@anmeng/utils';
import fs from 'fs';
import path from 'path';
import 'zx/globals';

(async () => {
  const args = process.argv.slice(2);

  const basePath = process.cwd();
  const files = await fastGlob(
    ['packages/**/package.json', 'apps/**/package.json', 'package.json'],
    {
      cwd: basePath,
      ignore: ['**/node_modules/**', '**/compiled/**'],
    },
  );

  if (!args.includes('--no-build')) {
    console.log(`${chalk.green('------ start build ------')}`);
    await $`pnpm build`;
  }

  for (const filePath of files) {
    const deletePath = path.join(
      basePath,
      filePath.replace('package.json', 'node_modules'),
    );
    if (fs.existsSync(deletePath)) {
      try {
        console.log(`${chalk.green('delete')} : ${deletePath}`);
        await $`rm -rf ${deletePath}`;
      } catch (e) {
        console.log('可能出现了权限问题~~~ 建议使用 `$ sudo` 进入');
      }
    }
  }

  await $`pnpm install`;
  await $`pnpm link ${path.join(basePath, 'scripts')}`;
  (isMacintosh || isLinux) && (await $`chmod -R 777 *`);
  process.exit(0);
})();
