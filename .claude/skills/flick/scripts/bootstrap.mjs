#!/usr/bin/env node
import {spawnSync} from 'node:child_process';
import {access} from 'node:fs/promises';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {findPython, pythonInstallGuidance} from './python.mjs';

const here = resolve(fileURLToPath(new URL('.', import.meta.url)));
const args = process.argv.slice(2);
const valueAfter = (flag) => args[args.indexOf(flag) + 1];
const project = resolve(valueAfter('--project') || 'flick-output');
const packageManager = valueAfter('--package-manager') || process.env.FLICK_PACKAGE_MANAGER || (process.platform === 'win32' ? 'npm.cmd' : 'npm');
const run = (command, commandArgs, options = {}) => {
  const useShell = process.platform === 'win32' && /\.cmd$/i.test(command);
  const result = spawnSync(command, commandArgs, {stdio: 'inherit', shell: useShell, ...options});
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${command} failed with exit code ${result.status}`);
};
if (Number(process.versions.node.split('.')[0]) < 20) {
  const help = process.platform === 'win32' ? 'Install Node.js 20+ with winget install OpenJS.NodeJS.LTS.' : 'Install Node.js 20+ with your platform package manager.';
  throw new Error(`Flick needs Node.js 20+. ${help}`);
}

try {
  await access(resolve(project, 'remotion', 'package.json'));
} catch {
  run(process.execPath, [resolve(here, 'setup-workspace.mjs'), '--project', project]);
}

const python = findPython();
if (!python) {
  throw new Error(`Flick needs Python 3.9+. ${pythonInstallGuidance()}`);
}

const remotion = resolve(project, 'remotion');
if (/pnpm(?:\.cmd)?$/i.test(packageManager)) {
  run(packageManager, ['install', '--ignore-scripts'], {cwd: remotion});
  run(packageManager, ['approve-builds', 'esbuild', 'ffmpeg-static'], {cwd: remotion});
  run(packageManager, ['rebuild', 'esbuild', 'ffmpeg-static'], {cwd: remotion});
} else {
  run(packageManager, ['install'], {cwd: remotion});
}
run(python.command, [...python.prefix, '-m', 'pip', 'install', '--user', '--upgrade', 'pip']);
run(python.command, [...python.prefix, '-m', 'pip', 'install', '--user', 'openai-whisper', 'yt-dlp']);

console.log(`Flick is ready: ${project}`);
console.log('Installed: Remotion, ffmpeg-static, openai-whisper, yt-dlp, and bundled sound effects.');
