// LÓGICA · funciones puras: reciben datos y devuelven datos.
// No tocan el estado ni la pantalla, y nunca modifican lo que reciben.
// En React van a src/utils/ (con export delante), y en el Sprint 3
// tres de ellas llevan sus tests con Vitest.

// Si no hay ningún interés elegido, se ven todos los talleres
function filtrarPorIntereses(talleres, elegidos) {
  if (elegidos.length === 0) return talleres
  return talleres.filter((taller) => taller.intereses.some((interes) => elegidos.includes(interes)))
}

// Devuelve una lista NUEVA: quita el elemento si estaba, lo añade si no (intereses, guardados…)
function alternar(lista, elemento) {
  if (lista.includes(elemento)) return lista.filter((e) => e !== elemento)
  return [...lista, elemento]
}

// Plazas libres: el aforo, menos las reservas que ya tenía y las que he hecho yo
function plazasLibres(taller, misReservas) {
  let mias = 0
  for (const reserva of misReservas) {
    if (reserva.tallerId === taller.id) mias += reserva.plazas
  }
  return taller.aforo - taller.reservas - mias
}

// Texto en el título · 'Todas' y 'Cualquiera' no filtran
function buscarTalleres(talleres, { texto, categoria, precioMax }) {
  const buscado = texto.trim().toLowerCase()
  return talleres.filter(
    (taller) =>
      taller.titulo.toLowerCase().includes(buscado) &&
      (categoria === 'Todas' || taller.categoria === categoria) &&
      (precioMax === 'Cualquiera' || taller.precio <= Number(precioMax)),
  )
}

// '2026-11-21' → '21/11'
function fechaCorta(fecha) {
  const [, mes, dia] = fecha.split('-')
  return `${dia}/${mes}`
}
