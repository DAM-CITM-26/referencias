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

// Copia ordenada: primero lo que caduca antes
function ordenarPorCaducidad(productos) {
  return [...productos].sort((a, b) => a.caduca.localeCompare(b.caduca))
}

// Caducado · Caduca pronto (3 días o menos) · Bien
function estadoCaducidad(dias) {
  if (dias < 0) return 'Caducado'
  if (dias <= 3) return 'Caduca pronto'
  return 'Bien'
}

// Cuántos productos caducan en los próximos 3 días (sin contar los ya caducados)
function cuantosCaducanPronto(productos, hoy) {
  return productos.filter((p) => estadoCaducidad(diasHasta(p.caduca, hoy)) === 'Caduca pronto').length
}

// Devuelve una lista NUEVA con el producto añadido / quitado
function anadirProducto(productos, producto) {
  return [...productos, producto]
}
function quitarProducto(productos, id) {
  return productos.filter((p) => p.id !== id)
}

// ¿Tengo este ingrediente en la nevera? (sin distinguir mayúsculas)
function tengoIngrediente(productos, ingrediente) {
  return productos.some((p) => p.nombre.toLowerCase() === ingrediente.toLowerCase())
}

// Recetas que llevan el ingrediente buscado
function recetasConIngrediente(recetas, ingrediente) {
  const buscado = ingrediente.trim().toLowerCase()
  if (buscado === '') return []
  return recetas.filter((r) => r.ingredientes.some((i) => i.toLowerCase().includes(buscado)))
}

// Lo que falta para una receta: los ingredientes que no están en la nevera
function ingredientesQueFaltan(receta, productos) {
  return receta.ingredientes.filter((i) => !tengoIngrediente(productos, i))
}
