# 1. FÁZE: Sestavení (Build)
FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2. FÁZE: Běh (Nginx - stabilní server)
FROM nginx:alpine
# Zkopírujeme uvařený web do složky, kde ho Nginx vidí
COPY --from=builder /app/dist /usr/share/nginx/html

# Nastavíme port 8080 (Google Cloud standard)
RUN sed -i 's/80/8080/g' /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
