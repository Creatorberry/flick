#!/usr/bin/env node
import {readFile, writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';

const args = process.argv.slice(2);
const valueAfter = (flag) => args[args.indexOf(flag) + 1];
const textFile = valueAfter('--text-file');
const project = resolve(valueAfter('--project') || 'flick-output');
if (!textFile) throw new Error('Usage: node write-transcript.mjs --text-file <path> --project <flick-output>');

const text = (await readFile(resolve(textFile), 'utf8')).trim();
if (!text) throw new Error('Transcript text is empty.');
await writeFile(resolve(project, 'transcript.json'), JSON.stringify({source: 'pasted-transcript', text, segments: [], words: []}, null, 2) + '\n');
console.log(`Transcript ready: ${resolve(project, 'transcript.json')}`);
