# ==========================================
# Playwright Executor - TMS Automation
# ==========================================
FROM mcr.microsoft.com/playwright:v1.57.0-jammy

USER root

WORKDIR /app

# Copiamos solo package para cache
COPY package*.json ./

# Instalamos dependencias (incluye allure-playwright)
RUN npm install

# VERIFICACIÓN CLAVE (falla el build si no existe)
RUN npm list allure-playwright

# Copiamos el resto del proyecto
COPY . .

# Directorios de salida (se llenan en runtime)
RUN mkdir -p /app/allure-results /app/test-results

# Variables de entorno recomendadas
ENV ALLURE_RESULTS_DIR=/app/allure-results
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright

# Comando por defecto
CMD ["npx", "playwright", "test"]
