# _edition bohemica_

![Hetzner Deployment](https://github.com/dobschal/edition-bohemica/actions/workflows/main.yml/badge.svg)

> App should be available here: [Edition Bohemica](https://edition-bohemica.de)

## Hosting

There is a Hetzner VM running with Docker and Ubuntu.
Domain lay at IONOS and have a DNS A record pointing to the VM.

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

### Backups

Checkout the backup.sh script. It copies all relevant files into `~/backups` on the machine.


## Nginx

We are just using the Node exposed port 3000 and redirecting it via Nginx to the domain.
There are no static files served via Nginx.

## SSL Certificates

We use certbot with letsencrypt to get the certificates.
https://www.youtube.com/watch?v=ghZXFyIyK1o

The certs are renewed automatically via a cronjob.
