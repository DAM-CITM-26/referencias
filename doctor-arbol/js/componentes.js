// COMPONENTES · cada uno es una función que recibe un objeto (las "props")
// y devuelve HTML como texto. En React, cada función pasa a ser un componente:
// `${…}` pasa a ser {…}, class pasa a ser className, y .join('') desaparece.
// Los botones llevan data-accion: en React eso será un onClick con su función.
// Cada pantalla dice de qué sprint es; MarcaSprint señala lo que va en un sprint posterior.

const TRABAJADOR_DE_EJEMPLO = 1 // «Mis documentos»: sin login, el trabajador es fijo

function trabajadorPorId(id) {
  return TRABAJADORES.find((trabajador) => trabajador.id === id)
}

// ── ÁTOMOS ──

function EtiquetaEstado({ estado }) {
  const clase = { Válido: 'tag-rapida', 'Por caducar': 'tag-media', Caducado: 'tag-larga' }[estado]
  return `<span class="tag ${clase}">${estado}</span>`
}

// ── MOLÉCULAS ──

function FilaDocumento({ documento, hoy }) {
  const trabajador = trabajadorPorId(documento.trabajadorId)
  return `
    <li>
      <span class="avatar" style="background:var(--color-primario); color:var(--color-sobre-primario)">${trabajador.nombre[0]}</span>
      <a class="crece enlace-fila" href="#/documento/${documento.id}">
        <h3>${documento.nombre}</h3>
        <p class="card-meta">${trabajador.nombre} · ${documento.tipo} · caduca el ${fechaCorta(documento.caduca)}</p>
      </a>
      ${EtiquetaEstado({ estado: estadoDocumento(documento, hoy) })}
    </li>`
}

function TarjetaProyecto({ proyecto, hoy }) {
  const enRegla = proyectoEnRegla(proyecto, DOCUMENTOS, hoy)
  return `
    <article class="card">
      <div class="card-cuerpo">
        <h3>${proyecto.nombre}</h3>
        <p class="card-meta">${proyecto.cliente} · ${proyecto.trabajadores.length} trabajadores</p>
        ${enRegla ? '<span class="tag tag-rapida">Documentación en regla</span>' : '<span class="tag tag-larga">Falta documentación</span>'}
      </div>
    </article>`
}

// ── ORGANISMOS ──

function ListaDocumentos({ documentos, hoy, vacio }) {
  if (documentos.length === 0) return Vacio({ icono: '📄', texto: vacio })
  return `<ul class="list">${documentos.map((documento) => FilaDocumento({ documento, hoy })).join('')}</ul>`
}

// Panel para crear un proyecto (Sprint 3)
function Capas({ estado }) {
  if (estado.capa !== 'proyecto') return ''
  const casillas = TRABAJADORES.map(
    (t) => `<label class="row"><input type="checkbox" name="trabajadores" value="${t.id}"> ${t.nombre}</label>`,
  )
  return Panel({
    titulo: 'Nuevo proyecto',
    contenido: `
      <form class="stack" data-formulario="proyecto">
        <label class="field">Nombre<input name="nombre" type="text" required></label>
        <label class="field">Cliente<input name="cliente" type="text" required></label>
        <fieldset class="stack" style="border:none; padding:0; margin:0"><legend class="card-meta">Trabajadores asignados</legend>${casillas.join('')}</fieldset>
        <div class="row">
          <button class="btn" type="submit">Crear proyecto</button>
          <button class="btn btn-secundario" type="button" data-accion="cerrar">Cancelar</button>
        </div>
      </form>`,
  })
}

// ── PANTALLAS ──

// P1 · Sprint 1: los documentos con su estado, y chips para filtrar por estado
function PantallaDocumentos({ estado }) {
  const hoy = dentroDeDias(0)
  const documentos = filtrarPorEstado(DOCUMENTOS, estado.filtro, hoy)
  return `
    <section class="seccion stack">
      ${Chips({ nombre: 'filtro', opciones: ['Todos', 'Válido', 'Por caducar', 'Caducado'], valor: estado.filtro })}
      <p class="card-meta">${documentos.length} documentos</p>
      ${ListaDocumentos({ documentos, hoy, vacio: 'No hay documentos en este estado.' })}
    </section>`
}

// P2 · Sprint 2: la ficha de un documento (#/documento/7)
function PantallaDocumento({ id }) {
  const documento = DOCUMENTOS.find((d) => d.id === id)
  if (!documento) return null
  const hoy = dentroDeDias(0)
  const trabajador = trabajadorPorId(documento.trabajadorId)
  const proyectos = PROYECTOS.filter((p) => p.trabajadores.includes(trabajador.id)).map((p) => `<li>${p.nombre}</li>`)
  const dias = diasHasta(documento.caduca, hoy)
  return `
    <article class="stack">
      <div class="row">${EtiquetaEstado({ estado: estadoDocumento(documento, hoy) })}<span class="tag">${documento.tipo}</span></div>
      <p><b>${trabajador.nombre}</b> · ${trabajador.puesto}</p>
      <p>Caduca el ${fechaCorta(documento.caduca)} (${dias < 0 ? `caducó hace ${-dias} días` : `quedan ${dias} días`}).</p>
      <h2>Proyectos de ${trabajador.nombre}</h2>
      <ul>${proyectos.join('')}</ul>
    </article>`
}

// P3 · Sprint 2: los proyectos, con su estado de documentación. Crear proyecto es del Sprint 3.
function PantallaProyectos({ estado }) {
  const hoy = dentroDeDias(0)
  const proyectos = [...PROYECTOS, ...estado.proyectosNuevos]
  return `
    <div class="stack">
      <div class="row"><button class="btn" data-accion="abrir-proyecto">＋ Nuevo proyecto</button>${MarcaSprint({ sprint: 3 })}</div>
      ${proyectos.map((proyecto) => TarjetaProyecto({ proyecto, hoy })).join('')}
    </div>`
}

// P4 · Sprint 3: los documentos del trabajador de ejemplo, con sus avisos
function PantallaMisDocs() {
  const hoy = dentroDeDias(0)
  const trabajador = trabajadorPorId(TRABAJADOR_DE_EJEMPLO)
  const suyos = documentosDe(DOCUMENTOS, trabajador.id)
  const avisos = suyos.filter((d) => estadoDocumento(d, hoy) !== 'Válido')
  return `
    <div class="stack">
      <p>Entras como <b>${trabajador.nombre}</b> (${trabajador.puesto}).</p>
      ${avisos.length > 0 ? `<p class="formulario">⚠️ Tienes <b>${avisos.length}</b> documentos por renovar.</p>` : ''}
      ${ListaDocumentos({ documentos: suyos, hoy, vacio: 'No tienes documentos.' })}
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
