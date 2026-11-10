// LÓGICA · funciones puras: reciben datos y devuelven datos.
// No tocan el estado ni la pantalla, y nunca modifican lo que reciben.
// En React van a src/utils/ (con export delante), y en el Sprint 3
// tres de ellas llevan sus tests con Vitest.

// El precio más bajo entre todos los supermercados que lo tienen
function precioMinimo(producto) {
  return Math.min(...Object.values(producto.precios))
}

// El nombre del supermercado más barato para ese producto
function superMasBarato(producto) {
  const minimo = precioMinimo(producto)
  return Object.keys(producto.precios).find((nombre) => producto.precios[nombre] === minimo)
}

// Precio por kg, por l o por unidad, con dos decimales
function precioPorUnidad(producto) {
  return Math.round((precioMinimo(producto) / producto.cantidad) * 100) / 100
}

// 'Todos' y 'Cualquiera' no filtran. maximo es un número de euros o 'Cualquiera'.
function filtrarProductos(productos, { supermercado, maximo }) {
  return productos.filter(
    (producto) =>
      (supermercado === 'Todos' || producto.precios[supermercado] !== undefined) &&
      (maximo === 'Cualquiera' || precioMinimo(producto) <= maximo),
  )
}

// Devuelve una copia ordenada: 'barato', 'caro' o 'nombre'
function ordenarProductos(productos, criterio) {
  const copia = [...productos]
  if (criterio === 'nombre') return copia.sort((a, b) => a.nombre.localeCompare(b.nombre))
  if (criterio === 'caro') return copia.sort((a, b) => precioMinimo(b) - precioMinimo(a))
  return copia.sort((a, b) => precioMinimo(a) - precioMinimo(b))
}

function buscarProductos(productos, texto) {
  const buscado = texto.trim().toLowerCase()
  if (buscado === '') return []
  return productos.filter((p) => p.nombre.toLowerCase().includes(buscado))
}

// Devuelve una cesta NUEVA con la cantidad cambiada (si llega a 0, se quita)
function cambiarCantidad(cesta, productoId, cambio) {
  const linea = cesta.find((l) => l.productoId === productoId)
  const nueva = (linea ? linea.cantidad : 0) + cambio
  const sinLinea = cesta.filter((l) => l.productoId !== productoId)
  if (nueva <= 0) return sinLinea
  return [...sinLinea, { productoId, cantidad: nueva }]
}

// Total de la cesta en cada supermercado (solo los que tienen todos los productos)
function totalesPorSuper(cesta, productos, supermercados) {
  const totales = {}
  for (const nombre of supermercados) {
    let total = 0
    let lotiene = true
    for (const linea of cesta) {
      const precio = productos.find((p) => p.id === linea.productoId).precios[nombre]
      if (precio === undefined) lotiene = false
      else total += precio * linea.cantidad
    }
    if (lotiene) totales[nombre] = Math.round(total * 100) / 100
  }
  return totales
}

// 1.5 → '1,50 €'
function euros(numero) {
  return numero.toFixed(2).replace('.', ',') + ' €'
}
