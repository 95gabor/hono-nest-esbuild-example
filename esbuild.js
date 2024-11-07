import { context } from 'esbuild';
import { resolve } from 'path';
import { rm, mkdir, statfs, writeFile } from 'fs/promises';
import esbuildPluginTsc from 'esbuild-plugin-tsc';
const __dirname = import.meta.dirname;

const minify = !process.argv.includes('--dev');
const entryPoint =
  process.argv.find((arg) => arg.includes('--entry='))?.split('=')[1] ||
  './src/main.ts';

const outDir = './dist';
const outFile = `main`;

try {
  if (await statfs(outDir).catch(() => false)) {
    await rm(outDir, { recursive: true });
  }
  await mkdir(outDir);

  const buildContext = await context({
    entryPoints: [{ in: entryPoint, out: outFile }],
    outdir: outDir,
    outExtension: { '.js': '.mjs' },
    format: 'esm',
    platform: 'node',
    target: ['ESNext'],
    bundle: true,
    mainFields: ['module', 'main'],
    banner: {
      js: "import { createRequire } from 'module'; const require = createRequire(import.meta.url);",
    },
    treeShaking: true,
    keepNames: true,
    splitting: true,
    minify,
    external: [
      '@apollo/subgraph',
      '@nestjs/microservices',
      '@nestjs/platform-express',
      '@nestjs/websockets',
      'class-transformer/storage',
      'fsevents',
      'ts-morph',
    ],
    plugins: [
      esbuildPluginTsc(),
      {
        name: 'alias-plugin',
        setup(build) {
          build.onResolve({ filter: /^hexoid$/ }, (args) => ({
            path: resolve(__dirname, 'node_modules/hexoid/dist/index.js'),
          }));
        },
      },
    ],
  });

  const result = await buildContext.rebuild();
  if (result.errors.length > 0) {
    console.log('Build failed');
    process.exit(1);
  }
  process.exit(0);
} catch (error) {
  console.error(error);
  process.exit(1);
}
