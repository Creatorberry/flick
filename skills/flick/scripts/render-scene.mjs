#!/usr/bin/env node
import {mkdir} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {resolve} from 'node:path';

const args = process.argv.slice(2);
const valueAfter = (flag) => args[args.indexOf(flag) + 1];
const project = resolve(valueAfter('--project') || 'flick-output');
const composition = valueAfter('--composition');
const name = valueAfter('--name');
if (!composition || !name) throw new Error('Usage: node render-scene.mjs --project <flick-output> --composition <scene-id> --name <approved-scene-name>');
if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)) throw new Error('Use the approved scene name in lowercase kebab-case.');

const outputDir = resolve(project, 'scenes', name);
await mkdir(outputDir, {recursive: true});
const output = resolve(outputDir, `${name}.mp4`);
const result = spawnSync('npx', ['remotion', 'render', 'src/index.tsx', composition, output], {cwd: resolve(project, 'remotion'), stdio: 'inherit', shell: process.platform === 'win32'});
if (result.error) throw result.error;
if (result.status !== 0) throw new Error(`Remotion render failed with exit code ${result.status}`);
console.log(output);
