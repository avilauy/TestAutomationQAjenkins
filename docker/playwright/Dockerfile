# ==========================================
# Playwright Executor - TMS Automation
# ==========================================
FROM mcr.microsoft.com/playwright:v1.57.0-jammy

USER root

WORKDIR /app

# Copiamos package primero para cache
COPY package*.json ./

RUN npm install

# Copiamos el resto del proyecto
COPY . .

# Directorio donde Allure escribe resultados
RUN mkdir -p /app/allure-results

# NO generamos reporte acá
CMD ["npx", "playwright", "test"]
