// APP · el estado, las rutas y pintar().
// En React desaparece casi todo este fichero:
//   · estado + pintar() → useState (React vuelve a pintar solo cuando cambia)
//   · las rutas con # → en el Sprint 1, un useState en App; en el Sprint 2, React Router (useParams)
//   · el listener de clics con data-accion → un onClick en cada botón
//   · el listener de input con data-campo → un onChange en cada campo (input controlado)
//   · cargar() y guardar() con localStorage → en el Sprint 3, un Context guardado en el móvil

// ── GUARDAR EN EL MÓVIL (Sprint 3) ──
function cargar(clave, inicial) {
  const guardado = localStorage.getItem('nexus-' + clave)
  return guardado ? JSON.parse(guardado) : inicial
}
function guardar(clave, valor) {
  localStorage.setItem('nexus-' + clave, JSON.stringify(valor))
}

// ── ESTADO: todo lo que puede cambiar mientras se usa la app ──
const estado = {
  tareas: cargar('tareas', TAREAS), // P1 · las tareas (en el Sprint 3, se recuerdan)
  semana: 0,                        // P3 · 0 = esta semana, -1 = la anterior, 1 = la siguiente
  capa: null,                       // P5 · 'editar' con el panel abierto
  tareaCapa: null,
  aviso: null,
}

// ── RUTAS: qué pantalla toca según la dirección (#/, #/semana, …) y de qué sprint es ──
const RUTAS = [
  { id: 'hoy', titulo: 'Due Today', sprint: 1, pantalla: PantallaHoy },
  { id: 'semana', titulo: 'Semana', sprint: 2, pantalla: PantallaSemana },
  { id: 'progreso', titulo: 'Progreso', sprint: 3, pantalla: PantallaProgreso },
  { id: 'tarea', titulo: (id) => 'Tarea', sprint: 2, pantalla: PantallaTarea, pestana: 'hoy' },
]

// ── ALCANCE: qué pieza va en cada sprint (solo de la referencia, en #/alcance) ──
// ¿Las tarjetas de la pantalla del Sprint 1 abren una ficha del Sprint 2? (solo para la franja)
const FICHA_DESDE_S1 = true
const ALCANCE = [
  {"sprint": 1, "pieza": "Due Today", "detalle": "las tareas de hoy por hora, y el formulario para crear una tarea, con la tarea y su horario separados"},
  {"sprint": 2, "pieza": "Navegación", "detalle": "la barra de pestañas con vuestras secciones, cada una con su dirección (React Router)"},
  {"sprint": 2, "pieza": "Semana", "detalle": "los 7 días con sus tareas y los festivos de la API (Nager.Date), con «cargando» y error"},
  {"sprint": 2, "pieza": "Detalle de la tarea", "detalle": "su pantalla con su dirección (#/tarea/7)"},
  {"sprint": 2, "pieza": "«No encontrado»", "detalle": "la página de una dirección o una tarea que no existe"},
  {"sprint": 2, "pieza": "Publicada", "detalle": "en GitHub Pages e instalable en el móvil"},
  {"sprint": 3, "pieza": "Las tareas se recuerdan", "detalle": "se guardan en el móvil; desde el detalle se marcan como hechas y se editan"},
  {"sprint": 3, "pieza": "Progreso", "detalle": "el porcentaje de tareas hechas de la semana"},
  {"sprint": 3, "pieza": "Pruebas unitarias", "detalle": "al menos 3, con Vitest, sobre vuestras funciones de cálculo"},
  {"sprint": 3, "pieza": "Lighthouse", "detalle": "accesibilidad y rendimiento, corrigiendo lo que marque (en clase)"},
  {"sprint": 3, "pieza": "En el móvil", "detalle": "la app instalada funciona igual que en el ordenador y recuerda lo guardado (en clase)"},
]

function rutaActual() {
  const [id, parametro] = location.hash.replace('#/', '').split('/') // '#/x/7' → ['x', '7']
  if (!id) return { ruta: RUTAS[0], parametro }
  if (id === 'alcance') return { ruta: { id: 'alcance', titulo: 'Qué toca en cada sprint', sprint: 0, pantalla: PantallaAlcance }, parametro }
  return { ruta: RUTAS.find((r) => r.id === id), parametro }
}

// ── PINTAR: vuelve a dibujar todo a partir del estado ──
function pintar() {
  const { ruta, parametro } = rutaActual()
  let html = ruta ? ruta.pantalla({ estado, id: Number(parametro), alcance: ALCANCE }) : null
  let titulo = ruta ? (typeof ruta.titulo === 'function' ? ruta.titulo(Number(parametro)) : ruta.titulo) : ''
  let sprint = ruta ? ruta.sprint : 2
  if (html === null) {
    html = PantallaNoEncontrada() // la dirección o el elemento no existen (Sprint 2)
    titulo = 'No encontrada'
    sprint = 2
  }

  // Si el foco estaba en un campo, lo recuperamos después de pintar.
  // En React esto no hace falta: solo cambia lo que cambia.
  const activo = document.activeElement
  const campoActivo = activo && activo.dataset ? activo.dataset.campo : null

  document.querySelector('#titulo').textContent = titulo
  const etiqueta = document.querySelector('#sprint')
  etiqueta.textContent = sprint === 0 ? 'Alcance' : 'Sprint ' + sprint
  etiqueta.className = 'tag tag-s' + sprint
  document.querySelector('#app').innerHTML = (sprint === 0 ? '' : FranjaSprint({ sprint })) + html
  document.querySelector('#capas').innerHTML = Capas({ estado }) + (estado.aviso ? Aviso({ texto: estado.aviso }) : '')
  const pestanaActiva = ruta ? ruta.pestana || ruta.id : ''
  document.querySelectorAll('.pestanas a').forEach((enlace) => {
    enlace.classList.toggle('activa', enlace.dataset.pestana === pestanaActiva || (enlace.getAttribute('href') === '#/' && ruta === RUTAS[0]))
  })

  if (campoActivo) {
    const campo = document.querySelector(`[data-campo="${campoActivo}"]`)
    if (campo) {
      campo.focus()
      if (campo.type === 'search' || campo.type === 'text') campo.setSelectionRange(campo.value.length, campo.value.length)
    }
  }
}

function mostrarAviso(texto) {
  estado.aviso = texto
  setTimeout(() => {
    estado.aviso = null
    pintar()
  }, 2500)
}

// ── EVENTOS ──
// Clics: un solo listener para todos los botones con data-accion.
// En React, cada botón tendrá su propio onClick={() => …}.
document.addEventListener('click', (evento) => {
  const boton = evento.target.closest('[data-accion]')
  if (!boton) return
  const accion = boton.dataset.accion
  const valor = boton.dataset.valor
  if (accion === 'cerrar') estado.capa = null
  if (accion === 'semana') estado.semana += Number(valor)
  if (accion === 'marcar') {
    const tarea = estado.tareas.find((t) => t.id === Number(valor))
    estado.tareas = actualizarTarea(estado.tareas, tarea.id, { hecha: !tarea.hecha })
    guardar('tareas', estado.tareas)
  }
  if (accion === 'editar') {
    estado.capa = 'editar'
    estado.tareaCapa = Number(valor)
  }
  pintar()
})

// Campos que se escriben o se eligen
document.addEventListener('input', (evento) => {
  const campo = evento.target.dataset.campo
  if (!campo) return
  const valor = evento.target.value

  pintar()
})

// Crear o editar una tarea desde el formulario (P5).
// En React: un onSubmit que llama a una función del padre.
document.addEventListener('submit', (evento) => {
  if (evento.target.dataset.formulario !== 'tarea') return
  evento.preventDefault()
  const f = evento.target
  const datos = {
    titulo: f.titulo.value.trim(),
    categoria: f.categoria.value,
    fecha: f.fecha.value,
    horaInicio: f.horaInicio.value,
    horaFin: f.horaFin.value,
  }
  if (estado.capa === 'editar') {
    estado.tareas = actualizarTarea(estado.tareas, estado.tareaCapa, datos)
    estado.capa = null
    mostrarAviso('Tarea guardada')
  } else {
    estado.tareas = anadirTarea(estado.tareas, { id: Date.now(), ...datos, hecha: false })
    mostrarAviso('Tarea creada')
  }
  guardar('tareas', estado.tareas)
  pintar()
})

// Al cambiar la dirección (al pulsar un enlace o «atrás»), se pinta la pantalla que toca
window.addEventListener('hashchange', () => {
  estado.capa = null
  window.scrollTo(0, 0)
  pintar()
})

pintar()

// PWA: el service worker guarda la app para abrirla sin conexión
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js')
}
