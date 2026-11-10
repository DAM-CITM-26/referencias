// COMPONENTES · cada uno es una función que recibe un objeto (las "props")
// y devuelve HTML como texto. En React, cada función pasa a ser un componente:
// `${…}` pasa a ser {…}, class pasa a ser className, y .join('') desaparece.
// Los botones llevan data-accion: en React eso será un onClick con su función.
// Cada pantalla dice de qué sprint es; MarcaSprint señala lo que va en un sprint posterior.

const ICONO_TIPO = { Canción: '🎵', Álbum: '💿', Podcast: '🎙️' }

// ── ÁTOMOS ──

function EtiquetaTipo({ tipo }) {
  return `<span class="tag">${ICONO_TIPO[tipo]} ${tipo}</span>`
}

function Caratula({ contenido }) {
  return `<div class="portada" style="background:var(--color-primario)" aria-hidden="true">${ICONO_TIPO[contenido.tipo]}</div>`
}

// ── MOLÉCULAS ──

function TarjetaPopular({ contenido, puesto }) {
  return `
    <a class="card" href="#/contenido/${contenido.id}">
      ${Caratula({ contenido })}
      <div class="card-cuerpo">
        <p class="card-meta">#${puesto} esta semana</p>
        <h3>${contenido.titulo}</h3>
        <p class="card-meta">${contenido.artista}</p>
      </div>
    </a>`
}

function FilaContenido({ contenido }) {
  return `
    <li>
      <span class="avatar" style="background:var(--color-primario)">${ICONO_TIPO[contenido.tipo]}</span>
      <a class="crece enlace-fila" href="#/contenido/${contenido.id}">
        <h3>${contenido.titulo}</h3>
        <p class="card-meta">${contenido.artista} · ${escuchasCortas(contenido.escuchasSemana)} escuchas</p>
      </a>
      ${EtiquetaTipo({ tipo: contenido.tipo })}
    </li>`
}

// ── ORGANISMOS ──

function CarruselPopular({ contenidos }) {
  return `<div class="carrusel">${contenidos.map((contenido, i) => TarjetaPopular({ contenido, puesto: i + 1 })).join('')}</div>`
}

function ListaContenidos({ contenidos, vacio }) {
  if (contenidos.length === 0) return Vacio({ icono: '🎧', texto: vacio })
  return `<ul class="list">${contenidos.map((contenido) => FilaContenido({ contenido })).join('')}</ul>`
}

// Panel de la reseña (Sprint 3): sin puntuación no se puede guardar
function Capas({ estado }) {
  if (estado.capa !== 'resena') return ''
  const contenido = CONTENIDOS.find((c) => c.id === estado.contenidoCapa)
  return Panel({
    titulo: `Reseña de ${contenido.titulo}`,
    contenido: `
      ${EstrellasPulsables({ nombre: 'puntuacion', valor: estado.borrador.puntuacion })}
      <label class="field">Tu reseña<textarea data-campo="resena" placeholder="Opcional">${estado.borrador.texto}</textarea></label>
      ${resenaValida(estado.borrador) ? '' : '<p class="card-meta">Pon una puntuación para poder publicarla.</p>'}
      <div class="row">
        <button class="btn" data-accion="publicar-resena" ${resenaValida(estado.borrador) ? '' : 'disabled'}>Publicar</button>
        <button class="btn btn-secundario" data-accion="cerrar">Cancelar</button>
      </div>`,
  })
}

// ── PANTALLAS ──

// P1 · Sprint 1: «Popular this week» y la lista filtrada por tipo
function PantallaInicio({ estado }) {
  return `
    <section class="seccion">
      <h2>Popular this week</h2>
      ${CarruselPopular({ contenidos: masEscuchados(CONTENIDOS, 5) })}
    </section>
    <section class="seccion stack">
      <h2>Todo lo de la semana</h2>
      ${Chips({ nombre: 'tipo', opciones: ['Todo', 'Canción', 'Álbum', 'Podcast'], valor: estado.tipo })}
      ${ListaContenidos({ contenidos: filtrarPorTipo(masEscuchados(CONTENIDOS, CONTENIDOS.length), estado.tipo), vacio: 'No hay nada de este tipo esta semana.' })}
    </section>`
}

// P3 · Sprint 2: buscar, con pestañas por tipo (en la app real: iTunes)
function PantallaBuscar({ estado }) {
  const resultados = filtrarPorTipo(buscarContenidos(CONTENIDOS, estado.texto), estado.tipoBusqueda)
  return `
    <div class="stack">
      <label class="oculto" for="buscar">Buscar</label>
      <input id="buscar" class="buscador" type="search" value="${estado.texto}" placeholder="🔍  Canciones, álbumes, podcasts" data-campo="texto">
      ${Chips({ nombre: 'tipo-busqueda', opciones: ['Todo', 'Canción', 'Álbum', 'Podcast'], valor: estado.tipoBusqueda })}
      ${estado.texto.trim() === '' ? Vacio({ icono: '🔍', texto: 'Escribe para buscar.' }) : ListaContenidos({ contenidos: resultados, vacio: 'Sin resultados.' })}
    </div>`
}

// P2 · Sprint 2: la ficha (#/contenido/7). Me gusta, quiero escuchar y reseña son del Sprint 3.
function PantallaContenido({ estado, id }) {
  const contenido = CONTENIDOS.find((c) => c.id === id)
  if (!contenido) return null
  const resena = estado.resenas.find((r) => r.contenidoId === contenido.id)
  return `
    <article class="stack">
      <div class="card">${Caratula({ contenido })}</div>
      <div class="row">${EtiquetaTipo({ tipo: contenido.tipo })}<span class="card-meta">${contenido.artista} · ${contenido.anio}</span></div>
      <p class="card-meta">${escuchasCortas(contenido.escuchasSemana)} escuchas esta semana</p>
      <section class="formulario stack">
        <h3>Lo tuyo ${MarcaSprint({ sprint: 3 })}</h3>
        <div class="row">
          <button class="btn btn-secundario" data-accion="me-gusta" data-valor="${contenido.id}">${estado.meGusta.includes(contenido.id) ? '💜 Te gusta' : '🤍 Me gusta'}</button>
          <button class="btn btn-secundario" data-accion="pendiente" data-valor="${contenido.id}">${estado.pendientes.includes(contenido.id) ? '✓ En «quiero escuchar»' : '＋ Quiero escuchar'}</button>
        </div>
        ${resena ? `<p><span class="estrellas">${'★'.repeat(resena.puntuacion)}${'☆'.repeat(5 - resena.puntuacion)}</span> ${resena.texto}</p>` : ''}
        <button class="btn" data-accion="abrir-resena" data-valor="${contenido.id}">✍️ ${resena ? 'Editar' : 'Escribir'} reseña</button>
      </section>
    </article>`
}

// P4 · Sprint 3: la biblioteca: me gusta y quiero escuchar
function PantallaBiblioteca({ estado }) {
  const ids = estado.vistaBiblioteca === 'Me gusta' ? estado.meGusta : estado.pendientes
  const contenidos = ids.map((id) => CONTENIDOS.find((c) => c.id === id))
  return `
    <div class="stack">
      ${Chips({ nombre: 'vista-biblioteca', opciones: ['Me gusta', 'Quiero escuchar'], valor: estado.vistaBiblioteca })}
      ${ListaContenidos({ contenidos, vacio: 'Todavía no hay nada aquí. Añádelo desde la ficha.' })}
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
