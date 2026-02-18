# 1. FÁZE: Příprava
FROM node:20 AS builder
WORKDIR /app

# Deklarujeme, že budeme potřebovat klíč během stavby (Build Time)
ARG VITE_GEMINI_API_KEY
ENV VITE_GEMINI_API_KEY=$VITE_GEMINI_API_KEY

COPY package*.json ./
RUN npm install
COPY . .

# Tady se klíč "zapeče" do JavaScriptu
RUN npm run build

# 2. FÁZE: Spuštění
FROM node:20-slim
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist
EXPOSE 8080
# Serve je jistota, že se nic nerozbije
CMD ["serve", "-s", "dist", "-l", "8080"]
