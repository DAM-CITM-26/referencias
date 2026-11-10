// LÓGICA · funciones puras: reciben datos y devuelven datos.
// No tocan el estado ni la pantalla, y nunca modifican lo que reciben.
// En React van a src/utils/ (con export delante), y en el Sprint 3
// tres de ellas llevan sus tests con Vitest.

// Las tareas de un día concreto ('AAAA-MM-DD')
function tareasDelDia(tareas, fecha) {
  return tareas.filter((tarea) => tarea.fecha === fecha)
}

// Copia ordenada por hora de inicio ('09:00' va antes que '12:00')
function ordenarPorHora(tareas) {
  return [...tareas].sort((a, b) => a.horaInicio.localeCompare(b.horaInicio))
}

// Devuelve una lista NUEVA con la tarea añadida / cambiada
function anadirTarea(tareas, tarea) {
  return [...tareas, tarea]
}
function actualizarTarea(tareas, id, cambios) {
  return tareas.map((t) => (t.id === id ? { ...t, ...cambios } : t))
}

// Los 7 días de la semana (de lunes a domingo) que contienen una fecha
function diasDeLaSemana(fecha) {
  const dia = new Date(fecha)
  const lunes = new Date(dia)
  lunes.setDate(dia.getDate() - ((dia.getDay() + 6) % 7))
  const dias = []
  for (let i = 0; i < 7; i++) {
    const d = new Date(lunes)
    d.setDate(lunes.getDate() + i)
    dias.push(d.toISOString().slice(0, 10))
  }
  return dias
}

// Porcentaje de tareas hechas (0 si no hay ninguna)
function progreso(tareas) {
  if (tareas.length === 0) return 0
  return Math.round((tareas.filter((t) => t.hecha).length / tareas.length) * 100)
}
