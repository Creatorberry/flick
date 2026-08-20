#!/usr/bin/env node
import {appendFile, cp, mkdir, stat} from 'node:fs/promises';
import {basename, resolve} from 'node:path';

const args = process.argv.slice(2);
const valueAfter = (flag) => args[args.indexOf(flag) + 1];
const library = valueAfter('--library');
const name = valueAfter('--name');
const component = valueAfter('--component');
const pattern = valueAfter('--pattern');
const useFor = valueAfter('--use-for');
const avoidFor = valueAfter('--avoid-for');

if (!library || !name || !component || !pattern?.trim() || !useFor?.trim() || !avoidFor?.trim()) {
  throw new Error('Usage: node save-animation.mjs --library <saved-animations> --name <kebab-name> --component <file.tsx> --pattern <visual-pattern> --use-for <strong-fit-use-cases> --avoid-for <mismatched-use-cases>');
}
if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name)) {
  throw new Error('Use a lowercase kebab-case animation name.');
}
if (!(await stat(component)).isFile()) {
  throw new Error(`Component not found: ${component}`);
}

const target = resolve(library, name);
await mkdir(target, {recursive: true});
await cp(component, resolve(target, basename(component)));

const entry = [
  '',
  `## ${name}`,
  `**File:** \`${name}/${basename(component)}\``,
  `**Pattern:** ${pattern.trim()}`,
  `**Use for:** ${useFor.trim()}`,
  `**Avoid for:** ${avoidFor.trim()}`,
  '',
].join('\n');
await appendFile(resolve(library, 'README.md'), entry);
console.log(`Saved editable animation component: ${target}`);
