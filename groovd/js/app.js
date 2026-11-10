// APP · el estado, las rutas y pintar().
// En React desaparece casi todo este fichero:
//   · estado + pintar() → useState (React vuelve a pintar solo cuando cambia)
//   · las rutas con # → en el Sprint 1, un useState en App; en el Sprint 2, React Router (useParams)
//   · el listener de clics con data-accion → un onClick en cada botón
//   · el listener de input con data-campo → un onChange en cada campo (input controlado)
//   · cargar() y guardar() con localStorage → en el Sprint 3, un Context guardado en el móvil

// ── GUARDAR EN EL MÓVIL (Sprint 3) ──
function cargar(clave, inicial) {
  const guardado = localStorage.getItem('groovd-' + clave)
  return guardado ? JSON.parse(guardado) : inicial
}
function guardar(clave, valor) {
  localStorage.setItem('groovd-' + clave, JSON.stringify(valor))
}

// ── ESTADO: todo lo que puede cambiar mientras se usa la app ──
const estado = {
  tipo: 'Todo',                         // P1 · chips de tipo
  texto: '',                            // P3 · buscador
  tipoBusqueda: 'Todo',                 // P3 · pestañas de la búsqueda
  meGusta: cargar('megusta', []),       // P4 · ids (se recuerdan)
  pendientes: cargar('pendientes', []), // P4 · ids de «quiero escuchar»
  vistaBiblioteca: 'Me gusta',
  resenas: cargar('resenas', []),       // P5 · [{ contenidoId, puntuacion, texto }]
  capa: null,
  contenidoCapa: null,
  borrador: { puntuacion: 0, texto: '' },
  aviso: null,
}

// ── RUTAS: qué pantalla toca según la dirección (#/, #/buscar, …) y de qué sprint es ──
const RUTAS = [
  { id: 'inicio', titulo: 'Groovd', sprint: 1, pantalla: PantallaInicio },
  { id: 'buscar', titulo: 'Buscar', sprint: 2, pantalla: PantallaBuscar },
  { id: 'biblioteca', titulo: 'Biblioteca', sprint: 3, pantalla: PantallaBiblioteca },
  { id: 'contenido', titulo: (id) => (CONTENIDOS.find((c) => c.id === id) || {}).titulo, sprint: 2, pantalla: PantallaContenido, pestana: 'inicio' },
]

// ── ALCANCE: qué pieza va en cada sprint (solo de la referencia, en #/alcance) ──
// ¿Las tarjetas de la pantalla del Sprint 1 abren una ficha del Sprint 2? (solo para la franja)
const FICHA_DESDE_S1 = true
const ALCANCE = [
  {"sprint": 1, "pieza": "Inicio", "detalle": "el carrusel «Popular this week» y la lista de la semana, con chips por tipo"},
  {"sprint": 2, "pieza": "Navegación", "detalle": "la barra de pestañas con vuestras secciones, cada una con su dirección (React Router)"},
  {"sprint": 2, "pieza": "Buscar", "detalle": "en iTunes, con pestañas de canciones, álbumes y podcasts, con «cargando» y error"},
  {"sprint": 2, "pieza": "Ficha", "detalle": "la pantalla de cada canción, álbum o podcast, con su dirección (#/contenido/7)"},
  {"sprint": 2, "pieza": "«No encontrado»", "detalle": "la página de una dirección o un contenido que no existe"},
  {"sprint": 2, "pieza": "Publicada", "detalle": "en GitHub Pages e instalable en el móvil"},
  {"sprint": 3, "pieza": "Biblioteca", "detalle": "los «me gusta» y la lista «quiero escuchar», que se recuerdan al cerrar la app"},
  {"sprint": 3, "pieza": "Reseña", "detalle": "en un panel; no se puede guardar sin puntuación"},
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
  if (accion === 'tipo') estado.tipo = valor
  if (accion === 'tipo-busqueda') estado.tipoBusqueda = valor
  if (accion === 'vista-biblioteca') estado.vistaBiblioteca = valor
  if (accion === 'me-gusta') {
    estado.meGusta = alternar(estado.meGusta, Number(valor))
    guardar('megusta', estado.meGusta)
  }
  if (accion === 'pendiente') {
    estado.pendientes = alternar(estado.pendientes, Number(valor))
    guardar('pendientes', estado.pendientes)
  }
  if (accion === 'abrir-resena') {
    const resena = estado.resenas.find((r) => r.contenidoId === Number(valor))
    estado.capa = 'resena'
    estado.contenidoCapa = Number(valor)
    estado.borrador = resena ? { puntuacion: resena.puntuacion, texto: resena.texto } : { puntuacion: 0, texto: '' }
  }
  if (accion === 'puntuacion') estado.borrador.puntuacion = Number(valor)
  if (accion === 'publicar-resena' && resenaValida(estado.borrador)) {
    const otras = estado.resenas.filter((r) => r.contenidoId !== estado.contenidoCapa)
    estado.resenas = [...otras, { contenidoId: estado.contenidoCapa, ...estado.borrador }]
    guardar('resenas', estado.resenas)
    estado.capa = null
    mostrarAviso('Reseña publicada')
  }
  pintar()
})

// Campos que se escriben o se eligen
document.addEventListener('input', (evento) => {
  const campo = evento.target.dataset.campo
  if (!campo) return
  const valor = evento.target.value
  if (campo === 'texto') estado.texto = valor
  if (campo === 'resena') {
    estado.borrador.texto = valor
    return // no hace falta volver a pintar mientras se escribe
  }
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
