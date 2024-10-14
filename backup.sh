# Go to correct workfolder
cd /root/deployments/edition-bohemica

# sh into the docker container and run the standard mongo db dump method
docker exec -i mongodb mongodump

# Copy all files out of the container into a backup folder
docker cp mongodb:/dump /root/backups/mongodb

# Copy all uploaded files
docker cp edition-bohemica-app-1:/usr/src/app/server/uploads /root/backups/uploads-edition-bohemica