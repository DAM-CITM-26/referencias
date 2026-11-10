# Memoria del proyecto — Ludoteca

> **Ejemplo rellenado** de la plantilla `MEMORIA.md`, con la Ludoteca de clase y un equipo ficticio de tres personas (Ana, Biel y Carla). Solo está rellenado el **Sprint 1**, para que veáis el nivel de detalle que se pide; los otros sprints se rellenan igual.

## Equipo

| Persona | Usuario de GitHub | Rol principal (si lo hay) |
|---|---|---|
| Ana Puig | `anapuig` | Datos y lógica |
| Biel Soler | `bielsoler` | Componentes y pantallas |
| Carla Ruiz | `carlaruiz` | Estilos y revisión de PR |

- **Repositorio:** `github.com/<cuenta>/ludoteca`
- **Referencia:** https://dam-citm-26.github.io/referencias/ludoteca/
- **App publicada (GitHub Pages, desde el Sprint 2):** `https://<cuenta>.github.io/ludoteca/`
- **Tablero de Trello:** (enlace)
- **La app en una frase:** un catálogo de juegos de mesa donde guardas los que tienes y apuntas tus partidas.

---

## Fase de diseño (Entregables 1, 2 y 3)

| Entregable | Enlace | Qué contiene |
|---|---|---|
| E1 · Estrategia, Alcance y Estructura | (enlace al PDF) | Concepto, requisitos, sitemap, user flow, user stories, backlog |
| E2 · Prototipo interactivo | (enlace al PDF) | Wireframes, inventario, Mini Style Guide, prototipo en Figma |
| E3 · Dossier de diseño y prototipo final | (enlace al PDF) | Encuesta, prototipo final, test de usabilidad, matriz y lista de cambios |

- **Figma (prototipo final):** (enlace)

### Style Guide

Los valores están en las variables del principio de `src/index.css`, copiado de la referencia.

| Token | Valor | Variable |
|---|---|---|
| Color primario | `#2E6B57` | `--color-primario` |
| Color de acento | `#E8A33D` | `--color-acento` |
| Fondo | `#F6F5F1` | `--color-fondo` |
| Texto | `#1F2421` | `--color-texto` |
| Tipografía | la del sistema | `--fuente` |
| Radio de las esquinas | `12 px` | `--radio` |
| Espaciado base | `16 px` | `--espacio-4` |

---

## Decisiones técnicas del proyecto

- **Stack:** React + Vite, en JavaScript (`.jsx`), creado de cero a partir de nuestra referencia.
- **Estilos:** el CSS de la referencia en `src/index.css`. En el Sprint 3, el de cada componente propio pasará a su CSS Module.
- **Carpetas:** `src/components`, `src/pages`, `src/data`, `src/utils` y `docs`. El nivel de Atomic Design de cada componente está en `docs/mapa-referencia.md`.
- **Datos:** en el Sprint 1, `src/data/juegos.js`, copiado de `js/datos.js` de la referencia. En el Sprint 2 llegarán de la API, desde `src/data/api.js`.
- **Estado:** el filtro de duración vive en `Inicio`, porque solo lo usa esa pantalla. La navegación entre secciones llega en el Sprint 2, con React Router.
- **Publicación (desde el Sprint 2):** GitHub Pages, con despliegue automático en cada merge a `main`.
- **Reglas para la IA:** nuestro `AGENTS.md`, en la raíz (lo ampliamos al empezar cada sprint).

---

## Sprint 1 — La pantalla principal

**Fechas:** 09/11 → 18/11
**Objetivo:** el proyecto montado y la pantalla principal, con la referencia como guía: sus datos de ejemplo y su filtro con `useState`.

**Qué se hizo:**
- US-01 · Proyecto con Vite, estructura de carpetas y `README.md` · PR #1 (Carla)
- US-02 · `AGENTS.md` y `MEMORIA.md` · PR #2 (Ana)
- US-03 · Estilos de la referencia en `src/index.css` · PR #3 (Carla)
- US-04 · Cabecera y pantalla de inicio en `App.jsx` · PR #4 (Biel)
- US-05 · Mapa de la referencia y modelo de datos · PR #5 (todo el equipo)
- US-06 · Átomos: `EtiquetaDuracion`, `Valoracion` y `Portada` · PR #6 (Biel)
- US-07 · `FichaJuego`, `Carrusel` y `ListaJuegos` · PR #7 (Biel)
- US-08 · Lógica de duración en `src/utils/juegos.js` · PR #8 (Ana)
- US-09 · Chips de duración con el estado en `Inicio` (lifting state up) · PR #9 (Ana)

**Bitácora:**

#### 2026-11-10 · Decisión · Ana
**Situación:** en la referencia, `categorizarDuracion` está en `js/logica.js`, pero en la Ludoteca de clase la teníamos dentro de `FichaJuego.jsx`.
**Qué probamos / discutimos:** dejarla dentro del componente, como en clase, o sacarla a `src/utils/`.
**Decisión:** a `src/utils/juegos.js`, junto con `filtrarPorDuracion`. La usan la tarjeta, la etiqueta y los chips, y así en el Sprint 3 le podremos hacer tests.
**Impacto:** `FichaJuego` queda más corto y solo pinta. Commit `a1b2c3d`.
**Enlaces:** PR #8 · tarjeta US-08

#### 2026-11-11 · Problema · Carla
**Situación:** después de copiar el CSS de la referencia, el título de la cabecera salía con la tipografía del navegador, no con la nuestra.
**Qué probamos / discutimos:** en `index.html` seguía el `<link>` de la fuente que trae Vite, y faltaba el de nuestra referencia.
**Decisión:** copiamos también el `<link>` de Google Fonts de la referencia en `index.html`.
**Impacto:** se ve igual que la referencia. Lo apuntamos: al copiar los estilos, revisar también el `<head>` de `index.html`.
**Enlaces:** PR #4

#### 2026-11-12 · Aprendizaje · Biel
**Situación:** en la referencia, al pulsar un chip, `app.js` cambia `estado.duracion` y llama a `pintar()`. Al traducirlo, pusimos el `useState` dentro de `Chips`.
**Qué probamos / discutimos:** los chips cambiaban de color, pero la lista no se filtraba, porque `ListaJuegos` no sabía qué chip estaba elegido.
**Decisión:** subimos el estado a `Inicio`, el padre común, y se lo pasamos a `Chips` como `valor` y `onCambio` (lifting state up, clase 12).
**Impacto:** los chips y la lista se ponen de acuerdo solos. Ya no hace falta nada parecido a `pintar()`: React vuelve a pintar al cambiar el estado.
**Enlaces:** PR #9 · commit `d4e5f6a`

#### 2026-11-14 · Cambio de backlog · Carla
**Situación:** el carrusel de novedades de la referencia es una pieza del Sprint 1, pero no llegábamos con todo.
**Qué probamos / discutimos:** quitarlo o hacerlo sin pulir.
**Decisión:** el carrusel entra tal cual, con las clases de la referencia (`carrusel`), porque es un `.map()` como la rejilla. Lo que pasa al Sprint 2 es la pantalla de detalle, que habíamos adelantado.
**Impacto:** Sprint 1 completo según la referencia; la tarjeta de detalle vuelve a la columna del Sprint 2.
**Enlaces:** tarjeta US-10

**Registro de IA:**

| Fecha | Quién | Herramienta | Para qué (US / PR) | Qué le pedimos | Qué aceptamos | Qué corregimos y por qué |
|---|---|---|---|---|---|---|
| 10/11 | Biel | OpenCode + Qwen | US-06 · PR #6 | Le pegué la función `Valoracion()` de la referencia y le pedí que me explicara qué props necesitaría, sin código | Que bastaba con la prop `valor` | Nada: escribí yo el componente |
| 11/11 | Ana | ChatGPT (gratis) | US-09 · PR #9 | Pegué `AGENTS.md` y `Inicio.jsx`; pedí que revisara el filtro | La pista de que el estado tenía que estar en el padre | Proponía `useMemo` para la lista filtrada: está prohibido en `AGENTS.md` y no hace falta. La lista se calcula en cada render |
| 12/11 | Biel | OpenCode + Qwen | US-07 · PR #7 | Le pedí traducir la pantalla de Inicio entera | Nada | Devolvió todo de golpe y con `document.querySelector` para los chips, que no se hace en React. Lo descartamos y traducimos pieza a pieza |
| 13/11 | Carla | OpenCode + Qwen | US-03 · PR #3 | Por qué el título no tenía nuestra tipografía | El diagnóstico (faltaba el `<link>` de la fuente en `index.html`) | Proponía escribir la fuente a mano con `@font-face`; bastaba con copiar el `<link>` de la referencia |
| 14/11 | Carla | — | Revisión de PR #6-#9 | (sin IA) | — | Revisé cada PR con la referencia abierta al lado en modo móvil; pedí un cambio de nombre en el PR #9 |

*(Como muestra hay 4 entradas de bitácora y 5 filas de IA. En un sprint real, cada persona tendría al menos 1 entrada y 2 filas. Fijaos en las filas del 11/11 y del 12/11: la IA se salió de lo visto en clase, y se cuenta cómo se detectó.)*

**Un commit del sprint, como ejemplo:**

```
feat(inicio): FichaJuego como componente con props

Referencia: la función FichaJuego() de js/componentes.js
Qué: pinta un juego con su portada, su nombre y sus jugadores
Por qué: se repite en la rejilla y en el carrusel de Inicio
Cómo: recibe juego por props; class pasa a ser className
Concepto: props (clase 9)
IA: ninguna
```

**Retrospectiva:**
- **Mantenemos:** revisar cada PR con la referencia abierta al lado, en modo móvil.
- **Cambiamos:** darle a la IA una fila del mapa cada vez. Cuando le pedimos la pantalla entera, la respuesta no servía.
- **La IA nos explicó** las props de cada pieza y revisó el filtro, **y lo comprobamos así:** leyendo cada línea antes del commit, buscando lo prohibido de `AGENTS.md` y comparando con la referencia en el móvil.

---

## Sprint 2 — Datos de la API y navegación

*(Se rellena igual que el Sprint 1.)*

---

## Sprint 3 — Lo vuestro, tests y cierre

*(Se rellena igual que el Sprint 1, más las tablas de pruebas unitarias, Lighthouse y la comprobación en el móvil de la plantilla.)*
