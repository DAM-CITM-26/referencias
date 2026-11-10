// COMPONENTES · cada uno es una función que recibe un objeto (las "props")
// y devuelve HTML como texto. En React, cada función pasa a ser un componente:
// `${…}` pasa a ser {…}, class pasa a ser className, y .join('') desaparece.
// Los botones llevan data-accion: en React eso será un onClick con su función.
// Cada pantalla dice de qué sprint es; MarcaSprint señala lo que va en un sprint posterior.

const EMOJI_COCINA = { Mediterránea: '🥘', Japonesa: '🍜', Italiana: '🍝', Vegetariana: '🥗', Mexicana: '🌮', China: '🥟', Vietnamita: '🍲' }

function nombreFoodie(id) {
  return id === 0 ? 'Tú' : FOODIES.find((f) => f.id === id).nombre
}

// ── ÁTOMOS ──

function Nota({ valor }) {
  return `<span class="estrellas" aria-label="Nota media ${valor} de 5">★ ${valor}</span>`
}

function Portada({ restaurante }) {
  return `<div class="portada" style="background:var(--color-primario)" aria-hidden="true">${EMOJI_COCINA[restaurante.cocina]}</div>`
}

// ── MOLÉCULAS ──

function TarjetaRestaurante({ restaurante, siguiendo, misValoraciones }) {
  return `
    <a class="card" href="#/restaurante/${restaurante.id}">
      ${Portada({ restaurante })}
      <div class="card-cuerpo">
        <h3>${restaurante.nombre}</h3>
        <p class="card-meta">${restaurante.cocina} · ${restaurante.barrio} · ${restaurante.precio}</p>
        <div class="row">
          ${Nota({ valor: notaMedia(resenasCon(restaurante, misValoraciones)) })}
          ${resenadoPorSeguidos(restaurante, siguiendo) ? '<span class="tag tag-media">Lo recomienda alguien que sigues</span>' : ''}
        </div>
      </div>
    </a>`
}

// Bien visible arriba: la búsqueda es lo primero que se ve
function Buscador({ valor }) {
  return `
    <label class="oculto" for="buscar">Buscar restaurante o barrio</label>
    <input id="buscar" class="buscador" type="search" value="${valor}" placeholder="🔍  Busca un restaurante o un barrio" data-campo="texto">`
}

function FilaResena({ resena }) {
  const enlace = resena.foodieId === 0 ? '<b>Tú</b>' : `<a href="#/foodie/${resena.foodieId}">${nombreFoodie(resena.foodieId)}</a>`
  return `<li><div class="crece"><p>${enlace} · <span class="estrellas">${'★'.repeat(resena.nota)}</span></p><p class="card-meta">${resena.texto}</p></div></li>`
}

// ── ORGANISMOS ──

function ListaRestaurantes({ restaurantes, estado, vacio }) {
  if (restaurantes.length === 0) return Vacio({ icono: '🍽️', texto: vacio })
  return `<div class="grid">${restaurantes.map((restaurante) => TarjetaRestaurante({ restaurante, siguiendo: estado.siguiendo, misValoraciones: estado.misValoraciones })).join('')}</div>`
}

// Panel para valorar un restaurante (Sprint 3)
function Capas({ estado }) {
  if (estado.capa !== 'valorar') return ''
  const restaurante = RESTAURANTES.find((r) => r.id === estado.restauranteCapa)
  return Panel({
    titulo: `Valora ${restaurante.nombre}`,
    contenido: `
      ${EstrellasPulsables({ nombre: 'nota', valor: estado.notaBorrador })}
      <div class="row">
        <button class="btn" data-accion="guardar-valoracion" ${estado.notaBorrador === 0 ? 'disabled' : ''}>Guardar</button>
        <button class="btn btn-secundario" data-accion="cerrar">Cancelar</button>
      </div>`,
  })
}

// ── PANTALLAS ──

// P1 · Sprint 1: búsqueda arriba, chips «Siguiendo» y de cocina, y los restaurantes
function PantallaInicio({ estado }) {
  const restaurantes = filtrarRestaurantes(RESTAURANTES, estado, estado.siguiendo)
  return `
    <section class="seccion stack">
      ${Buscador({ valor: estado.texto })}
      ${Chips({ nombre: 'vista', opciones: ['Todos', 'Siguiendo'], valor: estado.vista })}
      ${Chips({ nombre: 'cocina', opciones: ['Todas', ...cocinasDe(RESTAURANTES)], valor: estado.cocina })}
      <p class="card-meta">${restaurantes.length} restaurantes</p>
      ${ListaRestaurantes({ restaurantes, estado, vacio: 'No hay restaurantes con estos filtros.' })}
    </section>`
}

// P2 · Sprint 2: la ficha de un restaurante (#/restaurante/7). Guardar y valorar son del Sprint 3.
function PantallaRestaurante({ estado, id }) {
  const restaurante = RESTAURANTES.find((r) => r.id === id)
  if (!restaurante) return null
  const resenas = resenasCon(restaurante, estado.misValoraciones)
  return `
    <article class="stack">
      <div class="card">${Portada({ restaurante })}</div>
      <div class="row">${Nota({ valor: notaMedia(resenas) })}<span class="tag">${restaurante.cocina}</span><span class="tag">${restaurante.precio}</span></div>
      <p>📍 ${restaurante.direccion} · ${restaurante.barrio}</p>
      <div class="row">
        <button class="btn btn-secundario" data-accion="guardar-restaurante" data-valor="${restaurante.id}">${estado.guardados.includes(restaurante.id) ? '🔖 Guardado' : '🔖 Guardar'}</button>
        <button class="btn" data-accion="abrir-valorar" data-valor="${restaurante.id}">★ Valorar</button>
        ${MarcaSprint({ sprint: 3 })}
      </div>
      <h2>Reseñas</h2>
      <ul class="list">${resenas.map((resena) => FilaResena({ resena })).join('')}</ul>
    </article>`
}

// P3 · Sprint 2: la lista de Foodies
function PantallaFoodies({ estado }) {
  const filas = FOODIES.map(
    (f) => `
      <li>
        <span class="avatar" style="background:var(--color-primario)">${f.nombre[0]}</span>
        <a class="crece enlace-fila" href="#/foodie/${f.id}"><h3>${f.nombre}</h3><p class="card-meta">${f.bio}</p></a>
        ${estado.siguiendo.includes(f.id) ? '<span class="tag tag-rapida">Siguiendo</span>' : ''}
      </li>`,
  )
  return `<ul class="list">${filas.join('')}</ul>`
}

// P3 · Sprint 2: el perfil de un Foodie (#/foodie/3). Seguir es del Sprint 3.
function PantallaFoodie({ estado, id }) {
  const foodie = FOODIES.find((f) => f.id === id)
  if (!foodie) return null
  const suyas = RESTAURANTES.filter((r) => r.resenas.some((x) => x.foodieId === foodie.id))
  return `
    <article class="stack">
      <p>${foodie.bio}</p>
      <div class="row">
        <button class="btn" data-accion="seguir" data-valor="${foodie.id}">${estado.siguiendo.includes(foodie.id) ? '✓ Siguiendo' : '＋ Seguir'}</button>${MarcaSprint({ sprint: 3 })}
      </div>
      <h2>Sus restaurantes</h2>
      ${ListaRestaurantes({ restaurantes: suyas, estado, vacio: 'Todavía no ha reseñado nada.' })}
    </article>`
}

// P4 · Sprint 3: los restaurantes guardados
function PantallaGuardados({ estado }) {
  const restaurantes = RESTAURANTES.filter((r) => estado.guardados.includes(r.id))
  return ListaRestaurantes({ restaurantes, estado, vacio: 'Guarda restaurantes desde su ficha.' })
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
