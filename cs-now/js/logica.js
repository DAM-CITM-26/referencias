// LÓGICA · funciones puras: reciben datos y devuelven datos.
// No tocan el estado ni la pantalla, y nunca modifican lo que reciben.
// En React van a src/utils/ (con export delante), y en el Sprint 3
// tres de ellas llevan sus tests con Vitest.

// 'Todos' no filtra
function filtrarPorTorneo(partidos, torneo) {
  if (torneo === 'Todos') return partidos
  return partidos.filter((partido) => partido.torneo === torneo)
}

// Los torneos que aparecen en la lista, sin repetir
function torneosDe(partidos) {
  const torneos = []
  for (const partido of partidos) {
    if (!torneos.includes(partido.torneo)) torneos.push(partido.torneo)
  }
  return torneos
}

// El id del equipo que va ganando, o null si van empatados o no ha empezado
function quienGana(partido) {
  if (partido.marcadorA > partido.marcadorB) return partido.equipoA
  if (partido.marcadorB > partido.marcadorA) return partido.equipoB
  return null
}

// Copia ordenada de más a menos puntos
function ordenarRanking(equipos) {
  return [...equipos].sort((a, b) => b.puntos - a.puntos)
}

// Devuelve una lista NUEVA: sigue o deja de seguir; nunca repite un equipo
function alternarFavorito(favoritos, equipoId) {
  if (favoritos.includes(equipoId)) return favoritos.filter((id) => id !== equipoId)
  return [...favoritos, equipoId]
}

// ¿Juega alguno de mis equipos?
function juegaFavorito(partido, favoritos) {
  return favoritos.includes(partido.equipoA) || favoritos.includes(partido.equipoB)
}
