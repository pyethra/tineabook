# Usa uma imagem leve do Node
FROM node:20-alpine

# Instala ferramentas básicas
RUN apk add --no-cache bash git

# Define a pasta de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia todo o código do app para o container
COPY . .

# Expo usa essas portas
EXPOSE 19000 19001 19002

# Comando padrão para rodar o app
CMD ["expo", "start", "--tunnel"]
