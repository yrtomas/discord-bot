# Usa la imagen oficial de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el package.json y el package-lock.json al contenedor
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código al contenedor
COPY . .

# Expone el puerto del servidor API
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "src/index.js"]
