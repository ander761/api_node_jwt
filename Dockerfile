# Imagem base
FROM node:12.16

# Configuração do usuário/permissões
USER node
WORKDIR /home/node/

# Instalação das dependências
COPY package.json .
COPY package-lock.json .
COPY nodemon.json .
RUN npm install

# Copia dos arquivos do projeto
COPY . .

# Execução
CMD ["npm", "start"]