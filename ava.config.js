export default {
  files: ['src/**/*.spec.ts'],
  extensions: { ts: 'module' },
  nodeArguments: ['--loader=ts-node/esm'],
};
