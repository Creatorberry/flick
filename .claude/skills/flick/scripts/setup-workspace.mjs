#!/usr/bin/env node
import {cp, mkdir, readdir, writeFile} from 'node:fs/promises';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);
const valueAfter = (flag) => args[args.indexOf(flag) + 1];
const project = resolve(valueAfter('--project') || 'flick-output');
const template = resolve(here, '../assets/starter-remotion');

try {
  const contents = await readdir(project);
  if (contents.length) throw new Error(`Refusing to overwrite non-empty directory: ${project}`);
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}

await mkdir(project, {recursive: true});
await Promise.all([
  mkdir(resolve(project, 'brand-assets')),
  mkdir(resolve(project, 'scenes')),
]);
await cp(template, resolve(project, 'remotion'), {recursive: true});
await writeFile(
  resolve(project, 'flick.config.json'),
  JSON.stringify({version: 2, transcript: 'transcript.json', plan: 'flick-plan.md', brief: 'remotion-brief.md', sceneSpec: 'scene-spec.json'}, null, 2) + '\n',
);

console.log(`Flick output created: ${project}`);
console.log(`Add brand files to: ${resolve(project, 'brand-assets')}`);
console.log(`Remotion project: ${resolve(project, 'remotion')}`);
