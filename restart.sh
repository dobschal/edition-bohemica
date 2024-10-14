git fetch
git reset --hard origin/master
docker compose build app --no-cache
docker compose down app
docker compose up app -d
docker system prune -f