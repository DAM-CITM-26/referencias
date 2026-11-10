// COMPONENTES · cada uno es una función que recibe un objeto (las "props")
// y devuelve HTML como texto. En React, cada función pasa a ser un componente:
// `${…}` pasa a ser {…}, class pasa a ser className, y .join('') desaparece.
// Los botones llevan data-accion: en React eso será un onClick con su función.
// Cada pantalla dice de qué sprint es; MarcaSprint señala lo que va en un sprint posterior.

// ── ÁTOMOS ──

function EtiquetaSuper({ nombre }) {
  return `<span class="tag tag-rapida">Más barato en ${nombre}</span>`
}

// ── MOLÉCULAS ──

function TarjetaProducto({ producto }) {
  return `
    <a class="card" href="#/producto/${producto.id}">
      <div class="card-cuerpo">
        <p class="card-meta">${producto.categoria}</p>
        <h3>${producto.nombre}</h3>
        <p><b style="font-size:1.2rem">${euros(precioMinimo(producto))}</b>
           <span class="card-meta">· ${euros(precioPorUnidad(producto))}/${producto.unidad}</span></p>
        ${EtiquetaSuper({ nombre: superMasBarato(producto) })}
      </div>
    </a>`
}

function SelectorOrden({ valor }) {
  return `
    <label class="field">Ordenar por
      <select data-campo="orden">
        <option value="barato" ${valor === 'barato' ? 'selected' : ''}>Precio: de menos a más</option>
        <option value="caro" ${valor === 'caro' ? 'selected' : ''}>Precio: de más a menos</option>
        <option value="nombre" ${valor === 'nombre' ? 'selected' : ''}>Nombre</option>
      </select>
    </label>`
}

// ── ORGANISMOS ──

function ListaProductos({ productos, vacio }) {
  if (productos.length === 0) return Vacio({ icono: '🛒', texto: vacio })
  return `<div class="grid">${productos.map((producto) => TarjetaProducto({ producto })).join('')}</div>`
}

function Capas() {
  return ''
}

// ── PANTALLAS ──

// P1 · Sprint 1: los productos, con la ordenación y los filtros de supermercado y precio
function PantallaProductos({ estado }) {
  const filtrados = filtrarProductos(PRODUCTOS, estado)
  return `
    <section class="seccion stack">
      ${SelectorOrden({ valor: estado.orden })}
      <div class="field">Supermercado
        ${Chips({ nombre: 'supermercado', opciones: ['Todos', ...SUPERMERCADOS], valor: estado.supermercado })}
      </div>
      <div class="field">Precio máximo
        ${Chips({ nombre: 'maximo', opciones: ['Cualquiera', '1 €', '2 €', '5 €'], valor: estado.maximo === 'Cualquiera' ? 'Cualquiera' : estado.maximo + ' €' })}
      </div>
      <p class="card-meta">${filtrados.length} productos</p>
      ${ListaProductos({ productos: ordenarProductos(filtrados, estado.orden), vacio: 'No hay productos con estos filtros.' })}
    </section>`
}

// P3 · Sprint 2: buscar productos (en la app real: Open Food Facts)
function PantallaBuscar({ estado }) {
  return `
    <div class="stack">
      <label class="oculto" for="buscar">Buscar producto</label>
      <input id="buscar" class="buscador" type="search" value="${estado.texto}" placeholder="🔍  Busca un producto" data-campo="texto">
      ${estado.texto.trim() === '' ? Vacio({ icono: '🔍', texto: 'Escribe para buscar.' }) : ListaProductos({ productos: buscarProductos(PRODUCTOS, estado.texto), vacio: 'Sin resultados.' })}
    </div>`
}

// P2 · Sprint 2: la ficha (#/producto/7), con la comparación. Añadir a la cesta es del Sprint 3.
function PantallaProducto({ estado, id }) {
  const producto = PRODUCTOS.find((p) => p.id === id)
  if (!producto) return null
  const ordenados = Object.keys(producto.precios).sort((a, b) => producto.precios[a] - producto.precios[b])
  const filas = ordenados.map((nombre, i) => `<tr><td>${i === 0 ? '🏆 ' : ''}${nombre}</td><td>${euros(producto.precios[nombre])}</td></tr>`)
  const linea = estado.cesta.find((l) => l.productoId === producto.id)
  return `
    <article class="stack">
      <p class="card-meta">${producto.categoria} · ${producto.cantidad} ${producto.unidad}</p>
      <table class="tabla"><thead><tr><th>Supermercado</th><th>Precio</th></tr></thead><tbody>${filas.join('')}</tbody></table>
      <p class="card-meta">No está en: ${SUPERMERCADOS.filter((s) => producto.precios[s] === undefined).join(', ') || 'está en todos'}</p>
      <div class="row">
        ${SelectorCantidad({ nombre: 'cesta-' + producto.id, etiqueta: 'En la cesta', valor: linea ? linea.cantidad : 0, min: 0, max: 20 })}
        ${MarcaSprint({ sprint: 3 })}
      </div>
    </article>`
}

// P4 · Sprint 3: la cesta, el supermercado más barato y el presupuesto
function PantallaCesta({ estado }) {
  if (estado.cesta.length === 0) return Vacio({ icono: '🧺', texto: 'Tu cesta está vacía. Añade productos desde su ficha.' })
  const totales = totalesPorSuper(estado.cesta, PRODUCTOS, SUPERMERCADOS)
  const nombres = Object.keys(totales).sort((a, b) => totales[a] - totales[b])
  const mejor = nombres[0]
  const lineas = estado.cesta.map((l) => {
    const producto = PRODUCTOS.find((p) => p.id === l.productoId)
    return `<li><a class="crece enlace-fila" href="#/producto/${producto.id}"><h3>${producto.nombre}</h3></a>${SelectorCantidad({ nombre: 'cesta-' + producto.id, etiqueta: '', valor: l.cantidad, min: 0, max: 20 })}</li>`
  })
  return `
    <div class="stack">
      <ul class="list">${lineas.join('')}</ul>
      <label class="field">Presupuesto (€)<input type="number" min="0" step="1" value="${estado.presupuesto}" data-campo="presupuesto"></label>
      ${mejor
        ? `<section class="formulario stack">
             <p>🏆 Lo más barato: <b>${mejor}</b>, ${euros(totales[mejor])}</p>
             ${totales[mejor] > estado.presupuesto ? `<p>⚠️ Te pasas del presupuesto en ${euros(totales[mejor] - estado.presupuesto)}.</p>` : '<p>✅ Dentro del presupuesto.</p>'}
             <table class="tabla"><tbody>${nombres.map((n) => `<tr><td>${n}</td><td>${euros(totales[n])}</td></tr>`).join('')}</tbody></table>
           </section>`
        : '<p class="formulario">Ningún supermercado tiene todos los productos de tu cesta.</p>'}
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
