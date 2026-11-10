// APP · el estado, las rutas y pintar().
// En React desaparece casi todo este fichero:
//   · estado + pintar() → useState (React vuelve a pintar solo cuando cambia)
//   · las rutas con # → React Router (<Routes>, <Route path="/juego/:id">, useParams)
//   · el listener de clics con data-accion → un onClick en cada botón
//   · guardar() y cargar() con localStorage → un Context guardado en el móvil (Sprint 3)

// ── ESTADO: todo lo que puede cambiar mientras se usa la app ──
const estado = {
  duracion: 'Todas',                    // P1 · chips de Inicio
  texto: FILTROS_INICIALES.texto,       // P3 · buscador del Catálogo (como en clase)
  personas: FILTROS_INICIALES.personas, // P3 · jugadores, 0 = cualquiera (como en clase)
  orden: 'valoracion',                  // P3 · ordenar
  pagina: 1,                            // P3 · paginación (como en clase)
  ludoteca: cargar(),       // P4 · lo mío (se guarda en el móvil)
  capa: null,               // qué hay abierto encima: null, 'partida' o 'confirmar'
  juegoCapa: null,          // el juego del panel o de la ventana
  formulario: { fecha: hoy(), personas: 2, nota: 3 }, // P5 · el panel de partida
  aviso: null,              // texto del aviso breve
}

function hoy() {
  return new Date().toISOString().slice(0, 10)
}

// ── GUARDAR EN EL MÓVIL (P4 · Sprint 3) ──
function cargar() {
  const guardado = localStorage.getItem('ludoteca')
  return guardado ? JSON.parse(guardado) : []
}
function guardar() {
  localStorage.setItem('ludoteca', JSON.stringify(estado.ludoteca))
}

// ── RUTAS: qué pantalla toca según la dirección (#/, #/catalogo, #/juego/7…) ──
function rutaActual() {
  const partes = location.hash.replace('#/', '').split('/') // '#/juego/7' → ['juego', '7']
  return { pagina: partes[0] || 'inicio', id: Number(partes[1]) }
}

// ── PINTAR: vuelve a dibujar todo a partir del estado ──
function pintar() {
  const { pagina, id } = rutaActual()
  let titulo = 'Ludoteca'
  let sprint = 'Sprint 1'
  let html

  if (pagina === 'inicio') {
    html = PantallaInicio({ estado })
  } else if (pagina === 'catalogo') {
    titulo = 'Catálogo'
    sprint = 'Sprint 2'
    html = PantallaCatalogo({ estado })
  } else if (pagina === 'juego' && JUEGOS.some((j) => j.id === id)) {
    const juego = JUEGOS.find((j) => j.id === id)
    titulo = juego.nombre
    sprint = 'Sprint 2'
    html = PantallaJuego({ juego, entrada: buscarEntrada(estado.ludoteca, id) })
  } else if (pagina === 'ludoteca') {
    titulo = 'Mi ludoteca'
    sprint = 'Sprint 3'
    html = PantallaLudoteca({ ludoteca: estado.ludoteca })
  } else {
    titulo = 'No encontrada'
    sprint = 'Sprint 2'
    html = PantallaNoEncontrada()
  }

  // Si el foco estaba en un campo (el buscador), lo recuperamos después de pintar.
  // En React esto no hace falta: solo cambia lo que cambia.
  const activo = document.activeElement
  const campoActivo = activo && activo.dataset ? activo.dataset.campo : null

  document.querySelector('#titulo').textContent = titulo
  document.querySelector('#sprint').textContent = sprint
  document.querySelector('#app').innerHTML = html
  document.querySelector('#capas').innerHTML = pintarCapas()

  document.querySelectorAll('.pestanas a').forEach((enlace) => {
    enlace.classList.toggle('activa', enlace.dataset.pestana === (pagina === 'juego' ? 'catalogo' : pagina))
  })

  if (campoActivo) {
    const campo = document.querySelector(`[data-campo="${campoActivo}"]`)
    if (campo) {
      campo.focus()
      if (campo.type === 'search') campo.setSelectionRange(campo.value.length, campo.value.length)
    }
  }
}

// Lo que va encima de la pantalla: panel, ventana y aviso (renderizado condicional)
function pintarCapas() {
  const juego = JUEGOS.find((j) => j.id === estado.juegoCapa)
  let html = ''
  if (estado.capa === 'partida') html += PanelPartida({ juego, formulario: estado.formulario })
  if (estado.capa === 'confirmar') html += VentanaConfirmar({ juego })
  if (estado.aviso) html += Aviso({ texto: estado.aviso })
  return html
}

function mostrarAviso(texto) {
  estado.aviso = texto
  setTimeout(() => {
    estado.aviso = null
    pintar()
  }, 2500)
}

// ── EVENTOS: un solo listener para todos los botones con data-accion ──
// En React, cada botón tendrá su propio onClick={() => …}.
document.addEventListener('click', (evento) => {
  const boton = evento.target.closest('[data-accion]')
  if (!boton) return
  const accion = boton.dataset.accion
  const valor = boton.dataset.valor
  const f = estado.formulario

  if (accion === 'duracion') estado.duracion = valor
  if (accion === 'anadir') {
    estado.ludoteca = anadirJuego(estado.ludoteca, Number(valor))
    guardar()
    mostrarAviso('Añadido a tu ludoteca')
  }
  if (accion === 'pedir-quitar') {
    estado.capa = 'confirmar'
    estado.juegoCapa = Number(valor)
  }
  if (accion === 'quitar') {
    estado.ludoteca = quitarJuego(estado.ludoteca, Number(valor))
    guardar()
    estado.capa = null
    mostrarAviso('Quitado de tu ludoteca')
  }
  if (accion === 'abrir-partida') {
    estado.capa = 'partida'
    estado.juegoCapa = Number(valor)
    estado.formulario = { fecha: hoy(), personas: 2, nota: 3 }
  }
  if (accion === 'filtro-personas-menos') { estado.personas -= 1; estado.pagina = 1 }
  if (accion === 'filtro-personas-mas') { estado.personas += 1; estado.pagina = 1 }
  if (accion === 'pagina') estado.pagina = Number(valor)
  if (accion === 'partida-personas-menos') f.personas -= 1
  if (accion === 'partida-personas-mas') f.personas += 1
  if (accion === 'nota') f.nota = Number(valor)
  if (accion === 'cerrar') estado.capa = null

  pintar()
})

// Campos que se escriben o se eligen (buscador y desplegables)
document.addEventListener('input', (evento) => {
  const campo = evento.target.dataset.campo
  if (!campo) return
  if (campo === 'texto') estado.texto = evento.target.value
  if (campo === 'orden') estado.orden = evento.target.value
  estado.pagina = 1 // al cambiar un filtro, se vuelve a la primera página
  pintar()
})

// Guardar la partida del panel (P5)
document.addEventListener('submit', (evento) => {
  if (evento.target.dataset.formulario !== 'partida') return
  evento.preventDefault()
  const partida = {
    id: Date.now(),
    fecha: evento.target.fecha.value,
    personas: estado.formulario.personas,
    nota: estado.formulario.nota,
  }
  estado.ludoteca = registrarPartida(estado.ludoteca, estado.juegoCapa, partida)
  guardar()
  estado.capa = null
  mostrarAviso('Partida guardada')
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
