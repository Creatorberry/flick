#!/usr/bin/env node
import {cp, mkdir, readFile, readdir, writeFile} from 'node:fs/promises';
import {basename, resolve} from 'node:path';

const args = process.argv.slice(2);
const valueAfter = (flag) => args[args.indexOf(flag) + 1];
const project = valueAfter('--project');
const name = valueAfter('--name');
const component = valueAfter('--component');
const preview = valueAfter('--preview');
const poster = valueAfter('--poster');
const description = valueAfter('--description');

if (!project || !name || !component || !preview || !description?.trim()) {
  throw new Error('Usage: node save-animation.mjs --project <path> --name <kebab-name> --component <file.tsx> --preview <scene.mp4> --description <generic-description>');
}
if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)) {
  throw new Error('Use a lowercase kebab-case animation name.');
}

const target = resolve(project, 'saved-animations', name);
await mkdir(target, {recursive: true});
await cp(component, resolve(target, basename(component)));
await cp(preview, resolve(target, 'preview.mp4'));
if (poster) await cp(poster, resolve(target, 'poster.jpg'));
await writeFile(
  resolve(target, 'metadata.json'),
  JSON.stringify({name, component: basename(component), savedAt: new Date().toISOString(), preview: 'preview.mp4', poster: poster ? 'poster.jpg' : null, description: description.trim()}, null, 2) + '\n',
);

const savedRoot = resolve(project, 'saved-animations');
const folders = await readdir(savedRoot, {withFileTypes: true});
const entries = await Promise.all(folders.filter((folder) => folder.isDirectory()).map(async (folder) => {
  try {
    return JSON.parse(await readFile(resolve(savedRoot, folder.name, 'metadata.json'), 'utf8'));
  } catch {
    return null;
  }
}));
const catalog = entries.filter(Boolean).sort((a, b) => a.name.localeCompare(b.name));
const lines = ['# Saved Animations', '', 'Read this file before reusing an animation. Choose a matching entry, then open only that component folder.', ''];
for (const entry of catalog) {
  lines.push(`## ${entry.name}`, `- Component: \`${entry.name}/${entry.component}\``, `- Preview: \`${entry.name}/${entry.preview}\``, `- Poster: \`${entry.name}/${entry.poster ?? 'none'}\``, `- What it does: ${entry.description ?? 'No reusable description recorded.'}`, '');
}
await writeFile(resolve(savedRoot, 'README.md'), `${lines.join('\n')}\n`);
console.log(`Saved reusable animation: ${target}`);
