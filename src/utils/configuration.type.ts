export type ConfigurationType = {
  fuelPrices: {
    enabled: boolean;
    groups: Array<{
      name: string;
      stations: Array<{
        name: string;
        id: string;
      }>;
    }>;
  };
};
