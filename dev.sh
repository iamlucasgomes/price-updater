check_containers() {
  while true; do
    if docker compose ps | grep -q "Up"; then
      echo "\e[32mContêineres estão prontos!"
      sleep 5
      break
    fi
    echo "Aguardando que os contêineres subam..."
    sleep 5
  done
}

run_commands() {
  local attempt=0
  npm install &&
    npx prisma generate &&
    docker compose up -d &&
    check_containers &&
    npx prisma migrate deploy &&
    npx prisma db seed &&
    next dev
}

while true; do
  if run_commands; then
    echo "Comandos executados com sucesso!"
    break
  else
    echo "\e[31mUm erro foi encontrado. \e[33mTentaremos novamente em 5 segundos..."
    sleep 5
    attempt=$((attempt + 1))
    if [ $attempt -ge 10 ]; then
      echo "\e[31mAh, algo deu errado. Tente novamente ou chame o suporte."
      break
    fi
  fi
done
