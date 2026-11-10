// COMPONENTES · cada uno es una función que recibe un objeto (las "props")
// y devuelve HTML como texto. En React, cada función pasa a ser un componente:
// `${…}` pasa a ser {…}, class pasa a ser className, y .join('') desaparece.
// Los botones llevan data-accion: en React eso será un onClick con su función.
// Cada pantalla dice de qué sprint es; MarcaSprint señala lo que va en un sprint posterior.

const EMOJI_GENERO = { Acción: '💥', Aventura: '🧭', RPG: '🗡️', Deportes: '⚽', Estrategia: '♟️' }
const ESTADOS = ['Jugado', 'Jugando', 'Quiero jugar']

// ── ÁTOMOS ──

function Valoracion({ valor }) {
  return `<span class="estrellas" aria-label="${valor} de 5">★ ${valor.toFixed(1)}</span>`
}

function Plataformas({ plataformas }) {
  return plataformas.map((p) => `<span class="tag">${p}</span>`).join(' ')
}

function Portada({ juego }) {
  return `<div class="portada" style="background:var(--color-primario)" aria-hidden="true">${EMOJI_GENERO[juego.genero]}</div>`
}

// ── MOLÉCULAS ──

function TarjetaJuego({ juego, puesto }) {
  return `
    <a class="card" href="#/juego/${juego.id}">
      ${Portada({ juego })}
      <div class="card-cuerpo">
        ${puesto ? `<p class="card-meta">#${puesto} en tendencia</p>` : ''}
        <h3>${juego.titulo}</h3>
        ${Valoracion({ valor: juego.valoracionMedia })}
        <p class="card-meta">${juego.genero}</p>
        <div class="row">${Plataformas({ plataformas: juego.plataformas })}</div>
      </div>
    </a>`
}

// ── ORGANISMOS ──

function ListaJuegos({ juegos, conPuesto, vacio }) {
  if (juegos.length === 0) return Vacio({ icono: '🎮', texto: vacio })
  return `<div class="grid">${juegos.map((juego, i) => TarjetaJuego({ juego, puesto: conPuesto ? i + 1 : null })).join('')}</div>`
}

// Panel de la reseña (Sprint 3): estrellas y texto
function Capas({ estado }) {
  if (estado.capa !== 'resena') return ''
  const juego = JUEGOS.find((j) => j.id === estado.juegoCapa)
  return Panel({
    titulo: `Tu reseña de ${juego.titulo}`,
    contenido: `
      ${EstrellasPulsables({ nombre: 'estrella', valor: estado.borrador.valoracion })}
      <label class="field">Reseña<textarea data-campo="resena" placeholder="¿Qué te ha parecido?">${estado.borrador.resena}</textarea></label>
      <div class="row">
        <button class="btn" data-accion="guardar-resena">Guardar</button>
        <button class="btn btn-secundario" data-accion="cerrar">Cancelar</button>
      </div>`,
  })
}

// ── PANTALLAS ──

// P1 · Sprint 1: juegos en tendencia, con chips de plataforma y de género
function PantallaInicio({ estado }) {
  const juegos = ordenarPorTendencia(filtrarJuegos(JUEGOS, estado))
  return `
    <section class="seccion stack">
      <h2>En tendencia</h2>
      ${Chips({ nombre: 'plataforma', opciones: ['Todas', 'PC', 'PlayStation', 'Xbox', 'Switch'], valor: estado.plataforma })}
      ${Chips({ nombre: 'genero', opciones: ['Todos', 'Acción', 'Aventura', 'RPG', 'Deportes', 'Estrategia'], valor: estado.genero })}
      ${ListaJuegos({ juegos, conPuesto: true, vacio: 'No hay juegos con estos filtros.' })}
    </section>`
}

// P3 · Sprint 2: el catálogo de la API, con un buscador que filtra lo ya cargado
function PantallaCatalogo({ estado }) {
  const juegos = buscarJuegos(JUEGOS, estado.texto)
  return `
    <div class="stack">
      <label class="oculto" for="buscar">Buscar juego</label>
      <input id="buscar" class="buscador" type="search" value="${estado.texto}" placeholder="🔍  Busca en el catálogo" data-campo="texto">
      <p class="card-meta">${juegos.length} juegos</p>
      ${ListaJuegos({ juegos, conPuesto: false, vacio: 'Sin resultados.' })}
    </div>`
}

// P2 · Sprint 2: la ficha de un juego (#/juego/7). Biblioteca y reseña son del Sprint 3.
function PantallaJuego({ estado, id }) {
  const juego = JUEGOS.find((j) => j.id === id)
  if (!juego) return null
  const entrada = estado.biblioteca.find((e) => e.juegoId === juego.id)
  return `
    <article class="stack">
      <div class="card">${Portada({ juego })}</div>
      <div class="row">${Valoracion({ valor: juego.valoracionMedia })}<span class="tag">${juego.genero}</span>${Plataformas({ plataformas: juego.plataformas })}</div>
      <p>${juego.descripcion}</p>
      <section class="formulario stack">
        <h3>En mi biblioteca ${MarcaSprint({ sprint: 3 })}</h3>
        ${Chips({ nombre: 'estado-juego', opciones: ESTADOS, valor: entrada ? entrada.estado : '' })}
        ${entrada && entrada.valoracion > 0 ? `<p><span class="estrellas">${'★'.repeat(entrada.valoracion)}${'☆'.repeat(5 - entrada.valoracion)}</span> ${entrada.resena}</p>` : ''}
        <button class="btn" data-accion="abrir-resena" data-valor="${juego.id}">✍️ ${entrada && entrada.valoracion > 0 ? 'Editar' : 'Escribir'} reseña</button>
      </section>
    </article>`
}

// P4 · Sprint 3: la biblioteca, con el estado de cada juego
function PantallaBiblioteca({ estado }) {
  const entradas = estado.filtro === 'Todos' ? estado.biblioteca : estado.biblioteca.filter((e) => e.estado === estado.filtro)
  const filas = entradas.map((e) => {
    const juego = JUEGOS.find((j) => j.id === e.juegoId)
    return `
      <li>
        <span class="avatar" style="background:var(--color-primario)">${EMOJI_GENERO[juego.genero]}</span>
        <a class="crece enlace-fila" href="#/juego/${juego.id}"><h3>${juego.titulo}</h3><p class="card-meta">${e.estado}${e.valoracion ? ' · ' + '★'.repeat(e.valoracion) : ''}</p></a>
      </li>`
  })
  return `
    <div class="stack">
      ${Chips({ nombre: 'filtro', opciones: ['Todos', ...ESTADOS], valor: estado.filtro })}
      ${filas.length === 0 ? Vacio({ icono: '📚', texto: 'Añade juegos desde su ficha.' }) : `<ul class="list">${filas.join('')}</ul>`}
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
