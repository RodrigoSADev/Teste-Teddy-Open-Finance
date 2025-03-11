FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build -- --project=shell

# Production stage
FROM nginx:alpine

# Alterando o caminho para copiar o conteúdo correto
COPY --from=build /app/dist/shell/browser /usr/share/nginx/html
COPY projects/shell/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]