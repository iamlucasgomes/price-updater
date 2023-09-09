# 🛒 Price Updater

# 🎯Objetivo:

Desenvolver uma aplicação Fullstack capaz de realizar a atualização de preços de produtos por meio de um arquivo .csv, contendo o código e o novo preço de cada produto, além de prover toda a infraestrutura necessária para garantir a efetividade dessa funcionalidade.

# 🖥️Tecnologias utilizadas:

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NextJS](https://img.shields.io/badge/NextJS-000000.svg?&style=for-the-badge&logo=next.js&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748.svg?&style=for-the-badge&logo=prisma&logoColor=white)
![AntDesign](https://img.shields.io/badge/AntDesign-0170FE.svg?&style=for-the-badge&logo=antdesign&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)

## 📋 Pré-requisitos:

- Docker versão 23.0.5
- Docker compose versão v2.5.0

# 🛠️ Como Utilizar:

1. Clone o repositório para sua máquina utilizando o comando:

   `git clone git@github.com:iamlucasgomes/price-updater.git`

2. Após finalizar o download, abra a pasta e crie um arquivo **.env** contendo as mesmas variáveis de ambiente presentes no arquivo **.env.example**, ou use os dados do exemplo abaixo:
   <pre><code>
   PORT=3000
   DB_PORT=3306
   DATABASE_URL=mysql://root:root@localhost:${DB_PORT}/price-updater
   </code></pre>

3. Abra um terminal na **pasta raiz do repositório** e execute o comando <code>npm run dev</code> ou o comando <code>yarn dev</code> na pasta raiz;

4. Aguarde a aplicação inicializar;

5. Após isso, você poderá acessar o frontend da aplicação localmente através do localhost na porta escolhida na variável de ambiente PORT. Por padrão, a página pode ser acessada nesse link: <link>http://localhost:3000</link>

7. Existem dois arquivos .csv na pasta /data: rightprices.csv, que pode ser utilizado para atualizar produtos com sucesso, e wrongprices.csv, que propositalmente gera alguns erros para facilitar a testagem da aplicação.


## 💻 Aplicação:

O objetivo da aplicação é permitir que o usuário carregue um arquivo de precificação contendo o código e o novo preço de cada produto.

Ao clicar no botão "VALIDAR", o sistema lê todo o arquivo e verifica se todos os campos necessários estão preenchidos, se os códigos de produtos informados existem, se os preços estão preenchidos corretamente e se o arquivo respeita as regras definidas no cenário.

Ao final da validação, o sistema exibe as seguintes informações dos produtos que foram enviados: Código, Nome, Preço Atual e Novo Preço. Caso uma ou mais regras de validação tenham sido quebradas, o sistema exibe qual regra foi quebrada.

Se todos os produtos do arquivo foram validados e nenhuma regra foi quebrada, o botão "ATUALIZAR" é habilitado. Ao clicar em "ATUALIZAR", o sistema salva o novo preço no banco de dados e deixa a tela pronta para o envio de um novo arquivo.

