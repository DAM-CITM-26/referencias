// COMPONENTES · cada uno es una función que recibe un objeto (las "props")
// y devuelve HTML como texto. En React, cada función pasa a ser un componente:
// `${…}` pasa a ser {…}, class pasa a ser className, y .join('') desaparece.
// Los botones llevan data-accion: en React eso será un onClick con su función.
// Cada pantalla dice de qué sprint es; MarcaSprint señala lo que va en un sprint posterior.

const NOMBRES_DIA = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']

// ── ÁTOMOS ──

function Horario({ tarea }) {
  return `<span class="tag">🕒 ${tarea.horaInicio}–${tarea.horaFin}</span>`
}

function EtiquetaHecha({ hecha }) {
  return hecha ? `<span class="tag tag-rapida">Hecha</span>` : `<span class="tag tag-media">Pendiente</span>`
}

// ── MOLÉCULAS ──

// La tarea (qué) y su horario (cuándo), claramente separados
function TarjetaTarea({ tarea }) {
  return `
    <a class="card" href="#/tarea/${tarea.id}">
      <div class="card-cuerpo">
        <div class="row" style="justify-content:space-between">${Horario({ tarea })}${EtiquetaHecha({ hecha: tarea.hecha })}</div>
        <h3>${tarea.titulo}</h3>
        <p class="card-meta">${tarea.categoria}</p>
      </div>
    </a>`
}

// ── ORGANISMOS ──

function ListaTareas({ tareas, vacio }) {
  if (tareas.length === 0) return Vacio({ icono: '🌤️', texto: vacio })
  return `<div class="stack">${tareas.map((tarea) => TarjetaTarea({ tarea })).join('')}</div>`
}

// Formulario en dos bloques: la tarea y su horario (crear, o editar si recibe una tarea)
function FormularioTarea({ hoy, tarea }) {
  const t = tarea || { titulo: '', categoria: 'Personal', fecha: hoy, horaInicio: '', horaFin: '' }
  return `
    <form class="formulario stack" data-formulario="tarea" aria-label="${tarea ? 'Editar tarea' : 'Crear tarea'}">
      <h2>${tarea ? 'Editar tarea' : 'Nueva tarea'}</h2>
      <fieldset class="stack" style="border:none; padding:0; margin:0">
        <legend class="card-meta">La tarea</legend>
        <label class="field">Qué hay que hacer
          <input name="titulo" type="text" value="${t.titulo}" placeholder="Por ejemplo: llamar al dentista" required>
        </label>
        <label class="field">Categoría
          <select name="categoria">${['Personal', 'Clase', 'Trabajo'].map((c) => `<option ${t.categoria === c ? 'selected' : ''}>${c}</option>`).join('')}</select>
        </label>
      </fieldset>
      <fieldset class="stack" style="border:none; padding:0; margin:0">
        <legend class="card-meta">El horario</legend>
        <label class="field">Día
          <input name="fecha" type="date" value="${t.fecha}" required>
        </label>
        <div class="row">
          <label class="field" style="flex:1">Empieza
            <input name="horaInicio" type="time" value="${t.horaInicio}" required>
          </label>
          <label class="field" style="flex:1">Termina
            <input name="horaFin" type="time" value="${t.horaFin}" required>
          </label>
        </div>
      </fieldset>
      <button class="btn" type="submit">${tarea ? 'Guardar cambios' : 'Crear tarea'}</button>
    </form>`
}

// Panel para editar una tarea (Sprint 3)
function Capas({ estado }) {
  if (estado.capa !== 'editar') return ''
  const tarea = estado.tareas.find((t) => t.id === estado.tareaCapa)
  return Panel({ titulo: 'Editar', contenido: FormularioTarea({ hoy: tarea.fecha, tarea }) })
}

// ── PANTALLAS ──

// P1 · Sprint 1: las tareas de hoy por hora, y el formulario para crear una (P5)
function PantallaHoy({ estado }) {
  const hoy = dentroDeDias(0)
  const tareas = ordenarPorHora(tareasDelDia(estado.tareas, hoy))
  return `
    <section class="seccion stack">
      <p class="card-meta">${tareas.length} tareas para hoy</p>
      ${ListaTareas({ tareas, vacio: 'Hoy no tienes nada pendiente.' })}
    </section>
    <section class="seccion">${FormularioTarea({ hoy })}</section>`
}

// P2 · Sprint 2: el detalle de una tarea (#/tarea/7). Marcar y editar son del Sprint 3.
function PantallaTarea({ estado, id }) {
  const tarea = estado.tareas.find((t) => t.id === id)
  if (!tarea) return null
  return `
    <article class="stack">
      <h2>${tarea.titulo}</h2>
      <div class="row">${Horario({ tarea })}${EtiquetaHecha({ hecha: tarea.hecha })}<span class="tag">${tarea.categoria}</span></div>
      <p class="card-meta">El ${tarea.fecha.split('-').reverse().join('/')}</p>
      <div class="row">
        <button class="btn" data-accion="marcar" data-valor="${tarea.id}">${tarea.hecha ? 'Marcar como pendiente' : '✓ Marcar como hecha'}</button>
        <button class="btn btn-secundario" data-accion="editar" data-valor="${tarea.id}">Editar</button>
        ${MarcaSprint({ sprint: 3 })}
      </div>
    </article>`
}

// P3 · Sprint 2: la semana, con sus tareas y los festivos (en la app real: Nager.Date)
function PantallaSemana({ estado }) {
  const dias = diasDeLaSemana(dentroDeDias(estado.semana * 7))
  const bloques = dias.map((fecha, i) => {
    const festivo = FESTIVOS.find((f) => f.fecha === fecha)
    const tareas = ordenarPorHora(tareasDelDia(estado.tareas, fecha))
    return `
      <section class="formulario stack">
        <h3>${NOMBRES_DIA[i]} ${fecha.split('-').reverse().slice(0, 2).join('/')}</h3>
        ${festivo ? `<span class="tag tag-larga">🎉 ${festivo.nombre}</span>` : ''}
        ${tareas.map((t) => `<a class="row enlace-fila" href="#/tarea/${t.id}">${Horario({ tarea: t })} ${t.titulo}</a>`).join('') || '<p class="card-meta">Sin tareas</p>'}
      </section>`
  })
  return `
    <div class="stack">
      <div class="row" style="justify-content:space-between">
        <button class="btn btn-secundario" data-accion="semana" data-valor="-1">← Anterior</button>
        <button class="btn btn-secundario" data-accion="semana" data-valor="1">Siguiente →</button>
      </div>
      ${bloques.join('')}
    </div>`
}

// P4 · Sprint 3: el progreso de la semana
function PantallaProgreso({ estado }) {
  const dias = diasDeLaSemana(dentroDeDias(0))
  const deLaSemana = estado.tareas.filter((t) => dias.includes(t.fecha))
  const porcentaje = progreso(deLaSemana)
  return `
    <section class="formulario stack">
      <h2>${porcentaje} %</h2>
      <progress value="${porcentaje}" max="100" style="width:100%; accent-color:var(--color-primario)"></progress>
      <p>${deLaSemana.filter((t) => t.hecha).length} de ${deLaSemana.length} tareas hechas esta semana.</p>
    </section>`
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
