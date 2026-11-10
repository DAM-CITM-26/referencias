// COMPONENTES · cada uno es una función que recibe un objeto (las "props")
// y devuelve HTML como texto. En React, cada función pasa a ser un componente:
// `${…}` pasa a ser {…}, class pasa a ser className, y .join('') desaparece.
// Los botones llevan data-accion: en React eso será un onClick con su función.
// Cada pantalla dice de qué sprint es; MarcaSprint señala lo que va en un sprint posterior.

const NOMBRES_NUTRIENTES = { proteinas: 'Proteínas (g)', hierro: 'Hierro (mg)', calcio: 'Calcio (mg)', fibra: 'Fibra (g)' }

// ── ÁTOMOS ──

function EtiquetaTiempo({ minutos }) {
  const clase = minutos <= 15 ? 'tag-rapida' : minutos <= 30 ? 'tag-media' : 'tag-larga'
  return `<span class="tag ${clase}">${minutos} min</span>`
}

function Portada({ receta }) {
  return `<div class="portada" style="background:var(--color-acento)" aria-hidden="true">${receta.emoji}</div>`
}

// ── MOLÉCULAS ──

function TarjetaReceta({ receta }) {
  return `
    <a class="card" href="#/receta/${receta.id}">
      ${Portada({ receta })}
      <div class="card-cuerpo">
        <h3>${receta.nombre}</h3>
        <p class="card-meta">${receta.tipo} · ${receta.ingredientes.length} ingredientes</p>
        ${EtiquetaTiempo({ minutos: receta.minutos })}
      </div>
    </a>`
}

function Buscador({ valor }) {
  return `
    <label class="field" for="buscar">Buscar receta o ingrediente
      <input id="buscar" type="search" value="${valor}" placeholder="Por ejemplo: garbanzos" data-campo="texto">
    </label>`
}

function BarraNutriente({ nombre, valor, objetivo }) {
  return `
    <div class="field">
      <div class="row" style="justify-content:space-between"><span>${nombre}</span><span class="card-meta">${Math.round(valor)} de ${objetivo}</span></div>
      <progress value="${porcentaje(valor, objetivo)}" max="100" style="width:100%; accent-color:var(--color-primario)"></progress>
    </div>`
}

// ── ORGANISMOS ──

function ListaRecetas({ recetas }) {
  if (recetas.length === 0) return Vacio({ icono: '🔍', texto: 'No hay recetas con esta búsqueda.' })
  return `<div class="grid">${recetas.map((receta) => TarjetaReceta({ receta })).join('')}</div>`
}

function Capas() {
  return ''
}

// ── PANTALLAS ──

// P1 · Sprint 1: recetas, con el buscador y los chips de tipo de plato
function PantallaInicio({ estado }) {
  const recetas = filtrarPorTipo(buscarRecetas(RECETAS, estado.texto), estado.tipo)
  return `
    <section class="seccion stack">
      ${Buscador({ valor: estado.texto })}
      ${Chips({ nombre: 'tipo', opciones: ['Todos', 'Desayuno', 'Comida', 'Cena', 'Postre'], valor: estado.tipo })}
      <p class="card-meta">${recetas.length} recetas</p>
      ${ListaRecetas({ recetas })}
    </section>`
}

// P2 · Sprint 2: la ficha de una receta (#/receta/7). «Lo he comido» es del Sprint 3.
function PantallaReceta({ id }) {
  const receta = RECETAS.find((r) => r.id === id)
  if (!receta) return null
  const nutrientes = nutrientesDeReceta(receta, NUTRIENTES)
  return `
    <article class="stack">
      <div class="card">${Portada({ receta })}</div>
      <div class="row">${EtiquetaTiempo({ minutos: receta.minutos })}<span class="tag">${receta.tipo}</span></div>
      <h2>Ingredientes</h2>
      <ul class="list">${receta.ingredientes.map((i) => `<li><span class="crece">${i.ingrediente}</span><b>${i.gramos} g</b></li>`).join('')}</ul>
      <h2>Pasos</h2>
      <ol>${receta.pasos.map((p) => `<li>${p}</li>`).join('')}</ol>
      <p class="card-meta">Por ración: ${Math.round(nutrientes.proteinas)} g de proteínas · ${nutrientes.hierro.toFixed(1)} mg de hierro · ${Math.round(nutrientes.calcio)} mg de calcio.</p>
      <p class="formulario">ℹ️ La información nutricional es orientativa: no sustituye el consejo de un profesional de la salud.</p>
      <div class="row"><button class="btn" data-accion="comido" data-valor="${receta.id}">Lo he comido hoy</button>${MarcaSprint({ sprint: 3 })}</div>
    </article>`
}

// P4 · Sprint 3: lo comido esta semana y el balance de nutrientes
function PantallaSemana({ estado }) {
  const objetivo = objetivoSemanal(estado.datos, NECESIDADES_DIA)
  const balance = balanceSemanal(estado.registros, RECETAS, NUTRIENTES)
  const comidas = estado.registros.map((r) => {
    const receta = RECETAS.find((x) => x.id === r.recetaId)
    return `<li><span class="avatar" style="background:var(--color-acento)">${receta.emoji}</span><div class="crece"><h3>${receta.nombre}</h3><p class="card-meta">${r.fecha}</p></div></li>`
  })
  return `
    <div class="stack">
      <section class="formulario stack">
        <h2>Balance de la semana</h2>
        ${Object.keys(NOMBRES_NUTRIENTES).map((clave) => BarraNutriente({ nombre: NOMBRES_NUTRIENTES[clave], valor: balance[clave], objetivo: objetivo[clave] })).join('')}
      </section>
      <h2>Lo que he comido</h2>
      ${comidas.length === 0 ? Vacio({ icono: '🍽️', texto: 'Pulsa «Lo he comido hoy» en una receta.' }) : `<ul class="list">${comidas.join('')}</ul>`}
    </div>`
}

// P5 · Sprint 3: los datos personales, de los que sale el objetivo semanal
function PantallaPerfil({ estado }) {
  return `
    <form class="formulario stack" data-formulario="datos">
      <h2>Tus datos</h2>
      <label class="field">Sexo
        <select name="sexo">${['Mujer', 'Hombre', 'Prefiero no decirlo'].map((o) => `<option ${estado.datos.sexo === o ? 'selected' : ''}>${o}</option>`).join('')}</select>
      </label>
      <label class="field">Situación
        <select name="situacion">${['Ninguna en especial', 'Embarazo o lactancia', 'Deportista'].map((o) => `<option ${estado.datos.situacion === o ? 'selected' : ''}>${o}</option>`).join('')}</select>
      </label>
      <button class="btn" type="submit">Guardar</button>
    </form>`
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
