// LÓGICA · funciones puras: reciben datos y devuelven datos.
// No tocan el estado ni la pantalla, y nunca modifican lo que reciben.
// En React van a src/utils/ (con export delante), y en el Sprint 3
// tres de ellas llevan sus tests con Vitest.

// Las obras de un universo, en el orden en que las guarda el universo
function obrasDeUniverso(obras, universo) {
  return universo.obras.map((id) => obras.find((obra) => obra.id === id))
}

// 'Todos' no filtra
function filtrarPorFormato(obras, formato) {
  if (formato === 'Todos') return obras
  return obras.filter((obra) => obra.formato === formato)
}

// Texto en el título (en la app real: Open Library para libros, TVMaze para series)
function buscarObras(obras, texto) {
  const buscado = texto.trim().toLowerCase()
  if (buscado === '') return []
  return obras.filter((obra) => obra.titulo.toLowerCase().includes(buscado))
}

// El estado de una obra en mi biblioteca ('Sin añadir' si no está)
function estadoDeObra(biblioteca, obraId) {
  const entrada = biblioteca.find((e) => e.obraId === obraId)
  return entrada ? entrada.estado : 'Sin añadir'
}

// Devuelve una biblioteca NUEVA con la obra en ese estado (la añade si no estaba)
function cambiarEstado(biblioteca, obraId, estado) {
  const sinLaObra = biblioteca.filter((e) => e.obraId !== obraId)
  return [...sinLaObra, { obraId, estado }]
}

// Una reseña con spoiler solo se ve sin aviso si la obra ya está terminada
function puedeVerSinAviso(resena, estadoObra) {
  return !resena.spoiler || estadoObra === 'Terminada'
}
