import type { FastifyPluginAsync } from 'fastify';

const route: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
  fastify.get('/', async function (_request, _reply) {
    return fastify.configuration;
  });
};

export default route;
