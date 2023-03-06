import type { FastifyPluginAsync } from 'fastify';

const route: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
  fastify.get('/', async function (_request, _reply) {
    // ToDo: Limit station id count to 10
    const stationIds = fastify.configuration.fuelPrices.groups.map((group) => group.stations.map((station) => station.id));
    const urlParams = [`apikey=${fastify.configuration.fuelPrices.apiKey}`, `ids=${stationIds.join(',')}`];

    const url = `https://creativecommons.tankerkoenig.de/json/prices.php?${urlParams.join('&')}`;
    // ToDo: Respect API rate limits
    const response = await fetch(url);
    const data = response.json();
    // ToDo: Parse result
    // ToDo: Group result
    return data;
  });
};

export default route;
