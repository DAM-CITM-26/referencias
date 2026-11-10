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

const TAREAS = [
  { id: 1, titulo: 'Entregar la memoria del proyecto', categoria: 'Clase', fecha: dentroDeDias(0), horaInicio: '09:00', horaFin: '10:30', hecha: false },
  { id: 2, titulo: 'Reunión con el equipo', categoria: 'Trabajo', fecha: dentroDeDias(0), horaInicio: '12:00', horaFin: '13:00', hecha: true },
  { id: 3, titulo: 'Gimnasio', categoria: 'Personal', fecha: dentroDeDias(0), horaInicio: '19:00', horaFin: '20:00', hecha: false },
  { id: 4, titulo: 'Comprar el regalo de Aina', categoria: 'Personal', fecha: dentroDeDias(0), horaInicio: '17:30', horaFin: '18:00', hecha: false },
  { id: 5, titulo: 'Estudiar para el examen', categoria: 'Clase', fecha: dentroDeDias(1), horaInicio: '16:00', horaFin: '18:00', hecha: false },
  { id: 6, titulo: 'Revisar el presupuesto', categoria: 'Trabajo', fecha: dentroDeDias(2), horaInicio: '10:00', horaFin: '11:00', hecha: false },
  { id: 7, titulo: 'Cena con la familia', categoria: 'Personal', fecha: dentroDeDias(-1), horaInicio: '21:00', horaFin: '23:00', hecha: true },
]

// Festivos de ejemplo (en la app real llegan de Nager.Date)
const FESTIVOS = [
  { fecha: '2026-11-01', nombre: 'Todos los Santos' },
  { fecha: '2026-12-06', nombre: 'Día de la Constitución' },
  { fecha: '2026-12-08', nombre: 'Inmaculada Concepción' },
  { fecha: '2026-12-25', nombre: 'Navidad' },
  { fecha: '2026-12-26', nombre: 'Sant Esteve' },
  { fecha: '2027-01-01', nombre: 'Año Nuevo' },
  { fecha: '2027-01-06', nombre: 'Reyes' },
]
