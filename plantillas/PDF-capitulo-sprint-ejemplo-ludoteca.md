# Capítulo del Sprint 1 · PDF del MVP · Ejemplo: la Ludoteca

> **Ejemplo rellenado** de la plantilla `PDF-capitulo-sprint.md`, con la Ludoteca de clase y un equipo ficticio de tres personas (Ana, Biel y Carla). Es el capítulo que añadirían a su PDF al cerrar el Sprint 1.

## Sprint 1 — La pantalla principal

**Fechas:** 09/11 → 18/11

### 1. El alcance del sprint

| Pieza de la referencia | Estado | Tarjeta de Trello y PR |
|---|---|---|
| Inicio: novedades en carrusel | Hecha | S1-3 · PR #7 |
| Inicio: todos los juegos, en rejilla | Hecha | S1-3 · PR #7 |
| Inicio: chips de duración | Hecha | S1-C · PR #9 |

### 2. Capturas de la app en el móvil

*(Aquí, la captura de Inicio en el móvil.)*

### 3. Cambios respecto al diseño

Ninguno en este sprint: la pantalla de Inicio es igual que en la referencia.

### 4. El mapa de componentes

- **Inicio** (pantalla, `src/pages`): el estado, la duración elegida.
  - **Carrusel** (organismo) → **FichaJuego** (molécula) → **Portada**, **Valoracion** y **EtiquetaDuracion** (átomos).
  - **Chips** (molécula): controlado, recibe `valor` y `onCambio`.
  - **ListaJuegos** (organismo) → **FichaJuego** (molécula) y **Vacio** (átomo).

### 5. Los datos

Un juego: `id`, `nombre`, `autoria`, `jugadores`, `duracion`, `color`, `editorial { nombre, pais }`, `valoracion`, `categoria`, `descripcion`, `novedad` (la tabla completa, en `docs/datos.md`). En el Sprint 1, de ejemplo, en `src/data/juegos.js`.

### 6. Enlaces

- **Repositorio:** github.com/DAM-CITM-26/ludoteca-react
- **Último commit de `main` que se entrega:** (el hash)
- **Tablero de Trello:** (enlace)

### 7. Bitácora

> **2026-11-10 · Decisión · Ana**
> **Situación:** en la referencia, `categorizarDuracion` está en `js/logica.js`, pero en la Ludoteca de clase la teníamos dentro de `FichaJuego.jsx`.
> **Qué probamos / discutimos:** dejarla dentro del componente, como en clase, o sacarla a `src/utils/`.
> **Decisión:** a `src/utils/juegos.js`, junto con `filtrarPorDuracion`. La usan la tarjeta, la etiqueta y los chips, y así en el Sprint 3 le podremos hacer tests.
> **Impacto:** `FichaJuego` queda más corto y solo pinta. Commit `a1b2c3d`.
> **Enlaces:** PR #8 · tarjeta S1-L

> **2026-11-11 · Problema · Carla**
> **Situación:** después de copiar el CSS de la referencia, el título de la cabecera salía con la tipografía del navegador, no con la nuestra.
> **Qué probamos / discutimos:** en `index.html` seguía el `<link>` de la fuente que trae Vite, y faltaba el de nuestra referencia.
> **Decisión:** copiamos también el `<link>` de Google Fonts de la referencia en `index.html`.
> **Impacto:** se ve igual que la referencia. Lo apuntamos: al copiar los estilos, revisar también el `<head>` de `index.html`.
> **Enlaces:** PR #4

> **2026-11-12 · Aprendizaje · Biel**
> **Situación:** en la referencia, al pulsar un chip, `app.js` cambia `estado.duracion` y llama a `pintar()`. Al traducirlo, pusimos el `useState` dentro de `Chips`.
> **Qué probamos / discutimos:** los chips cambiaban de color, pero la lista no se filtraba, porque `ListaJuegos` no sabía qué chip estaba elegido.
> **Decisión:** subimos el estado a `Inicio`, el padre común, y se lo pasamos a `Chips` como `valor` y `onCambio` (lifting state up, clase 12).
> **Impacto:** los chips y la lista se ponen de acuerdo solos. Ya no hace falta nada parecido a `pintar()`: React vuelve a pintar al cambiar el estado.
> **Enlaces:** PR #9 · commit `d4e5f6a`

> **2026-11-14 · Cambio de backlog · Carla**
> **Situación:** el carrusel de novedades de la referencia es una pieza del Sprint 1, pero no llegábamos con todo.
> **Qué probamos / discutimos:** quitarlo o hacerlo sin pulir.
> **Decisión:** el carrusel entra tal cual, con las clases de la referencia (`carrusel`), porque es un `.map()` como la rejilla. Lo que pasa al Sprint 2 es la pantalla de detalle, que habíamos adelantado.
> **Impacto:** Sprint 1 completo según la referencia; la tarjeta de detalle vuelve a la columna del Sprint 2.
> **Enlaces:** tarjeta S2 · Ficha del juego

### 8. Registro de IA

| Fecha | Quién | Herramienta | Para qué (US / PR) | Qué le pedimos | Qué aceptamos | Qué corregimos y por qué |
|---|---|---|---|---|---|---|
| 10/11 | Biel | OpenCode + Qwen | S1-3 · PR #6 | Le pegué la función `Valoracion()` de la referencia y le pedí que me explicara qué props necesitaría, sin código | Que bastaba con la prop `valor` | Nada: escribí yo el componente |
| 11/11 | Ana | ChatGPT (gratis) | S1-C · PR #9 | Pegué `AGENTS.md` y `Inicio.jsx`; pedí que revisara el filtro | La pista de que el estado tenía que estar en el padre | Proponía `useMemo` para la lista filtrada: está prohibido en `AGENTS.md` y no hace falta. La lista se calcula en cada render |
| 12/11 | Biel | OpenCode + Qwen | S1-3 · PR #7 | Le pedí traducir la pantalla de Inicio entera | Nada | Devolvió todo de golpe y con `document.querySelector` para los chips, que no se hace en React. Lo descartamos y traducimos pieza a pieza |
| 13/11 | Carla | OpenCode + Qwen | S1-2 · PR #3 | Por qué el título no tenía nuestra tipografía | El diagnóstico (faltaba el `<link>` de la fuente en `index.html`) | Proponía escribir la fuente a mano con `@font-face`; bastaba con copiar el `<link>` de la referencia |
| 14/11 | Carla | — | Revisión de PR #6-#9 | (sin IA) | — | Revisé cada PR con la referencia abierta al lado en modo móvil; pedí un cambio de nombre en el PR #9 |

*(Como muestra hay 4 entradas de bitácora y 5 filas de IA. En un sprint real, cada persona tendría al menos 1 entrada y, si usa IA, 2 filas. Fijaos en las filas del 11/11 y del 12/11: la IA se salió de lo visto en clase, y se cuenta cómo se detectó.)*

### 9. Retrospectiva

- **Mantenemos:** revisar cada PR con la referencia abierta al lado, en modo móvil.
- **Cambiamos:** darle a la IA una fila del mapa cada vez. Cuando le pedimos la pantalla entera, la respuesta no servía.
- **La IA nos explicó** las props de cada pieza y revisó el filtro, **y lo comprobamos así:** leyendo cada línea antes del commit, buscando lo prohibido de `AGENTS.md` y comparando con la referencia en el móvil.
