// LÓGICA · funciones puras: reciben datos y devuelven datos.
// No tocan el estado ni la pantalla, y nunca modifican lo que reciben.
// En React van a src/utils/ (con export delante), y en el Sprint 3
// tres de ellas llevan sus tests con Vitest.

// 'Todas' y 'Todos' no filtran
function filtrarJuegos(juegos, { plataforma, genero }) {
  return juegos.filter(
    (juego) =>
      (plataforma === 'Todas' || juego.plataformas.includes(plataforma)) &&
      (genero === 'Todos' || juego.genero === genero),
  )
}

// Devuelve una copia, de más a menos tendencia
function ordenarPorTendencia(juegos) {
  return [...juegos].sort((a, b) => b.tendencia - a.tendencia)
}

// Buscar dentro del catálogo ya cargado
function buscarJuegos(juegos, texto) {
  const buscado = texto.trim().toLowerCase()
  return juegos.filter((juego) => juego.titulo.toLowerCase().includes(buscado))
}

// Devuelve una biblioteca NUEVA con el juego actualizado; si no estaba, lo añade (sin repetirlo)
function actualizarEntrada(biblioteca, juegoId, cambios) {
  const actual = biblioteca.find((e) => e.juegoId === juegoId) || { juegoId, estado: 'Quiero jugar', valoracion: 0, resena: '' }
  const sinElJuego = biblioteca.filter((e) => e.juegoId !== juegoId)
  return [...sinElJuego, { ...actual, ...cambios }]
}
