#!/usr/bin/env node
import {mkdir} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {resolve} from 'node:path';

const args = process.argv.slice(2);
const valueAfter = (flag) => args[args.indexOf(flag) + 1];
const project = resolve(valueAfter('--project') || 'flick-project');
const composition = valueAfter('--composition');
if (!composition) throw new Error('Usage: node render-scene.mjs --project <flick-project> --composition <SceneId>');

const outputDir = resolve(project, 'out', 'scenes');
await mkdir(outputDir, {recursive: true});
const output = resolve(outputDir, `${composition}.mp4`);
const result = spawnSync('npx', ['remotion', 'render', 'src/index.tsx', composition, output], {cwd: project, stdio: 'inherit'});
if (result.error) throw result.error;
if (result.status !== 0) throw new Error(`Remotion render failed with exit code ${result.status}`);
console.log(output);
