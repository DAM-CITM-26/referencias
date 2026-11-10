// LÓGICA · funciones puras: reciben datos y devuelven datos.
// No tocan el estado ni la pantalla, y nunca modifican lo que reciben.
// En React van a src/utils/ (con export delante), y en el Sprint 3
// tres de ellas llevan sus tests con Vitest.

// Media de las notas, con un decimal (0 si no tiene reseñas)
function notaMedia(resenas) {
  if (resenas.length === 0) return 0
  let suma = 0
  for (const resena of resenas) suma += resena.nota
  return Math.round((suma / resenas.length) * 10) / 10
}

// ¿Lo ha reseñado alguno de los Foodies que sigo?
function resenadoPorSeguidos(restaurante, siguiendo) {
  return restaurante.resenas.some((resena) => siguiendo.includes(resena.foodieId))
}

// Texto en el nombre o el barrio · 'Todas' no filtra · vista 'Siguiendo' solo deja los de los Foodies que sigo
function filtrarRestaurantes(restaurantes, { texto, cocina, vista }, siguiendo) {
  const buscado = texto.trim().toLowerCase()
  return restaurantes.filter(
    (restaurante) =>
      (restaurante.nombre.toLowerCase().includes(buscado) || restaurante.barrio.toLowerCase().includes(buscado)) &&
      (cocina === 'Todas' || restaurante.cocina === cocina) &&
      (vista === 'Todos' || resenadoPorSeguidos(restaurante, siguiendo)),
  )
}

// Las cocinas que aparecen, sin repetir
function cocinasDe(restaurantes) {
  const cocinas = []
  for (const restaurante of restaurantes) {
    if (!cocinas.includes(restaurante.cocina)) cocinas.push(restaurante.cocina)
  }
  return cocinas
}

// Devuelve una lista NUEVA: quita el id si estaba, lo añade si no
function alternar(lista, id) {
  if (lista.includes(id)) return lista.filter((x) => x !== id)
  return [...lista, id]
}

// Las reseñas de un restaurante, con las mías (valoraciones del usuario) añadidas
function resenasCon(restaurante, misValoraciones) {
  const mia = misValoraciones.find((v) => v.restauranteId === restaurante.id)
  return mia ? [...restaurante.resenas, { foodieId: 0, nota: mia.nota, texto: 'Tu valoración' }] : restaurante.resenas
}
