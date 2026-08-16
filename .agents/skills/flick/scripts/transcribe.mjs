#!/usr/bin/env node
import {spawnSync} from 'node:child_process';
import {mkdir, readdir} from 'node:fs/promises';
import {createRequire} from 'node:module';
import {basename, extname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const here = resolve(fileURLToPath(new URL('.', import.meta.url)));
const args = process.argv.slice(2);
const valueAfter = (flag) => args[args.indexOf(flag) + 1];
const source = valueAfter('--source');
const project = resolve(valueAfter('--project') || 'flick-project');
if (!source) throw new Error('Usage: node transcribe.mjs --source <video-file-or-public-url> --project <flick-project>');

const pythonCandidates = process.platform === 'win32'
  ? [['py', ['-3']], ['python', []]]
  : [['python3', []], ['python', []]];
let python;
for (const [command, prefix] of pythonCandidates) {
  if (spawnSync(command, [...prefix, '--version'], {stdio: 'ignore'}).status === 0) { python = {command, prefix}; break; }
}
if (!python) throw new Error('Python 3 was not found. Run bootstrap.mjs after installing Python 3.');
const run = (command, commandArgs) => {
  const result = spawnSync(command, commandArgs, {stdio: 'inherit'});
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${command} failed with exit code ${result.status}`);
};

let media = source;
if (/^https?:\/\//i.test(source)) {
  const input = resolve(project, 'input');
  await mkdir(input, {recursive: true});
  run(python.command, [...python.prefix, '-m', 'yt_dlp', '--no-playlist', '-x', '--audio-format', 'wav', '-o', resolve(input, 'source.%(ext)s'), source]);
  const files = await readdir(input);
  const downloaded = files.find((file) => extname(file).toLowerCase() === '.wav');
  if (!downloaded) throw new Error('yt-dlp did not create a WAV file. Supply a local video instead.');
  media = resolve(input, downloaded);
}

const projectRequire = createRequire(resolve(project, 'package.json'));
const ffmpeg = projectRequire('ffmpeg-static');
run(python.command, [...python.prefix, resolve(here, 'transcribe.py'), media, '--output', resolve(project, 'transcript.json'), '--ffmpeg', ffmpeg]);
console.log(`Transcript ready for ${basename(media)}.`);
