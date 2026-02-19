FROM node:20 AS builder
WORKDIR /app
ARG GEMINI_API_KEY
ENV GEMINI_API_KEY=$GEMINI_API_KEY
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-slim
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist
EXPOSE 8080
CMD ["serve", "-s", "dist", "-l", "8080"]
