# Referencias del proyecto · DAM 2026-27

Cada equipo tiene aquí su **referencia**: su **MVP** (*Minimum Viable Product*, producto mínimo viable) hecho en HTML, CSS y JavaScript. Es la versión más pequeña de vuestra app que ya funciona de verdad, y lo que tenéis que hacer en React, sprint a sprint.

**Todas las referencias:** https://dam-citm-26.github.io/referencias/

| App | Equipo | Web | Código |
|---|---|---|---|
| **CraftMeet** | 3T | [Abrir](https://dam-citm-26.github.io/referencias/craftmeet/) | [`craftmeet/`](craftmeet/) |
| **Inkverse** | Bug Hub | [Abrir](https://dam-citm-26.github.io/referencias/inkverse/) | [`inkverse/`](inkverse/) |
| **Brot** | Bumbum | [Abrir](https://dam-citm-26.github.io/referencias/brot/) | [`brot/`](brot/) |
| **Playlog** | Chicharrón | [Abrir](https://dam-citm-26.github.io/referencias/playlog/) | [`playlog/`](playlog/) |
| **Groovd** | Chimichuelitos | [Abrir](https://dam-citm-26.github.io/referencias/groovd/) | [`groovd/`](groovd/) |
| **CS:NOW** | Choripan | [Abrir](https://dam-citm-26.github.io/referencias/cs-now/) | [`cs-now/`](cs-now/) |
| **Espies de Veritat** | Espies de Veritat | [Abrir](https://dam-citm-26.github.io/referencias/espies-de-veritat/) | [`espies-de-veritat/`](espies-de-veritat/) |
| **Doctor Árbol** | Kolokn | [Abrir](https://dam-citm-26.github.io/referencias/doctor-arbol/) | [`doctor-arbol/`](doctor-arbol/) |
| **Supereasy** | Malcom Industries | [Abrir](https://dam-citm-26.github.io/referencias/supereasy/) | [`supereasy/`](supereasy/) |
| **Nexus** | Mimi | [Abrir](https://dam-citm-26.github.io/referencias/nexus/) | [`nexus/`](nexus/) |
| **OhM** | Xoxe | [Abrir](https://dam-citm-26.github.io/referencias/ohm/) | [`ohm/`](ohm/) |
| **Ludoteca** | Ejemplo de clase | [Abrir](https://dam-citm-26.github.io/referencias/ludoteca/) | [`ludoteca/`](ludoteca/) |

## Lo que hay además de la app

- **El plan de vuestro proyecto:** una propuesta, sprint a sprint, de pantallas, datos, lógica y comunicación, en la carpeta de vuestra app: `…/referencias/<vuestra-app>/plan.html`. Por ejemplo, [el de Brot](https://dam-citm-26.github.io/referencias/brot/plan.html).
- **Las plantillas** de `AGENTS.md` y `MEMORIA.md`: en [`plantillas/`](plantillas/).

## Cómo verla

### En el ordenador

1. Abrid el enlace de vuestra app.
2. Vedla como en un móvil: en **Firefox**, `Ctrl+Shift+M`. En **Chrome**, primero `F12` y después `Ctrl+Shift+M`. Arriba podéis elegir el modelo de móvil.

### En el móvil

1. Abrid el mismo enlace en el navegador del móvil.
2. Para instalarla como una app:
   - **Android (Chrome):** menú `⋮` → «Añadir a pantalla de inicio» o «Instalar aplicación».
   - **iPhone (Safari):** botón **Compartir** → «Añadir a pantalla de inicio».
3. Instalada, se abre a pantalla completa y funciona sin conexión.

## Qué toca en cada sprint

Cada pantalla lleva arriba una **franja de color** con su sprint, y la etiqueta de arriba a la derecha abre **«Qué toca en cada sprint»**, con todas las piezas de vuestra app repartidas:

| Franja | Sprint | Fechas |
|---|---|---|
| 🟩 Verde | Sprint 1 | del 9 al 18 de noviembre |
| 🟪 Morada | Sprint 2 | del 18 de noviembre al 2 de diciembre |
| 🟧 Naranja | Sprint 3 | del 2 al 16 de diciembre |

Si un botón o un bloque de una pantalla es de un sprint posterior, lleva una etiqueta pequeña (`S2`, `S3`). Las fichas de detalle, a las que se llega pulsando una tarjeta, son del Sprint 2.

## Cómo está hecha por dentro

| Fichero | Qué tiene | En React |
|---|---|---|
| `index.html` | El esqueleto fijo: cabecera, contenido y barra de pestañas | `index.html` y `App.jsx` |
| `css/estilos.css` | Los tokens de vuestra Style Guide y una clase por pieza | Se copia a `src/index.css` |
| `js/datos.js` | Los datos de ejemplo, escritos en el código | `src/data/` (Sprint 1) y la API (Sprint 2) |
| `js/logica.js` | Funciones puras: filtrar, ordenar, calcular | `src/utils/`, con pruebas en el Sprint 3 |
| `js/componentes.js` | Una función por pieza, que devuelve HTML | Un componente con props en `src/components/` |
| `js/app.js` | El estado, las rutas y `pintar()` | `useState`, React Router y Context |

El código de React **no tiene que ser igual** que el de la referencia: tiene que **funcionar** como ella y **verse, como mínimo, como ella**. Si queréis, podéis acercar el aspecto a vuestro Figma. Y todo lo que hay en vuestro repositorio, también lo que salga de aquí, lo tenéis que saber explicar.

El ejemplo completo, de la referencia de la Ludoteca a React, rama a rama y commit a commit: [DAM-CITM-26/ludoteca-react](https://github.com/DAM-CITM-26/ludoteca-react).
