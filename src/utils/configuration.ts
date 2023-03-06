import { parse } from 'yaml';
import type { ConfigurationType } from './configuration.type.js';
import { join, dirname } from 'node:path';
import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const emptyConfiguration: ConfigurationType = {
  fuelPrices: {
    enabled: false,
    groups: [],
  },
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export function loadConfiguration(): ConfigurationType {
  let config = {};
  console.log('load');
  const configFile = join(__dirname, '..', '..', 'data', 'config.yaml');

  if (existsSync(configFile)) {
    const configString = readFileSync(configFile, { encoding: 'utf-8' });
    config = parse(configString) as ConfigurationType;
  }

  return { ...emptyConfiguration, ...config };
}
