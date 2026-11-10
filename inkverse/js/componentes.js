// COMPONENTES · cada uno es una función que recibe un objeto (las "props")
// y devuelve HTML como texto. En React, cada función pasa a ser un componente:
// `${…}` pasa a ser {…}, class pasa a ser className, y .join('') desaparece.
// Los botones llevan data-accion: en React eso será un onClick con su función.
// Cada pantalla dice de qué sprint es; MarcaSprint señala lo que va en un sprint posterior.

const ICONO_FORMATO = { Libro: '📖', Película: '🎬', Serie: '📺' }
const ESTADOS = ['Quiero ver', 'En curso', 'Terminada']

// ── ÁTOMOS ──

function EtiquetaFormato({ formato }) {
  return `<span class="tag">${ICONO_FORMATO[formato]} ${formato}</span>`
}

// El Fidelity Score solo lo tienen las adaptaciones
function Fidelity({ valor }) {
  if (valor === null) return ''
  return `<span class="tag tag-media">Fidelity ${valor} %</span>`
}

function BarraProgreso({ progreso }) {
  return `<progress value="${progreso}" max="100" aria-label="Progreso: ${progreso} %" style="width:100%; accent-color:var(--color-acento)"></progress>`
}

// ── MOLÉCULAS ──

function TarjetaObra({ obra, estadoObra }) {
  return `
    <a class="card" href="#/obra/${obra.id}">
      <div class="card-cuerpo">
        <h3>${obra.titulo}</h3>
        <p class="card-meta">${obra.anio}</p>
        <div class="row">${EtiquetaFormato({ formato: obra.formato })}${Fidelity({ valor: obra.fidelity })}</div>
        ${estadoObra && estadoObra !== 'Sin añadir' ? `<span class="tag tag-rapida">${estadoObra}</span>` : ''}
      </div>
    </a>`
}

function TarjetaContinuar({ obra, progreso }) {
  return `
    <a class="card" href="#/obra/${obra.id}">
      <div class="card-cuerpo">
        <p class="card-meta">${ICONO_FORMATO[obra.formato]} ${obra.formato}</p>
        <h3>${obra.titulo}</h3>
        ${BarraProgreso({ progreso })}
        <p class="card-meta">${progreso} % completado</p>
      </div>
    </a>`
}

function TarjetaDestacada({ universo }) {
  return `
    <article class="destacada stack" style="background:${universo.color}">
      <p class="card-meta" style="color:inherit">Universo destacado</p>
      <h2>${universo.nombre}</h2>
      <p>${universo.descripcion}</p>
    </article>`
}

// Una reseña: si tiene spoiler y la obra no está terminada, se oculta con un aviso
function Resena({ resena, estadoObra, abierta }) {
  if (puedeVerSinAviso(resena, estadoObra) || abierta) {
    return `<li><div class="crece"><p class="card-meta">@${resena.autor}</p><p>${resena.texto}</p></div></li>`
  }
  return `
    <li><div class="crece">
      <p class="card-meta">@${resena.autor}</p>
      <p>⚠️ Contiene spoilers. Se muestra cuando marques la obra como terminada.</p>
    </div></li>`
}

// ── ORGANISMOS ──

function FilaContinuar({ continuar }) {
  const tarjetas = continuar.map((item) => {
    const obra = OBRAS.find((o) => o.id === item.obraId)
    return TarjetaContinuar({ obra, progreso: item.progreso })
  })
  return `<div class="carrusel">${tarjetas.join('')}</div>`
}

function ListaObras({ obras, biblioteca, vacio }) {
  if (obras.length === 0) return Vacio({ icono: '🔍', texto: vacio })
  return `<div class="grid">${obras.map((obra) => TarjetaObra({ obra, estadoObra: estadoDeObra(biblioteca, obra.id) })).join('')}</div>`
}

function Capas() {
  return ''
}

// ── PANTALLAS ──

// P1 · Sprint 1: tarjeta destacada, fila «Continue» y obras del universo filtradas por formato
function PantallaInicio({ estado }) {
  const universo = UNIVERSOS[0]
  const obras = filtrarPorFormato(obrasDeUniverso(OBRAS, universo), estado.formato)
  return `
    <section class="seccion">${TarjetaDestacada({ universo })}</section>
    <section class="seccion">
      <h2>Continue</h2>
      ${FilaContinuar({ continuar: CONTINUAR })}
    </section>
    <section class="seccion stack">
      <h2>Obras de ${universo.nombre}</h2>
      ${Chips({ nombre: 'formato', opciones: ['Todos', 'Libro', 'Película', 'Serie'], valor: estado.formato })}
      ${ListaObras({ obras, biblioteca: estado.biblioteca, vacio: 'Este universo no tiene obras en este formato.' })}
    </section>`
}

// P2 · Sprint 2: la ficha de una obra (#/obra/7). El estado y el aviso anti-spoiler son del Sprint 3.
function PantallaObra({ estado, id }) {
  const obra = OBRAS.find((o) => o.id === id)
  if (!obra) return null
  const universo = UNIVERSOS.find((u) => u.id === obra.universoId)
  const estadoObra = estadoDeObra(estado.biblioteca, obra.id)
  const resenas = RESENAS.filter((r) => r.obraId === obra.id)
  return `
    <article class="stack">
      <div class="row">${EtiquetaFormato({ formato: obra.formato })}${Fidelity({ valor: obra.fidelity })}</div>
      <p class="card-meta">${obra.anio} · Universo: ${universo.nombre}</p>
      ${obra.fidelity !== null ? `<p>El <b>Fidelity Score</b> mide cuánto se parece esta adaptación a la obra original.</p>` : ''}
      <section class="formulario stack">
        <h3>En mi biblioteca ${MarcaSprint({ sprint: 3 })}</h3>
        ${Chips({ nombre: 'estado-obra', opciones: ESTADOS, valor: estadoObra })}
      </section>
      <h2>Reseñas</h2>
      ${resenas.length === 0 ? Vacio({ icono: '💬', texto: 'Todavía no hay reseñas.' }) : `<ul class="list">${resenas.map((resena) => Resena({ resena, estadoObra })).join('')}</ul>`}
    </article>`
}

// P3 · Sprint 2: buscar obras (en la app real: Open Library y TVMaze)
function PantallaBuscar({ estado }) {
  const obras = filtrarPorFormato(buscarObras(OBRAS, estado.texto), estado.formatoBusqueda)
  return `
    <div class="stack">
      <label class="oculto" for="buscar">Buscar libro, película o serie</label>
      <input id="buscar" class="buscador" type="search" value="${estado.texto}" placeholder="🔍  Busca un libro, una película o una serie" data-campo="texto">
      ${Chips({ nombre: 'formato-busqueda', opciones: ['Todos', 'Libro', 'Película', 'Serie'], valor: estado.formatoBusqueda })}
      ${estado.texto.trim() === '' ? Vacio({ icono: '🔍', texto: 'Escribe para buscar.' }) : ListaObras({ obras, biblioteca: estado.biblioteca, vacio: 'Sin resultados.' })}
    </div>`
}

// P4 · Sprint 3: My Library, con el estado de cada obra
function PantallaBiblioteca({ estado }) {
  const entradas = estado.filtroBiblioteca === 'Todas' ? estado.biblioteca : estado.biblioteca.filter((e) => e.estado === estado.filtroBiblioteca)
  const obras = entradas.map((e) => OBRAS.find((o) => o.id === e.obraId))
  return `
    <div class="stack">
      ${Chips({ nombre: 'filtro-biblioteca', opciones: ['Todas', ...ESTADOS], valor: estado.filtroBiblioteca })}
      ${ListaObras({ obras, biblioteca: estado.biblioteca, vacio: 'Añade obras desde su ficha.' })}
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
