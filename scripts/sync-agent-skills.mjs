#!/usr/bin/env node
import {cp, rm} from 'node:fs/promises';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const names = ['flick'];

for (const agentPath of ['.agents/skills', '.claude/skills']) {
  for (const name of names) {
    const target = resolve(root, agentPath, name);
    await rm(target, {recursive: true, force: true});
    await cp(resolve(root, 'skills', name), target, {recursive: true});
  }
}

console.log('Synced canonical skills to Codex and Claude Code discovery paths.');
