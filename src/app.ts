import { join, dirname } from 'node:path';
import AutoLoad from '@fastify/autoload';
import type { AutoloadPluginOptions } from '@fastify/autoload';
import type { FastifyPluginAsync } from 'fastify';
import { fileURLToPath } from 'node:url';
import { loadConfiguration } from './utils/configuration.js';
import { loadState, saveState } from './utils/state.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export type AppOptions = {
  // Place your custom options for app below here.
} & Partial<AutoloadPluginOptions>;

// Pass --options via CLI arguments in command to enable these options.
const options: AppOptions = {};

// ToDo: Can this be inside app scope?
const state = loadState();

const app: FastifyPluginAsync<AppOptions> = async (fastify, opts): Promise<void> => {
  // Place here your custom code!
  fastify.decorate('configuration', loadConfiguration());
  fastify.decorate('state', state);

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: opts,
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  void fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: opts,
  });
};

process.on('exit', () => {
  saveState(state);
});

export default app;
export { app, options };
