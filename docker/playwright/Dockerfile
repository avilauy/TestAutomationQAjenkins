# ==========================================
# Playwright Executor - TMS Automation
# ==========================================
FROM mcr.microsoft.com/playwright:v1.57.0-jammy

# Root solo para setup
USER root

# Dependencias mínimas adicionales (si se requieren en el futuro)
RUN apt-get update && apt-get install -y \
    ca-certificates \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Directorio de trabajo
WORKDIR /app

# Copiar solo manifests primero (cache eficiente)
COPY package*.json ./

# Instalar dependencias EXACTAS (CI-friendly)
RUN npm ci

# Copiar el resto del proyecto
COPY . .

# Directorio de resultados Allure
RUN mkdir -p /app/allure-results \
    && chown -R pwuser:pwuser /app

# Seguridad: usuario no root
USER pwuser

# Comando por defecto (Jenkins lo ejecuta)
CMD ["npx", "playwright", "test"]
