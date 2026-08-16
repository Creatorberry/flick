import {spawnSync} from 'node:child_process';

const versionFrom = (text) => {
  const match = String(text).match(/Python\s+(\d+)\.(\d+)/i);
  return match ? {major: Number(match[1]), minor: Number(match[2])} : undefined;
};
const supported = (version) => version && (version.major > 3 || (version.major === 3 && version.minor >= 9));

export const findPython = () => {
  const candidates = [];
  if (process.platform === 'win32') {
    const launcher = spawnSync('py', ['-0p'], {encoding: 'utf8'});
    const versions = [...`${launcher.stdout}\n${launcher.stderr}`.matchAll(/-(\d+\.\d+)/g)]
      .map((match) => match[1])
      .sort((a, b) => Number(b) - Number(a));
    for (const version of [...new Set(versions)]) candidates.push(['py', [`-${version}`]]);
    candidates.push(['python', []]);
  } else {
    candidates.push(['python3', []], ['python', []]);
  }

  for (const [command, prefix] of candidates) {
    const probe = spawnSync(command, [...prefix, '--version'], {encoding: 'utf8'});
    if (probe.status === 0 && supported(versionFrom(`${probe.stdout}\n${probe.stderr}`))) return {command, prefix};
  }
  return undefined;
};

export const pythonInstallGuidance = () =>
  process.platform === 'win32'
    ? 'Install Python 3.9+ with winget install Python.Python.3.12.'
    : 'Install Python 3.9+ with your platform package manager.';
