check_build_id() {
  if [ ! -f .next/BUILD_ID ]; then
    echo "O arquivo BUILD_ID não foi encontrado na pasta .next. Certifique-se de que o Next.js tenha sido construído corretamente."
    exit 1
  fi
}

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
  npm run build &&
  check_build_id &&
  docker compose up -d &&
  check_containers

npx prisma migrate dev &&
  npx prisma db seed &&
  next build &&
  next start
