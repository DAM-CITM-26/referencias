// LÓGICA · funciones puras: reciben datos y devuelven datos.
// No tocan el estado ni la pantalla, y nunca modifican lo que reciben.
// En React van a src/utils/ (con export delante), y en el Sprint 3
// tres de ellas llevan sus tests con Vitest.

// Días que faltan de hoy a una fecha (negativo si ya pasó). Las fechas, como 'AAAA-MM-DD'.
function diasHasta(fecha, hoy) {
  const unDia = 24 * 60 * 60 * 1000
  return Math.round((new Date(fecha) - new Date(hoy)) / unDia)
}

// '2026-11-21' → '21/11'
function fechaCorta(fecha) {
  const [, mes, dia] = fecha.split('-')
  return `${dia}/${mes}`
}

// Válido · Por caducar (30 días o menos) · Caducado
function estadoDocumento(documento, hoy) {
  const dias = diasHasta(documento.caduca, hoy)
  if (dias < 0) return 'Caducado'
  if (dias <= 30) return 'Por caducar'
  return 'Válido'
}

// 'Todos' no filtra
function filtrarPorEstado(documentos, estado, hoy) {
  if (estado === 'Todos') return documentos
  return documentos.filter((documento) => estadoDocumento(documento, hoy) === estado)
}

// Un proyecto está en regla si ningún documento de sus trabajadores está caducado
function proyectoEnRegla(proyecto, documentos, hoy) {
  const suyos = documentos.filter((d) => proyecto.trabajadores.includes(d.trabajadorId))
  return suyos.every((d) => estadoDocumento(d, hoy) !== 'Caducado')
}

function documentosDe(documentos, trabajadorId) {
  return documentos.filter((d) => d.trabajadorId === trabajadorId)
}
