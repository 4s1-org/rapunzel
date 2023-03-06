export type ConfigurationType = {
  fuelPrices: {
    enabled: boolean;
    apiKey: string;
    groups: Array<{
      name: string;
      stations: Array<{
        name: string;
        id: string;
      }>;
    }>;
  };
};
