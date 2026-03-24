// ================================
// Módulos Node.js
// ================================
const fs = require('fs');
const path = require('path');

// ================================
// Archivo de control de versión APK
// ================================
// Este archivo persiste la última versión usada
// para evitar colisiones en cargas automatizadas
const versionFile = path.join(__dirname, '.apkVersion');

// ================================
// Generador de versión incremental
// ================================
// Lee la versión actual desde archivo local,
// incrementa en +1 y la persiste nuevamente.
// Retorna formato: "X.0"
function getNextVersion() {
  let current = 15; // valor base inicial

  if (fs.existsSync(versionFile)) {
    const value = parseInt(fs.readFileSync(versionFile, 'utf8'), 10);
    if (!isNaN(value)) current = value;
  }

  const next = current + 1;

  // Persistencia de la nueva versión
  fs.writeFileSync(versionFile, String(next));

  return `${next}.0`;
}

// ================================
// Exportación de datos de prueba
// ================================
module.exports = {

  // ================================
  // 🔐 Credenciales (deprecadas progresivamente)
  // ================================
  // ⚠️ Mantiene compatibilidad con código existente
  // ⚠️ Fuente: variables de entorno (.env / Jenkins / Docker)
  // ❗ Recomendación: migrar uso directo a process.env en global-setup
  credentials: {
    user: process.env.USER_ADMIN || '',
    pass: process.env.PASSWORD_ADMIN || ''
  },

  // ================================
  // 📦 Datos para creación de aplicación
  // ================================
  nuevaAppValida: {
    nombre: 'APPTEST27IVAN',

    // Código dinámico para evitar duplicados
    codigo: `9.${Date.now()}`,

    CodigoDuplicado: `1.0.0`,
    tipo: '10',        // APKs
    categoria: '14',   // Retail
    descripcion: 'test 27'
  },

  // ================================
  // 🔍 Datos para búsqueda positiva
  // ================================
  buscarAppData: {
    tipo: '10',
    categoria: '14',
    estado: '1' // Habilitado
  },

  // ================================
  // ❌ Casos negativos de búsqueda
  // ================================
  buscarAppNegativos: {
    tipoErroneo: '11',
    categoriaErronea: '16',
    estadoErroneo: '0',
    codigoInexistente: 'ZZZ9999',
    versionesImpossible: '999'
  },

  // ================================
  // 📣 Datos para creación de campaña
  // ================================
  campananuevo: {
    nombre: 'CAMPAÑATEST12012026IVAN',
    aplicacionValue: '119',
    dispositivoSerie: 'Q29500039478'
  },

  // ================================
  // 🔎 Datos para búsqueda de campaña
  // ================================
  buscarcampana: {
    nombrecampana: 'campañanoexiste',
    aplicacion: '119',
    idversionaplicacion: '245',
    Estado: '',
    NomnbreDispositivo: 'Q29500039478',
    dispositivoSerie: 'serieerronea',
    fechaDesde: '22/12/20225',
    fechaHasta: '22/12/2025'
  },

  // ================================
  // 📲 APK Upload (flujo dinámico)
  // ================================
  subirApk: {
    codigoApp: 'flx1ef',

    // Generación automática de versión única
    version: getNextVersion(),

    descripcion: 'Carga automatizada APK FLEX101',
    nombreApp: '1.0.0emifede'
  },

  // ================================
  // ⚠️ Caso negativo: versión duplicada
  // ================================
  VersionDuplicada: {
    codigoApp: 'flx1ef',
    version: '370.0',
    descripcion: 'Carga automatizada APK FLEX101',
    breveDescripcion: 'Bre',
    nombreAppDuplicada: '1.0.0emifede'
  }

};