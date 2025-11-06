Created images and sucessfully I have run that image.
Development is only using Docker and VS code.

docker run --rm -v "$PWD/backend":/app -w /app node:20-alpine sh -c "npm install --package-lock-only"
# docker
