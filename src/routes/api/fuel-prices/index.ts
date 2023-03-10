import type { FastifyPluginAsync } from 'fastify';

const route: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
  fastify.get('/', async function (_request, _reply) {
    // ToDo: move this pattern to helper function
    if (fastify.state.fuelPrices.lastRequest + 5 * 60 * 1000 >= Date.now()) {
      fastify.log.warn('fuel-prices send cached result');
      return fastify.state.fuelPrices.lastResult;
    }
    fastify.state.fuelPrices.lastRequest = Date.now();
    fastify.log.info('fuel-prices send fresh result');

    const stationIds = fastify.configuration.fuelPrices.groups.map((group) => group.stations.map((station) => station.id));

    // Limit gas station count -> tankerkönig supports only 10 per request
    if (stationIds.length > 10) {
      stationIds.length = 10;
    }

    const urlParams = [`apikey=${fastify.configuration.fuelPrices.apiKey}`, `ids=${stationIds.join(',')}`];

    const url = `https://creativecommons.tankerkoenig.de/json/prices.php?${urlParams.join('&')}`;
    const response = await fetch(url);
    const data = await response.json();
    // ToDo: Parse result
    // ToDo: Group result
    fastify.state.fuelPrices.lastResult = data;
    return data;
  });
};

export default route;
