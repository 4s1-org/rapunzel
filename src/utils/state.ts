import { parse, stringify } from 'yaml';
import { join, dirname } from 'node:path';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import type { StateType } from './state.type.js';

const emptyState: StateType = {
  fuelPrices: {
    lastRequest: 0,
    lastResult: null,
  },
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const stateFile = join(__dirname, '..', '..', 'data', 'data.yaml');

export function loadState(): StateType {
  let config = {};

  if (existsSync(stateFile)) {
    const stateString = readFileSync(stateFile, { encoding: 'utf-8' });
    config = parse(stateString) as StateType;
  }

  return { ...emptyState, ...config };
}

export function saveState(state: StateType): void {
  console.log('save state', state);
  const stateString = stringify(state);
  writeFileSync(stateFile, stateString, { encoding: 'utf-8' });
}
