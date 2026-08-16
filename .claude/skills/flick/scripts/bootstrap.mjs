#!/usr/bin/env node
import {spawnSync} from 'node:child_process';
import {access} from 'node:fs/promises';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const here = resolve(fileURLToPath(new URL('.', import.meta.url)));
const args = process.argv.slice(2);
const valueAfter = (flag) => args[args.indexOf(flag) + 1];
const project = resolve(valueAfter('--project') || 'flick-project');
const packageManager = valueAfter('--package-manager') || process.env.FLICK_PACKAGE_MANAGER || (process.platform === 'win32' ? 'npm.cmd' : 'npm');
const run = (command, commandArgs, options = {}) => {
  const useShell = process.platform === 'win32' && /\.cmd$/i.test(command);
  const result = spawnSync(command, commandArgs, {stdio: 'inherit', shell: useShell, ...options});
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${command} failed with exit code ${result.status}`);
};

try {
  await access(resolve(project, 'package.json'));
} catch {
  run(process.execPath, [resolve(here, 'setup-workspace.mjs'), '--project', project]);
}

const pythonCandidates = process.platform === 'win32'
  ? [['py', ['-3']], ['python', []]]
  : [['python3', []], ['python', []]];
let python;
for (const [command, prefix] of pythonCandidates) {
  const probe = spawnSync(command, [...prefix, '--version'], {stdio: 'ignore'});
  if (probe.status === 0) { python = {command, prefix}; break; }
}
if (!python) throw new Error('Flick needs Python 3. Install Python 3, then run Flick again.');

run(packageManager, ['install'], {cwd: project});
run(python.command, [...python.prefix, '-m', 'pip', 'install', '--user', 'openai-whisper', 'yt-dlp']);

console.log(`Flick is ready: ${project}`);
console.log('Installed: Remotion, ffmpeg-static, openai-whisper, and yt-dlp.');
