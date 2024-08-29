# edition-bohemica

![Hetzner Deployment](https://github.com/dobschal/edition-bohemica/actions/workflows/main.yml/badge.svg)

> [Edition Bohemica](https://edition-bohemica.de)

## Hosting

There is a Hetzner VM running with Docker and Ubuntu.

## CI Deployment via GitHub Pipeline

Check the workflow in the .github folder.
It connects to the Hetzner VM via SSH, fetches the latest changes, builds the docker image and restarts the server.

## Deployment via Docker

First create a volume to have the MongoDB and uploads persisted:
```bash
docker volume create db-volume
docker volume create uploads-volume
```

Create the docker network:
```bash
docker network create edition-bohemica
```

Then start the MongoDB containers via docker compose:
```bash
docker compose up -d
```

Inside the docker compose file, there is a path to an old backup of the mongodb. That is copied as a volume into the container. 
Open a shell in the container and restore the backup:
```bash
docker exec -it mongodb sh
mongorestore --verbose --db edition-bohemica /dump
```

Interact with mongodb
```bash
# Move into docker container
docker exec -it mongodb sh
# open mongo shell
mongo
# show databases
show databases
```

The URL in the server app to the mongo db needs to be changed to `mongodb://mongodb:27017/edition-bohemica`.
Because the network is setup via Docker.


## Nginx

???

## SSL Certificates

???

## CI/CD Pipeline

???

---
OLD stuff below...





## Deployment

Just log into server via SSH and fetch/pull the latest changes to `/root/NodeJS/edition-bohemica`.

Run NPM install...

Run the server with PM2:
```bash
pm2 restart edition-bohemica

# or complete start
pm2 stop all
pm2 delete edition-bohemica
pm2 start app.js --name edition-bohemica
```

Build client with
```bash
npm run build:prod
```

Everything else is setup via Nginx

For the server all secrets are stored in the .env file.
