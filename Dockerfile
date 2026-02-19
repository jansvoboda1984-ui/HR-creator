# 1. FÁZE: Sestavení
FROM node:20 AS builder
WORKDIR /app
ARG VITE_GEMINI_API_KEY
ENV VITE_GEMINI_API_KEY=$VITE_GEMINI_API_KEY
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2. FÁZE: Běh
FROM node:20-slim
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist
EXPOSE 8080
CMD ["serve", "-s", "dist", "-l", "8080"]
