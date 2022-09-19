# edition-bohemica

> [Edition Bohemica](https://edition-bohemica.de)

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
