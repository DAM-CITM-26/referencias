// LÓGICA · funciones puras: reciben datos y devuelven datos.
// No tocan el estado ni la pantalla, y nunca modifican lo que reciben.
// Las cuatro primeras son las de clase (utils/filtros.js y FichaJuego.jsx), sin cambios.
// En React van a src/utils/ (con export delante), y en el Sprint 3
// tres de ellas llevan sus tests con Vitest.

// personas = 0 significa «cualquier número»: no filtra
const FILTROS_INICIALES = { texto: '', personas: 0 }

function coincideBusqueda(juego, texto) {
  return juego.nombre.toLowerCase().includes(texto.toLowerCase())
}

// «2-4» → { min: 2, max: 4 } · «2» → { min: 2, max: 2 }
function rangoJugadores(texto) {
  const partes = texto.split('-') // «2-4» → ['2', '4'] · «2» → ['2']
  const min = Number(partes[0])
  const max = Number(partes[partes.length - 1])
  return { min, max }
}

function admiteJugadores(juego, personas) {
  if (personas === 0) return true
  const { min, max } = rangoJugadores(juego.jugadores)
  return personas >= min && personas <= max
}

// En clase vivía dentro de FichaJuego; aquí pasa a ser lógica compartida
function categorizarDuracion(duracion) {
  if (duracion <= 20) {
    return 'Partida rápida'
  } else if (duracion <= 40) {
    return 'Partida media'
  } else {
    return 'Partida larga'
  }
}

// ── Nuevas ──

// Chips de Inicio: 'Todas' no filtra
function filtrarPorDuracion(juegos, categoria) {
  if (categoria === 'Todas') return juegos
  return juegos.filter((juego) => categorizarDuracion(juego.duracion) === categoria)
}

// Devuelve una copia ordenada (nunca modifica el array original)
function ordenarJuegos(juegos, criterio) {
  const copia = [...juegos]
  if (criterio === 'nombre') return copia.sort((a, b) => a.nombre.localeCompare(b.nombre))
  if (criterio === 'duracion') return copia.sort((a, b) => a.duracion - b.duracion)
  return copia.sort((a, b) => b.valoracion - a.valoracion)
}

// Los juegos de una página (la paginación de clase, como función)
function juegosDePagina(juegos, pagina, porPagina) {
  const inicio = (pagina - 1) * porPagina
  return juegos.slice(inicio, inicio + porPagina)
}

function totalPaginas(juegos, porPagina) {
  return Math.max(1, Math.ceil(juegos.length / porPagina))
}

// ── «Mi ludoteca» ──
// Cada entrada: { juegoId, partidas: [{ id, fecha, personas, nota }] }

function buscarEntrada(ludoteca, juegoId) {
  return ludoteca.find((entrada) => entrada.juegoId === juegoId)
}

function anadirJuego(ludoteca, juegoId) {
  if (buscarEntrada(ludoteca, juegoId)) return ludoteca // no se duplica
  return [...ludoteca, { juegoId, partidas: [] }]
}

function quitarJuego(ludoteca, juegoId) {
  return ludoteca.filter((entrada) => entrada.juegoId !== juegoId)
}

function registrarPartida(ludoteca, juegoId, partida) {
  const conJuego = anadirJuego(ludoteca, juegoId)
  return conJuego.map((entrada) =>
    entrada.juegoId === juegoId ? { ...entrada, partidas: [...entrada.partidas, partida] } : entrada,
  )
}

// Media de las notas de las partidas, con un decimal (0 si no hay partidas)
function notaMedia(partidas) {
  if (partidas.length === 0) return 0
  let suma = 0
  for (const partida of partidas) suma += partida.nota
  return Math.round((suma / partidas.length) * 10) / 10
}
