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

const TRABAJADORES = [
  { id: 1, nombre: 'Marta Soler', puesto: 'Podadora en altura' },
  { id: 2, nombre: 'Jordi Pons', puesto: 'Jefe de equipo' },
  { id: 3, nombre: 'Laia Ferrer', puesto: 'Técnica forestal' },
  { id: 4, nombre: 'Pau Roig', puesto: 'Operario' },
]

const DOCUMENTOS = [
  { id: 1, nombre: 'Curso de trabajos en altura', tipo: 'Formación', trabajadorId: 1, caduca: dentroDeDias(120) },
  { id: 2, nombre: 'Reconocimiento médico', tipo: 'Salud', trabajadorId: 1, caduca: dentroDeDias(12) },
  { id: 3, nombre: 'Carnet de motosierra', tipo: 'Acreditación', trabajadorId: 2, caduca: dentroDeDias(-5) },
  { id: 4, nombre: 'Prevención de riesgos', tipo: 'Formación', trabajadorId: 2, caduca: dentroDeDias(200) },
  { id: 5, nombre: 'Reconocimiento médico', tipo: 'Salud', trabajadorId: 3, caduca: dentroDeDias(25) },
  { id: 6, nombre: 'Primeros auxilios', tipo: 'Formación', trabajadorId: 3, caduca: dentroDeDias(-30) },
  { id: 7, nombre: 'Carnet de plataforma elevadora', tipo: 'Acreditación', trabajadorId: 4, caduca: dentroDeDias(60) },
  { id: 8, nombre: 'Reconocimiento médico', tipo: 'Salud', trabajadorId: 4, caduca: dentroDeDias(3) },
  { id: 9, nombre: 'Curso de trabajos en altura', tipo: 'Formación', trabajadorId: 3, caduca: dentroDeDias(310) },
]

const PROYECTOS = [
  { id: 1, nombre: 'Poda del Parc de la Ciutadella', cliente: 'Ajuntament de Barcelona', trabajadores: [1, 2] },
  { id: 2, nombre: 'Tala de pinos secos en Collserola', cliente: 'Parc Natural', trabajadores: [2, 3, 4] },
  { id: 3, nombre: 'Revisión del arbolado escolar', cliente: 'Consorci d\'Educació', trabajadores: [1, 3] },
]
