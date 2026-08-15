#!/usr/bin/env node
import {spawnSync} from 'node:child_process';
import {mkdir} from 'node:fs/promises';
import {resolve} from 'node:path';

const args = process.argv.slice(2);
const valueAfter = (flag) => args[args.indexOf(flag) + 1];
const url = valueAfter('--url');
const outputDirectory = resolve(valueAfter('--output-dir') || '.');

if (!url) throw new Error('Usage: node download-audio.mjs --url <public-video-url> [--output-dir <dir>]');
await mkdir(outputDirectory, {recursive: true});

const result = spawnSync('yt-dlp', ['--no-playlist', '-x', '--audio-format', 'wav', '-o', resolve(outputDirectory, 'source.%(ext)s'), url], {stdio: 'inherit'});
if (result.error) throw result.error;
if (result.status !== 0) throw new Error(`yt-dlp failed with exit code ${result.status}`);
