# ==========================================
# Playwright Executor - TMS Automation
# ==========================================
FROM mcr.microsoft.com/playwright:v1.57.0-jammy

# Ejecutamos como root para simplificar permisos
USER root

# Directorio de trabajo
WORKDIR /app

# Copiar solo package.json primero para aprovechar cache de Docker
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del proyecto
COPY . .

# Crear directorios de resultados Allure
RUN mkdir -p /app/allure-results /app/allure-report

# Comando por defecto
CMD ["npx", "playwright", "test"]
