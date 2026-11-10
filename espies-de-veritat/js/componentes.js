// COMPONENTES · cada uno es una función que recibe un objeto (las "props")
// y devuelve HTML como texto. En React, cada función pasa a ser un componente:
// `${…}` pasa a ser {…}, class pasa a ser className, y .join('') desaparece.
// Los botones llevan data-accion: en React eso será un onClick con su función.
// Cada pantalla dice de qué sprint es; MarcaSprint señala lo que va en un sprint posterior.

// ── ÁTOMOS ──

function EtiquetaCaducidad({ dias }) {
  const estado = estadoCaducidad(dias)
  const clase = { Caducado: 'tag-larga', 'Caduca pronto': 'tag-media', Bien: 'tag-rapida' }[estado]
  const texto = estado === 'Caducado' ? 'Caducado' : dias === 0 ? 'Caduca hoy' : `${dias} días`
  return `<span class="tag ${clase}">${texto}</span>`
}

// ── MOLÉCULAS ──

function FilaProducto({ producto, hoy }) {
  return `
    <li>
      <span class="avatar" style="background:var(--color-primario)">${producto.nombre[0]}</span>
      <div class="crece">
        <h3>${producto.nombre}</h3>
        <p class="card-meta">${producto.cantidad} ${producto.unidad} · caduca el ${fechaCorta(producto.caduca)}</p>
      </div>
      ${EtiquetaCaducidad({ dias: diasHasta(producto.caduca, hoy) })}
      <button class="btn-icono" data-accion="quitar" data-valor="${producto.id}" aria-label="Quitar ${producto.nombre}">🗑️</button>
    </li>`
}

function TarjetaReceta({ receta, productos }) {
  const faltan = ingredientesQueFaltan(receta, productos)
  return `
    <a class="card" href="#/receta/${receta.id}">
      <div class="card-cuerpo">
        <h3>${receta.nombre}</h3>
        <p class="card-meta">${receta.minutos} min · ${receta.ingredientes.length} ingredientes</p>
        ${faltan.length === 0 ? '<span class="tag tag-rapida">Lo tienes todo</span>' : `<span class="tag tag-media">Te faltan ${faltan.length}</span>`}
      </div>
    </a>`
}

// ── ORGANISMOS ──

function ListaProductos({ productos, hoy }) {
  if (productos.length === 0) return Vacio({ icono: '🧊', texto: 'Tu nevera está vacía. Añade tu primer producto.' })
  return `<ul class="list">${productos.map((producto) => FilaProducto({ producto, hoy })).join('')}</ul>`
}

// Formulario controlado: en React, cada campo con value y onChange
function FormularioProducto() {
  return `
    <form class="formulario stack" data-formulario="producto" aria-label="Añadir producto">
      <h2>Añadir producto</h2>
      <label class="field">Nombre
        <input name="nombre" type="text" placeholder="Por ejemplo: tomates" required>
      </label>
      <div class="row">
        <label class="field" style="flex:1">Cantidad
          <input name="cantidad" type="number" min="1" value="1" required>
        </label>
        <label class="field" style="flex:1">Unidad
          <select name="unidad"><option>ud</option><option>g</option><option>kg</option><option>l</option></select>
        </label>
      </div>
      <label class="field">Caduca el
        <input name="caduca" type="date" required>
      </label>
      <button class="btn" type="submit">Añadir a la nevera</button>
    </form>`
}

function Capas() {
  return ''
}

// ── PANTALLAS ──

// P1 · Sprint 1: la nevera ordenada por caducidad, y el formulario para añadir (P5)
function PantallaNevera({ estado }) {
  const hoy = dentroDeDias(0)
  const pronto = cuantosCaducanPronto(estado.productos, hoy)
  return `
    ${pronto > 0 ? `<p class="formulario">⚠️ <b>${pronto} productos caducan pronto.</b> ${MarcaSprint({ sprint: 3 })}</p>` : ''}
    <section class="seccion stack">
      <p class="card-meta">${estado.productos.length} productos · primero, lo que caduca antes</p>
      ${ListaProductos({ productos: ordenarPorCaducidad(estado.productos), hoy })}
      <p class="card-meta">🗑️ quitar y que la nevera se recuerde al cerrar la app: ${MarcaSprint({ sprint: 3 })}</p>
    </section>
    <section class="seccion">${FormularioProducto()}</section>`
}

// P3 · Sprint 2: buscar recetas por un ingrediente (en la app real: TheMealDB)
function PantallaRecetas({ estado }) {
  const recetas = recetasConIngrediente(RECETAS, estado.ingrediente)
  const sugerencias = estado.productos.slice(0, 5).map((p) => p.nombre)
  return `
    <div class="stack">
      <label class="field" for="ingrediente">Busca recetas con un ingrediente
        <input id="ingrediente" type="search" value="${estado.ingrediente}" placeholder="Por ejemplo: huevos" data-campo="ingrediente">
      </label>
      <div class="field">De tu nevera ${Chips({ nombre: 'sugerencia', opciones: sugerencias, valor: estado.ingrediente })}</div>
      ${estado.ingrediente.trim() === '' ? Vacio({ icono: '🍳', texto: 'Escribe un ingrediente o elige uno de tu nevera.' })
        : recetas.length === 0 ? Vacio({ icono: '🔍', texto: 'No hay recetas con ese ingrediente.' })
        : `<div class="grid">${recetas.map((receta) => TarjetaReceta({ receta, productos: estado.productos })).join('')}</div>`}
    </div>`
}

// P2 · Sprint 2: la ficha de una receta (#/receta/7). La lista de la compra es del Sprint 3.
function PantallaReceta({ estado, id }) {
  const receta = RECETAS.find((r) => r.id === id)
  if (!receta) return null
  const filas = receta.ingredientes.map(
    (i) => `<li><span class="crece">${i}</span>${tengoIngrediente(estado.productos, i) ? '<span class="tag tag-rapida">Lo tienes</span>' : '<span class="tag tag-media">Te falta</span>'}</li>`,
  )
  const faltan = ingredientesQueFaltan(receta, estado.productos)
  return `
    <article class="stack">
      <p class="card-meta">${receta.minutos} minutos</p>
      <h2>Ingredientes</h2>
      <ul class="list">${filas.join('')}</ul>
      <div class="row">
        <button class="btn" data-accion="a-la-compra" data-valor="${receta.id}" ${faltan.length === 0 ? 'disabled' : ''}>🛒 Añadir lo que falta a la compra</button>${MarcaSprint({ sprint: 3 })}
      </div>
    </article>`
}

// P4 · Sprint 3: la lista de la compra, calculada a partir de lo que falta
function PantallaCompra({ estado }) {
  if (estado.compra.length === 0) return Vacio({ icono: '🛒', texto: 'Tu lista está vacía. Añade lo que falta desde una receta.' })
  return `
    <div class="stack">
      <ul class="list">${estado.compra.map((i) => `<li><span class="crece">${i}</span><button class="btn-icono" data-accion="comprado" data-valor="${i}" aria-label="Ya lo tengo">✅</button></li>`).join('')}</ul>
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
