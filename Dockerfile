# 1. FÁZE: Sestavení aplikace (Build)
FROM node:20 AS builder
WORKDIR /app

# Nejdřív zkopírujeme soubory se závislostmi
COPY package*.json ./
RUN npm install

# Pak zkopírujeme zbytek kódu a "uvaříme" (build) produkční verzi
COPY . .
RUN npm run build

# 2. FÁZE: Samotný běh (Production)
FROM node:20-slim
WORKDIR /app

# Nainstalujeme jednoduchý a rychlý server pro statické weby
RUN npm install -g serve

# Zkopírujeme jen tu "uvařenou" složku dist z první fáze
COPY --from=builder /app/dist ./dist

# Nastavíme port 8080, který Google Cloud Run vyžaduje
EXPOSE 8080

# Spustíme server, který bude servírovat složku dist na portu 8080
CMD ["serve", "-s", "dist", "-l", "8080"]
