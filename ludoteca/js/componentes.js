// COMPONENTES · cada uno es una función que recibe un objeto (las "props")
// y devuelve HTML como texto. Llevan el mismo nombre que en la Ludoteca de clase.
// En React, cada función pasa a ser un componente casi igual:
//   function FichaJuego({ juego }) { return `<a class="card">…` }
//   → function FichaJuego({ juego }) { return <Link className="card">…</Link> }
// `${…}` pasa a ser {…}, class pasa a ser className, y .join('') desaparece.
// Los botones llevan data-accion: en React eso será un onClick con su función.
// El nivel de Atomic Design de cada uno se apunta en docs/componentes.md.

// ── ÁTOMOS ──

// Igual que en clase: recibe el texto ya calculado
function EtiquetaDuracion({ texto }) {
  const clase = { 'Partida rápida': 'tag-rapida', 'Partida media': 'tag-media', 'Partida larga': 'tag-larga' }[texto]
  return `<span class="tag ${clase}">${texto}</span>`
}

// Valoración que solo se muestra (★★★★☆)
function Valoracion({ valor }) {
  return `<span class="estrellas" aria-label="${valor} de 5">${'★'.repeat(valor)}${'☆'.repeat(5 - valor)}</span>`
}

// Portada con el color del juego (el campo color de clase)
function Portada({ juego }) {
  return `<div class="portada" style="background:${juego.color}" aria-hidden="true">🎲</div>`
}

function Vacio({ icono, texto }) {
  return `<div class="vacio"><p class="icono" aria-hidden="true">${icono}</p><p>${texto}</p></div>`
}

// ── MOLÉCULAS ──

// La tarjeta de un juego. En clase, FichaJuego llevaba también los botones;
// aquí se queda en tarjeta, y los botones pasan a la pantalla del juego.
function FichaJuego({ juego }) {
  return `
    <a class="card" href="#/juego/${juego.id}">
      ${Portada({ juego })}
      <div class="card-cuerpo">
        <h3>${juego.nombre}</h3>
        ${Valoracion({ valor: juego.valoracion })}
        <p class="card-meta">${juego.jugadores} jugadores · ${juego.duracion} min</p>
        ${EtiquetaDuracion({ texto: categorizarDuracion(juego.duracion) })}
      </div>
    </a>`
}

// Igual que en clase: componente controlado (valor + onCambio)
function Estrellas({ nombre, valor }) {
  const posiciones = [1, 2, 3, 4, 5]
  const botones = posiciones.map(
    (posicion) => `
      <button type="button" data-accion="${nombre}" data-valor="${posicion}"
              aria-label="${posicion} de 5" aria-pressed="${posicion <= valor}">${posicion <= valor ? '★' : '☆'}</button>`,
  )
  return `<div class="estrellas" role="group" aria-label="Valoración: ${valor} de 5">${botones.join('')}</div>`
}

// Igual que en clase: − / + con etiqueta, límites y textoCero
function SelectorCantidad({ nombre, etiqueta, valor, min, max, textoCero }) {
  return `
    <div class="cantidad">
      <span>${etiqueta}</span>
      <button type="button" data-accion="${nombre}-menos" ${valor <= min ? 'disabled' : ''} aria-label="Menos ${etiqueta}">−</button>
      <output aria-live="polite">${valor === 0 && textoCero ? textoCero : valor}</output>
      <button type="button" data-accion="${nombre}-mas" ${valor >= max ? 'disabled' : ''} aria-label="Más ${etiqueta}">+</button>
    </div>`
}

// Igual que en clase
function BarraBusqueda({ valor }) {
  return `
    <label class="field" for="busqueda">Buscar juego
      <input id="busqueda" type="search" value="${valor}" placeholder="Nombre del juego..." data-campo="texto">
    </label>`
}

// Igual que en clase
function ResumenResultados({ juegos, total }) {
  return `<p class="card-meta">${juegos.length} de ${total} juegos encontrados</p>`
}

// Chips de una sola opción (nuevo). En React: props opciones, valor y onCambio.
function Chips({ nombre, opciones, valor }) {
  const botones = opciones.map(
    (opcion) => `
      <button class="chip ${opcion === valor ? 'activo' : ''}" data-accion="${nombre}" data-valor="${opcion}"
              aria-pressed="${opcion === valor}">${opcion}</button>`,
  )
  return `<div class="chips">${botones.join('')}</div>`
}

function FilaLudoteca({ entrada, juego }) {
  const partidas = entrada.partidas.length
  const resumen = partidas === 0
    ? 'Sin partidas'
    : `${partidas} ${partidas === 1 ? 'partida' : 'partidas'} · nota media ${notaMedia(entrada.partidas)}`
  return `
    <li>
      <span class="avatar" style="background:${juego.color}">${juego.nombre[0]}</span>
      <a class="crece enlace-fila" href="#/juego/${juego.id}">
        <h3>${juego.nombre}</h3>
        <p class="card-meta">${resumen}</p>
      </a>
      <button class="btn-icono" data-accion="pedir-quitar" data-valor="${juego.id}" aria-label="Quitar ${juego.nombre}">🗑️</button>
    </li>`
}

// ── ORGANISMOS ──

// Una fila que se desliza de lado (nuevo)
function Carrusel({ juegos }) {
  return `<div class="carrusel">${juegos.map((juego) => FichaJuego({ juego })).join('')}</div>`
}

// La rejilla de clase (section.ludoteca), con un aviso si no hay resultados
function ListaJuegos({ juegos }) {
  if (juegos.length === 0) return Vacio({ icono: '🔍', texto: 'No hay juegos con estos filtros.' })
  return `<section class="grid">${juegos.map((juego) => FichaJuego({ juego })).join('')}</section>`
}

// Igual que en clase (currentPage, totalPages y onPageChange)
function Paginacion({ currentPage, totalPages }) {
  if (totalPages === 1) return ''
  const paginas = Array.from({ length: totalPages }, (_, i) => i + 1)
  const botones = paginas.map(
    (pagina) => `<button type="button" class="chip ${pagina === currentPage ? 'activo' : ''}"
                         data-accion="pagina" data-valor="${pagina}">${pagina}</button>`,
  )
  return `<nav class="row" aria-label="Páginas">${botones.join('')}</nav>`
}

// Panel inferior para apuntar una partida (nuevo)
function PanelPartida({ juego, formulario }) {
  return `
    <div class="fondo" data-accion="cerrar"></div>
    <form class="panel stack" data-formulario="partida" aria-label="Apuntar partida">
      <h2>Apuntar partida de ${juego.nombre}</h2>
      <label class="field">Fecha
        <input type="date" name="fecha" value="${formulario.fecha}" required>
      </label>
      ${SelectorCantidad({ nombre: 'partida-personas', etiqueta: 'Personas', valor: formulario.personas, min: 1, max: 8 })}
      <div class="field">Nota ${Estrellas({ nombre: 'nota', valor: formulario.nota })}</div>
      <div class="row">
        <button class="btn" type="submit">Guardar partida</button>
        <button class="btn btn-secundario" type="button" data-accion="cerrar">Cancelar</button>
      </div>
    </form>`
}

// Ventana para confirmar antes de borrar (nuevo)
function VentanaConfirmar({ juego }) {
  return `
    <div class="fondo" data-accion="cerrar"></div>
    <div class="modal stack" role="dialog" aria-modal="true">
      <h2>¿Quitar ${juego.nombre}?</h2>
      <p>Se borran también sus partidas.</p>
      <div class="row">
        <button class="btn btn-peligro" data-accion="quitar" data-valor="${juego.id}">Quitar</button>
        <button class="btn btn-secundario" data-accion="cerrar">Cancelar</button>
      </div>
    </div>`
}

function Aviso({ texto }) {
  return `<p class="aviso" role="status">${texto}</p>`
}

// ── PANTALLAS ──

const JUEGOS_POR_PAGINA = 6
const DURACIONES = ['Todas', 'Partida rápida', 'Partida media', 'Partida larga']

// P1 · Sprint 1: la pantalla principal (carrusel + chips + rejilla)
function PantallaInicio({ estado }) {
  const novedades = JUEGOS.filter((juego) => juego.novedad)
  return `
    <section class="seccion">
      <h2>Novedades</h2>
      ${Carrusel({ juegos: novedades })}
    </section>
    <section class="seccion stack">
      <h2>Todos los juegos</h2>
      ${Chips({ nombre: 'duracion', opciones: DURACIONES, valor: estado.duracion })}
      ${ListaJuegos({ juegos: filtrarPorDuracion(JUEGOS, estado.duracion) })}
    </section>`
}

// P3 · Sprint 2: el App de clase hecho pantalla (buscar, personas, resumen, paginación) + ordenar
function PantallaCatalogo({ estado }) {
  const filtrados = JUEGOS.filter(
    (juego) => coincideBusqueda(juego, estado.texto) && admiteJugadores(juego, estado.personas),
  )
  const ordenados = ordenarJuegos(filtrados, estado.orden)
  const paginas = totalPaginas(ordenados, JUEGOS_POR_PAGINA)
  const pagina = Math.min(estado.pagina, paginas)
  return `
    <div class="stack">
      ${BarraBusqueda({ valor: estado.texto })}
      ${SelectorCantidad({ nombre: 'filtro-personas', etiqueta: 'Jugadores', valor: estado.personas, min: 0, max: 8, textoCero: 'Cualquiera' })}
      <label class="field">Ordenar por
        <select data-campo="orden">
          <option value="valoracion" ${estado.orden === 'valoracion' ? 'selected' : ''}>Valoración</option>
          <option value="nombre" ${estado.orden === 'nombre' ? 'selected' : ''}>Nombre</option>
          <option value="duracion" ${estado.orden === 'duracion' ? 'selected' : ''}>Duración</option>
        </select>
      </label>
      ${ResumenResultados({ juegos: filtrados, total: JUEGOS.length })}
      ${ListaJuegos({ juegos: juegosDePagina(ordenados, pagina, JUEGOS_POR_PAGINA) })}
      ${Paginacion({ currentPage: pagina, totalPages: paginas })}
    </div>`
}

// P2 · Sprint 2: la pantalla de un juego (#/juego/7), con los botones que en clase tenía la ficha
function PantallaJuego({ juego, entrada }) {
  const enLudoteca = entrada !== undefined
  return `
    <article class="stack">
      <div class="card">${Portada({ juego })}</div>
      <div class="row">${EtiquetaDuracion({ texto: categorizarDuracion(juego.duracion) })}<span class="tag">${juego.categoria}</span></div>
      ${Valoracion({ valor: juego.valoracion })}
      <p>${juego.descripcion}</p>
      <p class="card-meta">${juego.jugadores} jugadores · ${juego.autoria} · Editado por ${juego.editorial.nombre} (${juego.editorial.pais})</p>
      <div class="row">
        ${enLudoteca
          ? `<button class="btn btn-secundario" data-accion="pedir-quitar" data-valor="${juego.id}">✓ En mi ludoteca</button>`
          : `<button class="btn" data-accion="anadir" data-valor="${juego.id}">📚 Añadir a mi ludoteca</button>`}
      </div>
    </article>
    <button class="fab" data-accion="abrir-partida" data-valor="${juego.id}" aria-label="Apuntar partida">＋</button>`
}

// P4 · Sprint 3: lo mío, que se recuerda al cerrar la app
function PantallaLudoteca({ ludoteca }) {
  if (ludoteca.length === 0) {
    return Vacio({ icono: '📚', texto: 'Todavía no tienes juegos. Añádelos desde su ficha.' })
  }
  const filas = ludoteca.map((entrada) => {
    const juego = JUEGOS.find((j) => j.id === entrada.juegoId)
    return FilaLudoteca({ entrada, juego })
  })
  return `<ul class="list">${filas.join('')}</ul>`
}

// P6 · Sprint 2: dirección o juego que no existe
function PantallaNoEncontrada() {
  return `
    ${Vacio({ icono: '🧭', texto: 'Esta página no existe.' })}
    <p class="centrado"><a class="btn enlace-btn" href="#/">Volver al inicio</a></p>`
}
