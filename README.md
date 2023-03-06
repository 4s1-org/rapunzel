# Rapunzel

## Development

Build and run docker container locally:

```bash
docker build -t rapunzel_dev .
docker run -it --rm -p 8080:3000 -v $PWD/data:/app/data rapunzel_dev
```
