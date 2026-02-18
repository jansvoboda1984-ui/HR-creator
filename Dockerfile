# 1. Použijeme stabilní Node.js
FROM node:20

# 2. Nastavíme pracovní adresář
WORKDIR /app

# 3. Zkopírujeme soubory se závislostmi
COPY package*.json ./

# 4. Nainstalujeme VŠECHNY závislosti (i ty pro build)
RUN npm install

# 5. Zkopírujeme zbytek kódu
COPY . .

# 6. Postavíme produkční verzi aplikace
RUN npm run build

# 7. Otevřeme port 8080
EXPOSE 8080

# 8. Příkaz pro spuštění (Vite preview na portu 8080)
CMD ["npm", "run", "start"]
