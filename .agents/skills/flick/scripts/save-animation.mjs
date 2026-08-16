#!/usr/bin/env node
import {cp, mkdir, writeFile} from 'node:fs/promises';
import {basename, resolve} from 'node:path';

const args = process.argv.slice(2);
const valueAfter = (flag) => args[args.indexOf(flag) + 1];
const project = valueAfter('--project');
const name = valueAfter('--name');
const component = valueAfter('--component');
const preview = valueAfter('--preview');

if (!project || !name || !component || !preview) {
  throw new Error('Usage: node save-animation.mjs --project <path> --name <kebab-name> --component <file.tsx> --preview <scene.mp4>');
}
if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)) {
  throw new Error('Use a lowercase kebab-case animation name.');
}

const target = resolve(project, 'saved-animations', name);
await mkdir(target, {recursive: true});
await cp(component, resolve(target, basename(component)));
await cp(preview, resolve(target, 'preview.mp4'));
await writeFile(
  resolve(target, 'metadata.json'),
  JSON.stringify({name, component: basename(component), savedAt: new Date().toISOString(), preview: 'preview.mp4'}, null, 2) + '\n',
);
console.log(`Saved reusable animation: ${target}`);
