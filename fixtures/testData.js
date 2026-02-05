const fs = require('fs');
const path = require('path');

const versionFile = path.join(__dirname, '.apkVersion');

function getNextVersion() {
  let current = 15;

  if (fs.existsSync(versionFile)) {
    const value = parseInt(fs.readFileSync(versionFile, 'utf8'), 10);
    if (!isNaN(value)) current = value;
  }

  const next = current + 1;
  fs.writeFileSync(versionFile, String(next));

  return `${next}.0`;
}

module.exports = {
  credentials: {
    user: process.env.TMS_USER || 'cypress',
    pass: process.env.TMS_PASS || 'Reso0911****'
  },

  // Datos para crear nueva aplicación válida
  nuevaAppValida: {
    nombre: 'APPTEST27IVAN',
    codigo: `9.${Date.now()}`,
    CodigoDuplicado: `1.0.0`,
    tipo: '10',        // APKs
    categoria: '14',   // Retail
    descripcion: 'test 27'
  },

  // Caso POSITIVO comprobado busqueda Apliacion 
  buscarAppData: {
    tipo: '10',        // APKs
    categoria: '14',   // Retail
    estado: '1'        // Habilitado
  },

  // Casos NEGATIVOS filtro busqueda
  buscarAppNegativos: {
    tipoErroneo: '11',          // Configurations
    categoriaErronea: '16',     // Hotel
    estadoErroneo: '0',         // Deshabilitado
    codigoInexistente: 'ZZZ9999',
    versionesImpossible: '999'
  },

  // test data creacion campana
  campananuevo: {
    nombre: 'CAMPAÑATEST12012026IVAN',
    aplicacionValue: '119',
    dispositivoSerie: 'Q29500039478'
  },

  // test data busqueda campana
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

  // -------- APK UPLOAD (NO se cambia la estructura) --------
  subirApk: {
    codigoApp: 'flx1ef',
    version: getNextVersion(),
    descripcion: 'Carga automatizada APK FLEX101',
    nombreApp:'1.0.0emifede'
  },

VersionDuplicada: {
  codigoApp: 'flx1ef',
  version: '370.0',
  descripcion: 'Carga automatizada APK FLEX101',
  breveDescripcion: 'Bre',
  nombreAppDuplicada: '1.0.0emifede'
}


};
