// COMPONENTES · cada uno es una función que recibe un objeto (las "props")
// y devuelve HTML como texto. En React, cada función pasa a ser un componente:
// `${…}` pasa a ser {…}, class pasa a ser className, y .join('') desaparece.
// Los botones llevan data-accion: en React eso será un onClick con su función.
// Cada pantalla dice de qué sprint es; MarcaSprint señala lo que va en un sprint posterior.

function equipoPorId(id) {
  return EQUIPOS.find((equipo) => equipo.id === id)
}

// ── ÁTOMOS ──

function EtiquetaEstado({ estado }) {
  const clase = { 'En directo': 'tag-larga', Próximo: 'tag-media', Terminado: 'tag-rapida' }[estado]
  return `<span class="tag ${clase}">${estado === 'En directo' ? '● ' : ''}${estado}</span>`
}

// ── MOLÉCULAS ──

// Una línea del marcador: el que va ganando, en negrita
function FilaEquipo({ equipo, puntos, gana }) {
  return `
    <div class="row" style="justify-content:space-between">
      <span>${equipo.pais} ${gana ? `<b>${equipo.nombre}</b>` : equipo.nombre}</span>
      <span>${gana ? `<b>${puntos}</b>` : puntos}</span>
    </div>`
}

function TarjetaPartido({ partido, favoritos }) {
  const ganador = quienGana(partido)
  const empezado = partido.estado !== 'Próximo'
  return `
    <a class="card" href="#/partido/${partido.id}">
      <div class="card-cuerpo">
        <div class="row" style="justify-content:space-between">
          <span class="card-meta">${juegaFavorito(partido, favoritos) ? '⭐ ' : ''}${partido.torneo} · ${partido.hora} · ${partido.mapa}</span>
          ${EtiquetaEstado({ estado: partido.estado })}
        </div>
        ${FilaEquipo({ equipo: equipoPorId(partido.equipoA), puntos: empezado ? partido.marcadorA : '–', gana: ganador === partido.equipoA })}
        ${FilaEquipo({ equipo: equipoPorId(partido.equipoB), puntos: empezado ? partido.marcadorB : '–', gana: ganador === partido.equipoB })}
      </div>
    </a>`
}

// ── ORGANISMOS ──

function ListaPartidos({ partidos, favoritos, vacio }) {
  if (partidos.length === 0) return Vacio({ icono: '🎯', texto: vacio })
  return `<div class="stack">${partidos.map((partido) => TarjetaPartido({ partido, favoritos })).join('')}</div>`
}

function Capas() {
  return ''
}

// ── PANTALLAS ──

// P1 · Sprint 1: los partidos de hoy, con chips para filtrar por torneo
function PantallaHoy({ estado }) {
  return `
    <section class="seccion stack">
      ${Chips({ nombre: 'torneo', opciones: ['Todos', ...torneosDe(PARTIDOS)], valor: estado.torneo })}
      ${ListaPartidos({ partidos: filtrarPorTorneo(PARTIDOS, estado.torneo), favoritos: estado.favoritos, vacio: 'Hoy no hay partidos de este torneo.' })}
      <p class="card-meta">⭐ = juega uno de tus equipos ${MarcaSprint({ sprint: 3 })}</p>
    </section>`
}

// P2 · Sprint 2: la ficha de un partido (#/partido/7). Seguir equipos es del Sprint 3.
function PantallaPartido({ estado, id }) {
  const partido = PARTIDOS.find((p) => p.id === id)
  if (!partido) return null
  const botonSeguir = (equipo) => `
    <button class="btn btn-secundario" data-accion="seguir" data-valor="${equipo.id}">
      ${estado.favoritos.includes(equipo.id) ? '⭐ Siguiendo' : '☆ Seguir'} a ${equipo.nombre}
    </button>`
  const a = equipoPorId(partido.equipoA)
  const b = equipoPorId(partido.equipoB)
  return `
    <article class="stack">
      ${TarjetaPartido({ partido, favoritos: estado.favoritos })}
      <p class="card-meta">${partido.torneo} · mapa ${partido.mapa} · empieza a las ${partido.hora}</p>
      <section class="formulario stack">
        <h3>Tus equipos ${MarcaSprint({ sprint: 3 })}</h3>
        <div class="row">${botonSeguir(a)}${botonSeguir(b)}</div>
      </section>
    </article>`
}

// P3 · Sprint 2: el ranking de equipos
function PantallaRanking() {
  const filas = ordenarRanking(EQUIPOS).map(
    (equipo, i) => `<tr><td>${i + 1}</td><td>${equipo.pais} ${equipo.nombre}</td><td>${equipo.puntos}</td></tr>`,
  )
  return `<table class="tabla"><thead><tr><th>#</th><th>Equipo</th><th>Puntos</th></tr></thead><tbody>${filas.join('')}</tbody></table>`
}

// P4 · Sprint 3: mis equipos y sus partidos de hoy
function PantallaFavoritos({ estado }) {
  if (estado.favoritos.length === 0) return Vacio({ icono: '⭐', texto: 'Sigue a un equipo desde la ficha de un partido.' })
  const equipos = estado.favoritos.map((id) => `<span class="tag">${equipoPorId(id).pais} ${equipoPorId(id).nombre}</span>`)
  const partidos = PARTIDOS.filter((p) => juegaFavorito(p, estado.favoritos))
  return `
    <div class="stack">
      <div class="row">${equipos.join('')}</div>
      <h2>Sus partidos de hoy</h2>
      ${ListaPartidos({ partidos, favoritos: estado.favoritos, vacio: 'Hoy no juega ninguno de tus equipos.' })}
    </div>`
}

// ── COMUNES (iguales en todas las referencias) ──

function Vacio({ icono, texto }) {
  return `<div class="vacio"><p class="icono" aria-hidden="true">${icono}</p><p>${texto}</p></div>`
}

// Chips de una sola opción. En React: props opciones, valor y onCambio.
function Chips({ nombre, opciones, valor }) {
  const botones = opciones.map(
    (opcion) => `
      <button class="chip ${opcion === valor ? 'activo' : ''}" data-accion="${nombre}" data-valor="${opcion}"
              aria-pressed="${opcion === valor}">${opcion}</button>`,
  )
  return `<div class="chips">${botones.join('')}</div>`
}

// Estrellas que se pulsan (como el componente Estrellas de la clase 17: valor + onCambio)
function EstrellasPulsables({ nombre, valor }) {
  const botones = [1, 2, 3, 4, 5].map(
    (n) => `<button type="button" data-accion="${nombre}" data-valor="${n}" aria-label="${n} de 5">${n <= valor ? '★' : '☆'}</button>`,
  )
  return `<div class="estrellas" role="group" aria-label="Puntuación: ${valor} de 5">${botones.join('')}</div>`
}

// Selector − / + (como el SelectorCantidad de la clase 17)
function SelectorCantidad({ nombre, etiqueta, valor, min, max }) {
  return `
    <div class="cantidad">
      <span>${etiqueta}</span>
      <button type="button" data-accion="${nombre}-menos" ${valor <= min ? 'disabled' : ''} aria-label="Menos">−</button>
      <output aria-live="polite">${valor}</output>
      <button type="button" data-accion="${nombre}-mas" ${valor >= max ? 'disabled' : ''} aria-label="Más">+</button>
    </div>`
}

// Panel inferior con su fondo oscuro (renderizado condicional)
function Panel({ titulo, contenido }) {
  return `
    <div class="fondo" data-accion="cerrar"></div>
    <div class="panel stack" role="dialog" aria-modal="true" aria-label="${titulo}">
      <h2>${titulo}</h2>
      ${contenido}
    </div>`
}

function Aviso({ texto }) {
  return `<p class="aviso" role="status">${texto}</p>`
}

// P6 · Sprint 2: dirección o elemento que no existe
function PantallaNoEncontrada() {
  return `
    ${Vacio({ icono: '🧭', texto: 'Esta página no existe.' })}
    <p class="centrado"><a class="btn enlace-btn" href="#/">Volver al inicio</a></p>`
}

// ── SOLO DE LA REFERENCIA (para que se vea el alcance; en vuestra app no hace falta) ──

const FECHAS_SPRINT = { 1: 'del 9 al 18 de noviembre', 2: 'del 18 de noviembre al 2 de diciembre', 3: 'del 2 al 16 de diciembre' }

// La franja de color de cada pantalla: de qué sprint es y si ya toca
function FranjaSprint({ sprint }) {
  const ficha = FICHA_DESDE_S1 ? ' Al pulsar una tarjeta se abre su ficha: esa pantalla es del Sprint 2.' : ''
  const cuando = { 1: 'Es lo que toca en el Sprint 1 (la barra de pestañas de abajo es del Sprint 2).' + ficha, 2: 'No se hace en el Sprint 1.', 3: 'No se hace hasta el Sprint 3.' }[sprint]
  return `<p class="franja-sprint franja-s${sprint}">Pantalla del <b>Sprint ${sprint}</b> (${FECHAS_SPRINT[sprint]}). ${cuando} <a href="#/alcance">Qué toca en cada sprint</a></p>`
}

// Etiqueta pequeña para un botón o un bloque de un sprint posterior al de su pantalla
function MarcaSprint({ sprint }) {
  return `<span class="tag tag-s${sprint}" title="Se hace en el Sprint ${sprint}">S${sprint}</span>`
}

function PantallaAlcance({ alcance }) {
  const bloques = [1, 2, 3].map((sprint) => {
    const piezas = alcance.filter((p) => p.sprint === sprint)
    return `
      <article class="alcance-sprint alcance-s${sprint}">
        <h2>Sprint ${sprint} <span class="card-meta">· ${FECHAS_SPRINT[sprint]}</span></h2>
        <ul>${piezas.map((p) => `<li><b>${p.pieza}</b>: ${p.detalle}</li>`).join('')}</ul>
      </article>`
  })
  return `
    <div class="stack">
      <p>Cada sprint solo pide sus piezas. <b>No hay que hacerlo todo de golpe:</b> lo de los sprints siguientes se ve aquí para que podáis planificar el backlog y, si os sobra tiempo, adelantar.</p>
      ${bloques.join('')}
      <p class="card-meta">Lo que no está en esta lista es opcional y no puntúa. Las etiquetas S2 y S3 de los botones dicen en qué sprint se hace cada cosa.</p>
    </div>`
}
