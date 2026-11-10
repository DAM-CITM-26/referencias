// APP · el estado, las rutas y pintar().
// En React desaparece casi todo este fichero:
//   · estado + pintar() → useState (React vuelve a pintar solo cuando cambia)
//   · las rutas con # → en el Sprint 1, un useState en App; en el Sprint 2, React Router (useParams)
//   · el listener de clics con data-accion → un onClick en cada botón
//   · el listener de input con data-campo → un onChange en cada campo (input controlado)
//   · cargar() y guardar() con localStorage → en el Sprint 3, un Context guardado en el móvil

// ── GUARDAR EN EL MÓVIL (Sprint 3) ──
function cargar(clave, inicial) {
  const guardado = localStorage.getItem('craftmeet-' + clave)
  return guardado ? JSON.parse(guardado) : inicial
}
function guardar(clave, valor) {
  localStorage.setItem('craftmeet-' + clave, JSON.stringify(valor))
}

// ── ESTADO: todo lo que puede cambiar mientras se usa la app ──
const estado = {
  intereses: [],                     // P1 · los intereses elegidos (vacío = todos)
  texto: '',                         // P3 · buscador
  categoria: 'Todas',                // P3 · chips de categoría
  precioMax: 'Cualquiera',           // P3 · precio máximo
  guardados: cargar('guardados', []), // P4 · ids de los talleres guardados (se recuerdan)
  misReservas: cargar('reservas', []), // P5 · [{ tallerId, plazas }]
  capa: null,                        // P5 · 'reservar' cuando el panel está abierto
  tallerCapa: null,
  plazas: 1,
  aviso: null,
}

// ── RUTAS: qué pantalla toca según la dirección (#/, #/buscar, …) y de qué sprint es ──
const RUTAS = [
  { id: 'parati', titulo: 'Para ti', sprint: 1, pantalla: PantallaParaTi },
  { id: 'buscar', titulo: 'Buscar', sprint: 2, pantalla: PantallaBuscar },
  { id: 'guardados', titulo: 'Guardados', sprint: 3, pantalla: PantallaGuardados },
  { id: 'taller', titulo: (id) => (TALLERES.find((t) => t.id === id) || {}).titulo, sprint: 2, pantalla: PantallaTaller, pestana: 'parati' },
]

// ── ALCANCE: qué pieza va en cada sprint (solo de la referencia, en #/alcance) ──
// ¿Las tarjetas de la pantalla del Sprint 1 abren una ficha del Sprint 2? (solo para la franja)
const FICHA_DESDE_S1 = true
const ALCANCE = [
  {"sprint": 1, "pieza": "Para ti", "detalle": "los talleres en tarjetas, con los chips de intereses filtrando la lista y las plazas libres"},
  {"sprint": 2, "pieza": "Navegación", "detalle": "la barra de pestañas con vuestras secciones, cada una con su dirección (React Router)"},
  {"sprint": 2, "pieza": "Ficha del taller", "detalle": "su pantalla con su dirección (#/taller/7), a la que se llega desde cada tarjeta"},
  {"sprint": 2, "pieza": "Buscar", "detalle": "por texto, con el filtro de categoría y de precio máximo"},
  {"sprint": 2, "pieza": "Datos y «no encontrado»", "detalle": "los talleres llegan del servidor (dam-fake-api), con «cargando» y error; y la página de «no encontrado»"},
  {"sprint": 2, "pieza": "Publicada", "detalle": "en GitHub Pages e instalable en el móvil"},
  {"sprint": 3, "pieza": "Guardados", "detalle": "el corazón de la ficha guarda el taller, y la pestaña Guardados los lista; se recuerda al cerrar la app"},
  {"sprint": 3, "pieza": "Reservar", "detalle": "un panel con el número de plazas y la confirmación, que vuelve al inicio"},
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
  if (accion === 'interes') estado.intereses = alternar(estado.intereses, valor)
  if (accion === 'categoria') estado.categoria = valor
  if (accion === 'guardar') {
    estado.guardados = alternar(estado.guardados, Number(valor))
    guardar('guardados', estado.guardados)
  }
  if (accion === 'abrir-reserva') {
    estado.capa = 'reservar'
    estado.tallerCapa = Number(valor)
    estado.plazas = 1
  }
  if (accion === 'plazas-menos') estado.plazas -= 1
  if (accion === 'plazas-mas') estado.plazas += 1
  if (accion === 'confirmar-reserva') {
    estado.misReservas = [...estado.misReservas, { tallerId: estado.tallerCapa, plazas: estado.plazas }]
    guardar('reservas', estado.misReservas)
    estado.capa = null
    mostrarAviso('¡Reserva confirmada!')
    location.hash = '#/'
  }
  pintar()
})

// Campos que se escriben o se eligen
document.addEventListener('input', (evento) => {
  const campo = evento.target.dataset.campo
  if (!campo) return
  const valor = evento.target.value
  if (campo === 'texto') estado.texto = valor
  if (campo === 'precioMax') estado.precioMax = valor
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
