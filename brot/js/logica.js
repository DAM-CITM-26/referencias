// LÓGICA · funciones puras: reciben datos y devuelven datos.
// No tocan el estado ni la pantalla, y nunca modifican lo que reciben.
// En React van a src/utils/ (con export delante), y en el Sprint 3
// tres de ellas llevan sus tests con Vitest.

// Busca en el nombre y en los ingredientes, sin distinguir mayúsculas
function buscarRecetas(recetas, texto) {
  const buscado = texto.trim().toLowerCase()
  if (buscado === '') return recetas
  return recetas.filter(
    (receta) =>
      receta.nombre.toLowerCase().includes(buscado) ||
      receta.ingredientes.some((item) => item.ingrediente.toLowerCase().includes(buscado)),
  )
}

// 'Todos' no filtra
function filtrarPorTipo(recetas, tipo) {
  if (tipo === 'Todos') return recetas
  return recetas.filter((receta) => receta.tipo === tipo)
}

// Nutrientes de una receta: la suma de cada ingrediente según sus gramos
function nutrientesDeReceta(receta, tabla) {
  const total = { proteinas: 0, hierro: 0, calcio: 0, fibra: 0 }
  for (const item of receta.ingredientes) {
    const por100 = tabla[item.ingrediente]
    for (const clave in total) total[clave] += (por100[clave] * item.gramos) / 100
  }
  return total
}

// Objetivo de la semana: lo de un día por 7, según la situación
function objetivoSemanal(datos, necesidades) {
  const dia = datos.situacion === 'Embarazo o lactancia' ? necesidades.embarazo : necesidades.base
  const semana = {}
  for (const clave in dia) semana[clave] = dia[clave] * 7
  return semana
}

// Lo comido en la semana: la suma de los nutrientes de cada receta registrada
function balanceSemanal(registros, recetas, tabla) {
  const total = { proteinas: 0, hierro: 0, calcio: 0, fibra: 0 }
  for (const registro of registros) {
    const receta = recetas.find((r) => r.id === registro.recetaId)
    const nutrientes = nutrientesDeReceta(receta, tabla)
    for (const clave in total) total[clave] += nutrientes[clave]
  }
  return total
}

// Porcentaje del objetivo, como mucho 100
function porcentaje(valor, objetivo) {
  return Math.min(100, Math.round((valor / objetivo) * 100))
}
