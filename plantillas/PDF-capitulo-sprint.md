# Plantilla del capítulo de cada sprint · PDF del MVP · DAM 2026-27

> **Qué es:** los apartados que añadís a vuestro PDF del MVP (el mismo PDF de los Entregables 1, 2 y 3) al cerrar cada sprint. Se sube a Atenea, entero y con el capítulo nuevo, como tarde el jueves a las 23:59.
>
> - **Se escribe durante el sprint,** cuando pasan las cosas, no la noche antes de la Review.
> - **La IA puede ayudaros a redactar, pero el contenido es vuestro:** lo que pasó, lo que decidisteis y por qué. Si la usáis para redactar, se apunta en el registro de IA como cualquier otro uso.
> - Hay un ejemplo rellenado del Sprint 1 de la Ludoteca en `PDF-capitulo-sprint-ejemplo-ludoteca.md`.

## Sprint N — [Título del sprint]

**Fechas:** [inicio] → [Sprint Review]

### 1. El alcance del sprint

Las piezas de vuestra referencia de este sprint, cada una marcada como **hecha**, **pendiente** o **reducida** (si se redujo: por qué y cuándo se negoció con el profesor).

| Pieza de la referencia | Estado | Tarjeta de Trello y PR |
|---|---|---|
| | | |

### 2. Capturas de la app en el móvil

Cada pantalla del sprint. Si optáis al extra del Figma (+1 punto), cada captura al lado de su pantalla de Figma.

### 3. Cambios respecto al diseño

Lo que ha cambiado respecto al prototipo del Entregable 3, y por qué.

### 4. El mapa de componentes

Las pantallas del sprint: qué componentes hay, cuál está dentro de cuál, el nivel de Atomic Design de cada uno y dónde vive cada estado.

### 5. Los datos

El modelo de datos (el de `docs/datos.md`) y, desde el Sprint 2, la API: qué se pide y qué pantalla lo usa.

### 6. Enlaces

- **Repositorio:**
- **Último commit de `main` que se entrega:**
- **Tablero de Trello:**
- **App publicada (desde el Sprint 2):**

### 7. Bitácora

Al menos **una entrada por persona**. Cada entrada, con este formato (3-6 líneas, que se entienda sin haber estado allí):

> **AAAA-MM-DD · Tipo · Autor/a**
> **Situación:** qué pasaba (con un dato concreto: pantalla, componente, error…).
> **Qué probamos / discutimos:** las opciones que hubo.
> **Decisión:** qué hicimos y por qué.
> **Impacto:** qué cambió después (en la app, en el backlog, en cómo trabajamos).
> **Enlaces:** PR · commit · tarjeta.

- **Tipos:** Decisión (elegir entre opciones) · Problema (algo falló y cómo se resolvió) · Cambio de backlog (entra o sale una tarea, y por qué) · Aprendizaje (algo que no sabíamos).
- **No cuenta como entrada:** «hoy hemos hecho la pantalla de inicio». Eso ya lo dice el commit.

### 8. Registro de IA

**Si en este sprint no habéis usado IA,** escribidlo tal cual: «Este sprint no hemos usado IA».

Si la habéis usado, al menos **dos filas por persona**, incluida una en la que la IA se equivocó o se salió de lo visto en clase, y cómo lo detectasteis:

| Fecha | Quién | Herramienta | Para qué (tarjeta / PR) | Qué le pedimos (1-2 líneas) | Qué aceptamos | Qué corregimos y por qué |
|---|---|---|---|---|---|---|
| | | | | | | |

El enlace a la conversación es opcional y no da más nota.

### 9. Retrospectiva

- **Mantenemos:**
- **Cambiamos:**
- **Si usamos IA: la IA generó… y lo comprobamos así:**

---

## Solo en el Sprint 3

### Pruebas unitarias con Vitest

Al menos una por persona, de una función distinta, y al menos 3 por equipo.

| Quién | Fichero | Función que se prueba | Caso normal | Caso límite |
|---|---|---|---|---|
| | `src/utils/….test.js` | | | |

### La app instalada en el móvil (se comprueba en clase)

| Qué se comprueba | ¿Funciona? | Qué falló y cómo se arregló |
|---|---|---|
| Se instala desde GitHub Pages y abre como una app | | |
| Cada pieza de la referencia funciona igual que en el ordenador | | |
| Lo guardado se recuerda al cerrarla y volverla a abrir | | |
| Sin conexión, muestra un aviso en lugar de romperse | | |

### Lighthouse (sobre la app publicada, en clase)

- **Accesibilidad:** puntuación __ → qué marcó y qué corregisteis.
- **Rendimiento:** puntuación __ → una mejora aplicada o propuesta.

### El recorrido completo de la app

En capturas, de principio a fin.

### Ética y sostenibilidad (media página)

Retomad lo visto en la clase de accesibilidad, ética y sostenibilidad y aplicadlo a vuestra app: qué datos guarda y por qué, a quién podría dejar fuera, qué consume (imágenes, peticiones, animaciones) y qué habéis hecho, o haríais, para mejorarlo.

### Retrospectiva final de los 3 sprints

- **¿Qué funcionó bien como equipo?**
- **¿Qué cambiaríais si empezarais de nuevo?**
- **¿Qué os lleváis para el próximo proyecto?**
