// ================================
// Módulos Node.js
// ================================
const fs = require('fs');
const path = require('path');

// ================================
// Archivo de control de versión APK
// ================================
// Persiste la última versión utilizada
// para evitar colisiones automáticas
const versionFile = path.join(__dirname, '.apkVersion');

// ================================
// Generador de versión incremental
// ================================
// Ejemplo:
// 15 -> 16.0
// 16 -> 17.0
function getNextVersion() {
  let current = 15;

  if (fs.existsSync(versionFile)) {
    const value = parseInt(
      fs.readFileSync(versionFile, 'utf8'),
      10
    );

    if (!isNaN(value)) {
      current = value;
    }
  }

  const next = current + 1;

  // Persistencia local
  fs.writeFileSync(versionFile, String(next));

  return `${next}.0`;
}

// ================================
// Exportación de datos de prueba
// ================================
module.exports = {

  // ================================
  // Datos creación aplicación
  // ================================
  nuevaAppValida: {

    nombre: 'APPTEST27IVAN',

    // Evita colisiones
    codigo: `9.${Date.now()}`,

    codigoDuplicado: '1.0.0',

    tipo: '10',
    categoria: '14',

    descripcion: 'test automatizado app',
  },

  // ================================
  // Búsquedas positivas
  // ================================
  buscarAppData: {
    tipo: '10',
    categoria: '14',
    estado: '1',
  },

  // ================================
  // Casos negativos búsqueda
  // ================================
  buscarAppNegativos: {
    tipoErroneo: '11',
    categoriaErronea: '16',
    estadoErroneo: '0',
    codigoInexistente: 'ZZZ9999',
    versionesImpossible: '999',
  },

  // ================================
  // Campañas
  // ================================
  campananuevo: {
    nombre: `CAMPAÑA_${Date.now()}`,

    aplicacionValue: '119',

    dispositivoSerie: 'Q29500039478',
  },

  // ================================
  // Búsqueda campañas
  // ================================
  buscarcampana: {

    nombrecampana: 'campañanoexiste',

    aplicacion: '119',

    idversionaplicacion: '245',

    estado: '',

    NomnbreDispositivo: 'Q29500039478',

    dispositivoSerie: 'serieerronea',

    fechaDesde: '22/12/2025',

    fechaHasta: '22/12/2025',
  },

  // ================================
  // Upload APK
  // ================================
  subirApk: {

    codigoApp: 'flx1ef',

    // versión dinámica
    version: getNextVersion(),

    descripcion: 'Carga automatizada APK FLEX101',

    nombreApp: 'APK_AUTOMATION',
  },

  // ================================
  // Caso negativo versión duplicada
  // ================================
  versionDuplicada: {

    codigoApp: 'flx1ef',

    version: '370.0',

    descripcion: 'Validación versión duplicada',

    breveDescripcion: 'Bre',

    nombreAppDuplicada: 'APK_DUPLICADA',
  },

};