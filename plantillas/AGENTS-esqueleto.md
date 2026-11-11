# AGENTS.md · [Nombre de la app] · DAM 2026-27

> **Esqueleto.** Estos son los apartados que tiene que tener vuestro `AGENTS.md`. Lo escribís vosotros, en la raíz del repositorio, con vuestras palabras; borrad estas notas en gris (las líneas que empiezan por `>`) cuando lo tengáis.
>
> - **Para quién es:** para la IA, no para las personas. OpenCode lo lee solo si lo abrís en la carpeta del repositorio (no uséis `/init`: lo reescribe). En un chat (ChatGPT u otro), pegadlo al empezar cada conversación.
> - **Para qué:** que la IA solo use lo que se ha visto en clase y que trabaje como copiloto.
> - **Es un documento vivo:** al empezar cada sprint, añadid lo nuevo de la tabla «Qué tenéis que usar en cada sprint» de la guía del proyecto. Cada vez que la IA se equivoque, añadid una regla en «Lo que hemos aprendido». Cada cambio, en un commit `docs(agents): …`.
> - **Cómo comprobar que funciona:** preguntadle a la IA «¿qué no puedes usar en este proyecto?». Tiene que responder con vuestra lista.

## Quiénes somos

> En 2-3 frases: que sois estudiantes aprendiendo React, que hacéis vuestra app a partir de una referencia en HTML, CSS y JavaScript, y que solo se puede usar lo visto en clase. Qué tiene que hacer la IA si algo necesitaría otra técnica: decíroslo y proponer cómo hacerlo con lo permitido.

## Stack

> Con qué se hace el proyecto: React con Vite, en JavaScript (`.jsx`), sin TypeScript; el CSS de la referencia en `src/index.css`; vuestras carpetas (`src/components`, `src/pages`, `src/data`, `src/utils`, `docs`) y qué va en cada una; que no se instala ninguna dependencia sin preguntar.

## Permitido (hasta el Sprint [N])

> Lo de la tabla «Qué tenéis que usar en cada sprint» de la guía del proyecto, hasta el sprint en curso. Una línea por cosa.

-

## Prohibido

> Lo que todavía no se ha visto en clase (con el sprint en que llega). Incluid siempre `document.querySelector`, `innerHTML` y `addEventListener`.

-

## Cómo tiene que responder

> Cómo queréis que os ayude. Lo primero: que lea `MEMORIA.md` antes de proponer nada, para respetar lo que ya habéis decidido y no repetir errores. Después, por ejemplo: el plan en 3-5 líneas antes del código y con qué concepto de clase; una pieza cada vez, nunca la pantalla entera; revisar vuestro código sin reescribirlo; proponer el mensaje de commit con su formato (`Qué`, `Por qué`, `Cómo`, `Referencia:`, `Concepto:`, `IA:`); los nombres de las props propias, distintos de los nativos (`onCambio`, no `onChange`).

-

## Nuestro proyecto

- **App:** [nombre] — [qué hace, en una frase]
- **Referencia:** https://dam-citm-26.github.io/referencias/[vuestra-app]/ (su código, en github.com/DAM-CITM-26/referencias)
- **Memoria del equipo:** `MEMORIA.md` (léela antes de proponer cambios)
- **Pantallas del sprint en curso:**
- **Modelo de datos:** `docs/datos.md`
- **Mapa de la referencia:** `docs/mapa-referencia.md`

## Lo que hemos aprendido

> Las reglas que añadís cuando la IA se equivoca, con la fecha. Por ejemplo: «10/11 · El estado de un filtro vive en la pantalla, no en los chips».

-
