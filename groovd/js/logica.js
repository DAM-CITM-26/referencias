// LÓGICA · funciones puras: reciben datos y devuelven datos.
// No tocan el estado ni la pantalla, y nunca modifican lo que reciben.
// En React van a src/utils/ (con export delante), y en el Sprint 3
// tres de ellas llevan sus tests con Vitest.

// Copia ordenada de más a menos escuchas, y solo las n primeras
function masEscuchados(contenidos, n) {
  return [...contenidos].sort((a, b) => b.escuchasSemana - a.escuchasSemana).slice(0, n)
}

// 'Todo' no filtra
function filtrarPorTipo(contenidos, tipo) {
  if (tipo === 'Todo') return contenidos
  return contenidos.filter((contenido) => contenido.tipo === tipo)
}

// Texto en el título o en el artista (en la app real: la búsqueda de iTunes)
function buscarContenidos(contenidos, texto) {
  const buscado = texto.trim().toLowerCase()
  if (buscado === '') return []
  return contenidos.filter((c) => c.titulo.toLowerCase().includes(buscado) || c.artista.toLowerCase().includes(buscado))
}

// Devuelve una lista NUEVA: quita el id si estaba, lo añade si no
function alternar(lista, id) {
  if (lista.includes(id)) return lista.filter((x) => x !== id)
  return [...lista, id]
}

// Una reseña solo se puede guardar con puntuación
function resenaValida(borrador) {
  return borrador.puntuacion >= 1 && borrador.puntuacion <= 5
}

// 182000 → '182 mil'
function escuchasCortas(numero) {
  return `${Math.round(numero / 1000)} mil`
}
