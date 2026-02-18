# 1. FÁZE: Sestavení (Build)
FROM node:20 AS builder
WORKDIR /app

# Musí to být GEMINI_API_KEY, protože tak to máš ve vite.config.ts
ARG GEMINI_API_KEY
ENV GEMINI_API_KEY=$GEMINI_API_KEY

COPY package*.json ./
RUN npm install
COPY . .

# Tady se klíč "zapeče" do kódu
RUN npm run build

# 2. FÁZE: Běh
FROM node:20-slim
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist
EXPOSE 8080
CMD ["serve", "-s", "dist", "-l", "8080"]
