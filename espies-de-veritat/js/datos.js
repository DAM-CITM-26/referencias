// DATOS · escritos en el código para que la referencia funcione sin servidor.
// En React (Sprint 2) no se copian: llegan de la API, desde src/data/api.js,
// y la pantalla muestra «cargando», un error con «Reintentar» o «sin resultados».
// Cada elemento sigue el modelo de docs/datos.md.

// En la referencia, las fechas de ejemplo se calculan a partir de hoy para que la demo
// siempre tenga sentido. En vuestra app, cada elemento guarda su fecha fija (AAAA-MM-DD).
function dentroDeDias(dias) {
  const fecha = new Date()
  fecha.setDate(fecha.getDate() + dias)
  return fecha.toISOString().slice(0, 10)
}

const PRODUCTOS = [
  { id: 1, nombre: 'Leche de avena', cantidad: 1, unidad: 'l', caduca: dentroDeDias(2) },
  { id: 2, nombre: 'Huevos', cantidad: 6, unidad: 'ud', caduca: dentroDeDias(9) },
  { id: 3, nombre: 'Espinacas', cantidad: 200, unidad: 'g', caduca: dentroDeDias(1) },
  { id: 4, nombre: 'Yogur natural', cantidad: 4, unidad: 'ud', caduca: dentroDeDias(-1) },
  { id: 5, nombre: 'Tomates', cantidad: 5, unidad: 'ud', caduca: dentroDeDias(5) },
  { id: 6, nombre: 'Queso fresco', cantidad: 250, unidad: 'g', caduca: dentroDeDias(3) },
  { id: 7, nombre: 'Pollo', cantidad: 400, unidad: 'g', caduca: dentroDeDias(2) },
  { id: 8, nombre: 'Zanahorias', cantidad: 1, unidad: 'kg', caduca: dentroDeDias(14) },
]

// Recetas de ejemplo (en la app real llegan de TheMealDB al buscar por ingrediente)
const RECETAS = [
  { id: 1, nombre: 'Tortilla de espinacas', ingredientes: ['Huevos', 'Espinacas', 'Cebolla'], minutos: 15 },
  { id: 2, nombre: 'Ensalada caprese', ingredientes: ['Tomates', 'Queso fresco', 'Albahaca'], minutos: 10 },
  { id: 3, nombre: 'Pollo al curry', ingredientes: ['Pollo', 'Cebolla', 'Leche de coco', 'Arroz'], minutos: 35 },
  { id: 4, nombre: 'Crema de zanahoria', ingredientes: ['Zanahorias', 'Cebolla', 'Patata'], minutos: 30 },
  { id: 5, nombre: 'Huevos rotos con tomate', ingredientes: ['Huevos', 'Tomates', 'Patata'], minutos: 25 },
  { id: 6, nombre: 'Batido de avena', ingredientes: ['Leche de avena', 'Plátano'], minutos: 5 },
]
