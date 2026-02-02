# ===============================
# Jenkins LTS - Orquestador CI
# ===============================
FROM jenkins/jenkins:lts

# Ejecutar como root solo para instalar dependencias
USER root

# -------------------------------
# Dependencias mínimas necesarias
# -------------------------------
RUN apt-get update && apt-get install -y \
    git \
    curl \
    ca-certificates \
    gnupg \
    lsb-release \
    && rm -rf /var/lib/apt/lists/*

# -------------------------------
# Instalar Docker CLI
# -------------------------------
RUN curl -fsSL https://get.docker.com | sh

# Permitir que Jenkins use Docker
RUN usermod -aG docker jenkins

# Volver a usuario Jenkins (NO root)
USER jenkins

# Puertos Jenkins
EXPOSE 8080 50000

# EntryPoint estándar
ENTRYPOINT ["/usr/bin/tini", "--", "/usr/local/bin/jenkins.sh"]
