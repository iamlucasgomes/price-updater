check_containers() {
  while true; do
    if docker compose ps | grep -q "Up"; then
      echo "Contêineres estão prontos!"
      break
    fi
    echo "Aguardando que os contêineres subam..."
    sleep 5
  done
}

npm install &&
  
docker compose up -d &&

check_containers

npx prisma migrate dev && 
npx prisma db seed &&
next build && 
next start
