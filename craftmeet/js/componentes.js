// COMPONENTES · cada uno es una función que recibe un objeto (las "props")
// y devuelve HTML como texto. En React, cada función pasa a ser un componente:
// `${…}` pasa a ser {…}, class pasa a ser className, y .join('') desaparece.
// Los botones llevan data-accion: en React eso será un onClick con su función.
// Cada pantalla dice de qué sprint es; MarcaSprint señala lo que va en un sprint posterior.

const EMOJI_CATEGORIA = { Cerámica: '🏺', Costura: '🧵', Pintura: '🎨', Joyería: '💍', Macramé: '🪢', Papel: '📜' }

// ── ÁTOMOS ──

function EtiquetaPlazas({ libres }) {
  if (libres <= 0) return `<span class="tag tag-larga">Completo</span>`
  if (libres === 1) return `<span class="tag tag-media">¡Última plaza!</span>`
  if (libres === 2) return `<span class="tag tag-media">¡Últimas 2 plazas!</span>`
  return `<span class="tag tag-rapida">${libres} plazas</span>`
}

function Portada({ taller }) {
  return `<div class="portada" style="background:var(--color-acento)" aria-hidden="true">${EMOJI_CATEGORIA[taller.categoria]}</div>`
}

// ── MOLÉCULAS ──

// La tarjeta lleva a la ficha del taller (la ficha es del Sprint 2)
function TarjetaTaller({ taller, misReservas }) {
  return `
    <a class="card" href="#/taller/${taller.id}">
      ${Portada({ taller })}
      <div class="card-cuerpo">
        <h3>${taller.titulo}</h3>
        <p class="card-meta">${fechaCorta(taller.fecha)} · ${taller.hora} · ${taller.lugar}</p>
        <div class="row"><b>${taller.precio} €</b>${EtiquetaPlazas({ libres: plazasLibres(taller, misReservas) })}</div>
      </div>
    </a>`
}

// Chips de varias opciones a la vez: cada uno se enciende o se apaga
function ChipsIntereses({ intereses, elegidos }) {
  const botones = intereses.map(
    (interes) => `
      <button class="chip ${elegidos.includes(interes) ? 'activo' : ''}" data-accion="interes" data-valor="${interes}"
              aria-pressed="${elegidos.includes(interes)}">${interes}</button>`,
  )
  return `<div class="chips">${botones.join('')}</div>`
}

// ── ORGANISMOS ──

function ListaTalleres({ talleres, misReservas, vacio }) {
  if (talleres.length === 0) return Vacio({ icono: '🔍', texto: vacio })
  return `<div class="grid">${talleres.map((taller) => TarjetaTaller({ taller, misReservas })).join('')}</div>`
}

// Panel para reservar (Sprint 3)
function Capas({ estado }) {
  if (estado.capa !== 'reservar') return ''
  const taller = TALLERES.find((t) => t.id === estado.tallerCapa)
  const libres = plazasLibres(taller, estado.misReservas)
  return Panel({
    titulo: `Reservar: ${taller.titulo}`,
    contenido: `
      ${SelectorCantidad({ nombre: 'plazas', etiqueta: 'Plazas', valor: estado.plazas, min: 1, max: libres })}
      <p>Total: <b>${estado.plazas * taller.precio} €</b></p>
      <div class="row">
        <button class="btn" data-accion="confirmar-reserva">Confirmar reserva</button>
        <button class="btn btn-secundario" data-accion="cerrar">Cancelar</button>
      </div>`,
  })
}

// ── PANTALLAS ──

// P1 · Sprint 1: «For You», con los chips de intereses filtrando la lista
function PantallaParaTi({ estado }) {
  const talleres = filtrarPorIntereses(TALLERES, estado.intereses)
  return `
    <section class="seccion stack">
      <h2>¿Qué te apetece crear?</h2>
      ${ChipsIntereses({ intereses: INTERESES, elegidos: estado.intereses })}
      <p class="card-meta">${talleres.length} talleres</p>
      ${ListaTalleres({ talleres, misReservas: estado.misReservas, vacio: 'No hay talleres con estos intereses.' })}
    </section>`
}

// P2 · Sprint 2: la ficha de un taller (#/taller/7). Guardar y reservar son del Sprint 3.
function PantallaTaller({ estado, id }) {
  const taller = TALLERES.find((t) => t.id === id)
  if (!taller) return null
  const libres = plazasLibres(taller, estado.misReservas)
  const guardado = estado.guardados.includes(taller.id)
  return `
    <article class="stack">
      <div class="card">${Portada({ taller })}</div>
      <div class="row">${EtiquetaPlazas({ libres })}<span class="tag">${taller.categoria}</span></div>
      <p>${taller.descripcion}</p>
      <p class="card-meta">${fechaCorta(taller.fecha)} · ${taller.hora} · ${taller.lugar} · <b>${taller.precio} €</b></p>
      <div class="row">
        <button class="btn" data-accion="abrir-reserva" data-valor="${taller.id}" ${libres <= 0 ? 'disabled' : ''}>Reservar plaza</button>${MarcaSprint({ sprint: 3 })}
        <button class="btn btn-secundario" data-accion="guardar" data-valor="${taller.id}">${guardado ? '❤️ Guardado' : '🤍 Guardar'}</button>${MarcaSprint({ sprint: 3 })}
      </div>
    </article>`
}

// P3 · Sprint 2: buscar por texto, con categoría y precio máximo
function PantallaBuscar({ estado }) {
  const talleres = buscarTalleres(TALLERES, estado)
  return `
    <div class="stack">
      <label class="oculto" for="buscar">Buscar taller</label>
      <input id="buscar" class="buscador" type="search" value="${estado.texto}" placeholder="🔍  Busca un taller" data-campo="texto">
      ${Chips({ nombre: 'categoria', opciones: ['Todas', ...INTERESES], valor: estado.categoria })}
      <label class="field">Precio máximo
        <select data-campo="precioMax">
          ${['Cualquiera', '20', '30', '50'].map((p) => `<option value="${p}" ${estado.precioMax === p ? 'selected' : ''}>${p === 'Cualquiera' ? p : p + ' €'}</option>`).join('')}
        </select>
      </label>
      <p class="card-meta">${talleres.length} talleres</p>
      ${ListaTalleres({ talleres, misReservas: estado.misReservas, vacio: 'No hay talleres con esta búsqueda.' })}
    </div>`
}

// P4 · Sprint 3: los talleres guardados, que se recuerdan al cerrar la app
function PantallaGuardados({ estado }) {
  const talleres = TALLERES.filter((t) => estado.guardados.includes(t.id))
  return ListaTalleres({ talleres, misReservas: estado.misReservas, vacio: 'Todavía no has guardado ningún taller. Pulsa 🤍 en su ficha.' })
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
