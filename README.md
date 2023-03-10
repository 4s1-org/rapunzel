# Rapunzel

Rapunzel does not offer hair, but it does offer an API for various services,
e.g. fuel prices, weather data and other.
The focus is on the use in the local network to provide the mentioned
data to other local services and to manage API keys, data format
conversion and rate limits centrally.

## Features

🎉 Implemented

- _none_ 😟

🚧 Under development

- Fuel prices (data from [Tankerkönig](https://tankerkoenig.de))

🕑 Planed

- Weather information (data from [OpenWeather](https://openweathermap.org))
- Travel time calculation (data from [Here](https://developer.here.com))
- Route calculation (data from [OpenStreetMap](https://nominatim.openstreetmap.org))
- Rhein-Main-Verkehrsverbund (RMV) connections (data from [RMV](https://opendata.rmv.de/))

### Feature, that will never implemented

- TLS support \
  Use a proxy such as [nginx](https://docs.nginx.com/nginx/admin-guide/web-server/reverse-proxy/) or [traefik](https://doc.traefik.io/traefik/).
- Authentication / Authorization \
  This project is intended for use on a local network and not for access via the internet.

## How to run

### Locally

> ⚠️ This repo uses pnpm!

```bash
# Install dependencies
pnpm install
# Start
pnpm run start
```

You can also create your own docker image and run a container.

```bash
# Build
docker build -t rapunzel_dev .
# Run
docker run -it --rm \
  -p 8080:3000 \
  -v $PWD/data:/app/data \
  rapunzel_dev
```

### Docker

```bash
docker run -it --rm  \
  -p 8080:3000 \
  -v $PWD/data:/app/data \
  ghcr.io/4s1-org/rapunzel
```

### Docker compose

```yml
services:
  rapunzel:
    image: ghcr.io/4s1-org/rapunzel
    container_name: rapunzel
    security_opt:
      - no-new-privileges:true
    restart: unless-stopped
    volumes:
      - $PWD/rapunzel/data:/app/data
    ports:
      - 8080:3000
```

## Configuration

In order for the individual APIs to load the desired data,
a `config.yaml` must be created and configured in the `data` folder.

```yaml
# data/config.yaml

fuelPrices:
  enabled: true
  apiKey: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
  groups:
  # ...

weather:
  enabled: false
# ...
```

### Fuel prices

> ℹ️ A maximum of 10 gas stations are possible.

```yaml
fuelPrices:
  # Enable service
  enabled: true
  # You can get an api key from https://creativecommons.tankerkoenig.de
  apiKey: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
  groups:
    # Create one or more groups with custom name
    - name: Hometown
      # Create one or more stations
      stations:
        # Set a custom name for the gas station
        - name: Favorite gas station
          # Id can be found in the latest file from https://dev.azure.com/tankerkoenig/_git/tankerkoenig-data?path=/stations
          id: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
    - name: Second group
      stations:
        - name: First station
          id: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
        - name: Second station
          id: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

Route: http://<ip>:<port>/api/fuel-prices
