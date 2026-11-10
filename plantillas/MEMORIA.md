# Memoria del proyecto — [Nombre de la app]

> **Plantilla oficial de memoria · DAM 2026-27.**
>
> - **Esqueleto:** estos son los apartados y las tablas que tiene que tener vuestra memoria. Copiadlo a la raíz de vuestro repositorio como `MEMORIA.md` y rellenadlo vosotros.
> - **Para qué:** es el diario del equipo: cómo habéis trabajado, qué decidisteis y por qué, y cómo usasteis la IA. El producto (capturas, cambios de diseño, mapa de componentes) va en el PDF del MVP, en Atenea: aquí no se copia.
> - **Es un documento vivo:** crece durante todo el proyecto, con una sección por sprint.
> - **La lee también la IA:** vuestro `AGENTS.md` le pide que la lea antes de proponer nada. Si una decisión no está aquí, la IA no la conoce: tenedla siempre al día.
> - **Cuándo se escribe:** a lo largo de cada sprint, no la noche antes de la Review (la fecha de los commits lo delata). Una fila en el **registro de IA** al cerrar cada Pull Request en el que hayáis usado IA; una entrada en la **bitácora** cada vez que pase algo que valga la pena contar.
> - **Cómo se evalúa:** en cada Sprint Review se mira la parte de ese sprint (bitácora y registro de IA puntúan en la rúbrica). En la entrega final, la memoria completa.
> - **Idioma:** castellano o catalán, pero el mismo en todo el documento.
> - **La IA puede ayudaros a redactar, pero el contenido es vuestro:** lo que pasó, lo que decidisteis y por qué. Si la usáis para redactar, se declara en el registro de IA como cualquier otro uso. Un texto generado y pegado tal cual no cuenta como bitácora.
> - Hay un ejemplo rellenado en `MEMORIA-ejemplo-ludoteca.md`.

## Equipo

| Persona | Usuario de GitHub | Rol principal (si lo hay) |
|---|---|---|
| | | |
| | | |
| | | |

- **Repositorio:**
- **Referencia:** https://dam-citm-26.github.io/referencias/…/
- **App publicada (GitHub Pages, desde el Sprint 2):**
- **Tablero de Trello:**
- **La app en una frase:**

---

## Fase de diseño (Entregables 1, 2 y 3)

> No se copia: se **enlaza**. Poned el enlace a cada PDF entregado (Atenea o Drive) y, si algo cambió después, contadlo en la bitácora del sprint en que cambió, no aquí.

| Entregable | Enlace | Qué contiene |
|---|---|---|
| E1 · Estrategia, Alcance y Estructura | | Concepto, requisitos, sitemap, user flow, user stories, backlog |
| E2 · Prototipo interactivo | | Wireframes, inventario de componentes, Mini Style Guide, prototipo en Figma |
| E3 · Dossier de diseño y prototipo final | | Encuesta, prototipo final, test de usabilidad, matriz y lista de cambios |

- **Figma (prototipo final):**

### Style Guide (sí se copia: la necesita la IA)

> Este bloque es el que pegaréis a la IA para que respete vuestro diseño, así que tiene que estar aquí, completo y con valores exactos.

| Token | Valor | Uso |
|---|---|---|
| Color primario | `#______` | Botones principales, pestaña activa |
| Color secundario | `#______` | |
| Fondo | `#______` | |
| Texto | `#______` | |
| Tipografía de títulos | | |
| Tipografía de texto | | |
| Radio de las esquinas | `__ px` | Tarjetas, botones |
| Espaciado base | `__ px` | |

---

## Decisiones técnicas del proyecto

> Se rellena una vez y solo se toca si cambia algo (y entonces se cuenta en la bitácora).

- **Stack:** React + Vite, en **JavaScript** (`.jsx`), creado de cero a partir de nuestra referencia.
- **Estilos:** el CSS de la referencia en `src/index.css`; en el Sprint 3, el de cada componente propio en su CSS Module.
- **Carpetas:** `src/components`, `src/pages`, `src/data`, `src/utils` y `docs`. El nivel de Atomic Design de cada componente está en `docs/mapa-referencia.md`.
  -
- **Datos:** de dónde salen (API pública o `dam-fake-api`) y cómo se llaman (`src/data/...`).
  -
- **Estado compartido:** qué vive en `App` o en un Context, y por qué.
  -
- **Publicación (desde el Sprint 2):** GitHub Pages, con despliegue automático en cada merge a `main`.
- **Reglas para la IA:** nuestro `AGENTS.md`, en la raíz del repositorio (lo ampliamos al empezar cada sprint).

### Cómo trabajamos con Git

- **Una rama por historia de Trello:** `us-07-buscar-talleres`, `fix-us-07-filtro-vacio`…
- **Nada directo a `main`:** cada historia entra con un Pull Request revisado y aprobado por otra persona del equipo.
- **Commits pequeños** con el formato:

  ```
  tipo(ámbito): resumen

  Qué: …
  Por qué: …
  Cómo: … (nombrando el concepto de clase: props, lifting state up, useEffect…)
  IA: … (solo si hubo IA: con qué y quién lo revisó)
  ```

  Tipos: `feat` (funcionalidad), `fix` (arreglo), `style` (diseño), `refactor`, `test`, `docs`, `chore` (configuración).

---

## Formato de la bitácora y del registro de IA

> **Qué es cada cosa:** el **commit** dice qué cambió en el código; la **bitácora**, qué decidimos o qué nos pasó; el **registro de IA**, cómo usamos la IA y qué tuvimos que corregir. Los tres se enlazan entre sí.

**Una entrada de bitácora** (3-6 líneas, que se entienda sin haber estado allí):

```markdown
#### AAAA-MM-DD · Tipo · Autor/a
**Situación:** qué pasaba (con un dato concreto: pantalla, componente, error…).
**Qué probamos / discutimos:** las opciones que hubo.
**Decisión:** qué hicimos y por qué.
**Impacto:** qué cambió después (en la app, en el backlog, en cómo trabajamos).
**Enlaces:** PR #… · commit … · tarjeta US-…
```

- **Tipos:** `Decisión` (elegir entre opciones) · `Problema` (algo falló y cómo se resolvió) · `Cambio de backlog` (entra o sale una historia, y por qué) · `Aprendizaje` (algo que no sabíamos).
- **No cuenta como entrada:** «hoy hemos hecho la pantalla de inicio». Eso ya lo dice el commit.

**El registro de IA** (una tabla por sprint):

| Fecha | Quién | Herramienta | Para qué (US / PR) | Qué le pedimos | Qué aceptamos | Qué corregimos y por qué |
|---|---|---|---|---|---|---|

- **Qué le pedimos:** un **resumen de 1-2 líneas** de lo que le pedisteis y con qué contexto. Es obligatorio para todos y es lo que se evalúa. Si vuestra herramienta permite compartir la conversación (enlace de ChatGPT, `/share` o sesión exportada de OpenCode), podéis añadir el enlace, pero es opcional y no da más nota.
- **Al menos una fila por sprint en la que la IA se equivocó o se salió de lo visto en clase**, y cómo lo detectasteis.
- **Si en un sprint no habéis usado IA**, escribidlo tal cual: «Este sprint no hemos usado IA». En la Review se preguntará igual por el código.
- La línea `IA:` de un commit remite a una fila de esta tabla.

**Mínimo por persona y sprint:** 1 entrada de bitácora y 2 filas en el registro de IA (una de ellas, una vez en que la IA se equivocó o se salió de lo visto en clase). Cada entrada lleva el nombre de quien la escribe.

---

## Sprint 1 — [Título del sprint]

**Fechas:** [inicio] → [Sprint Review]
**Objetivo:** el proyecto montado y la pantalla principal, con la referencia como guía: sus datos de ejemplo y su filtro con `useState`.

**Qué se hizo** (historias cerradas, con su PR):
- US-__ · … · PR #__

**Bitácora:**

**Registro de IA:**

| Fecha | Quién | Herramienta | Para qué (US / PR) | Qué le pedimos | Qué aceptamos | Qué corregimos y por qué |
|---|---|---|---|---|---|---|
| | | | | | | |

**Retrospectiva** (3 líneas):
- **Mantenemos:**
- **Cambiamos:**
- **La IA generó… y lo comprobamos así:**

---

## Sprint 2 — [Título del sprint]

**Fechas:** [inicio] → [Sprint Review]
**Objetivo:** los datos llegan de una API (cargando, error y sin resultados), cada elemento tiene su pantalla de detalle con dirección propia, hay una página de «no encontrado» y la mayoría de pantallas son navegables.

**Qué se hizo** (historias cerradas, con su PR):
- US-__ · … · PR #__

**Bitácora:**

**Registro de IA:**

| Fecha | Quién | Herramienta | Para qué (US / PR) | Qué le pedimos | Qué aceptamos | Qué corregimos y por qué |
|---|---|---|---|---|---|---|
| | | | | | | |

**Retrospectiva** (3 líneas):
- **Mantenemos:**
- **Cambiamos:**
- **La IA generó… y lo comprobamos así:**

---

## Sprint 3 — [Título del sprint]

**Fechas:** [inicio] → [Sprint Review]
**Objetivo:** la última pantalla y la acción que falta; lo que guarda el usuario se recuerda al cerrar la app; pruebas unitarias de las funciones que calculan; accesibilidad y rendimiento con Lighthouse; todo funciona con la app instalada en el móvil.

**Qué se hizo** (historias cerradas, con su PR):
- US-__ · … · PR #__

**Pruebas unitarias con Vitest** (al menos una por persona, de una función distinta, y al menos 3 por equipo):

| Quién | Fichero | Función que se prueba | Caso normal | Caso límite |
|---|---|---|---|---|
| | `src/utils/….test.js` | | | |

**La app instalada en el móvil** (se comprueba en clase):

| Qué se comprueba | ¿Funciona? | Qué falló y cómo se arregló |
|---|---|---|
| Se instala desde GitHub Pages y abre como una app | | |
| Cada pieza de la referencia funciona igual que en el ordenador | | |
| Lo guardado se recuerda al cerrarla y volverla a abrir | | |
| Sin conexión, muestra un aviso en lugar de romperse | | |

**Auditoría con Lighthouse** (sobre la app publicada, en clase):
- **Accesibilidad:** puntuación __ → qué marcó y qué corregisteis.
- **Rendimiento:** puntuación __ → una mejora aplicada o propuesta.

**Bitácora:**

**Registro de IA:**

| Fecha | Quién | Herramienta | Para qué (US / PR) | Qué le pedimos | Qué aceptamos | Qué corregimos y por qué |
|---|---|---|---|---|---|---|
| | | | | | | |

**Retrospectiva** (3 líneas):
- **Mantenemos:**
- **Cambiamos:**
- **La IA generó… y lo comprobamos así:**

---

## Cierre del proyecto

### Ética y sostenibilidad (media página)

> Retomad lo visto en la clase de accesibilidad, ética y sostenibilidad y aplicadlo a vuestra app: qué datos guarda y por qué, a quién podría dejar fuera, qué consume (imágenes, peticiones, animaciones) y qué habéis hecho, o haríais, para mejorarlo.

### Retrospectiva final de los 3 sprints

- **¿Qué funcionó bien como equipo?**
- **¿Qué cambiaríais si empezarais de nuevo?**
- **¿Qué os lleváis para el próximo proyecto?**
