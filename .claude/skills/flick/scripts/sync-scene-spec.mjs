#!/usr/bin/env node
import {cp} from 'node:fs/promises';
import {resolve} from 'node:path';

const args = process.argv.slice(2);
const valueAfter = (flag) => args[args.indexOf(flag) + 1];
const project = resolve(valueAfter('--project') || 'flick-output');
await cp(resolve(project, 'scene-spec.json'), resolve(project, 'remotion', 'src', 'data', 'scene-spec.json'));
console.log('Synced approved scene spec into the Remotion project.');
