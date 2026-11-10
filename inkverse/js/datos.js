// DATOS · escritos en el código para que la referencia funcione sin servidor.
// En React (Sprint 2) no se copian: llegan de la API, desde src/data/api.js,
// y la pantalla muestra «cargando», un error con «Reintentar» o «sin resultados».
// Cada elemento sigue el modelo de docs/datos.md.

const UNIVERSOS = [
  {"id": 1, "nombre": "Los juegos del hambre", "descripcion": "Panem, los distritos y los Juegos: los libros y su salto al cine.", "color": "#7A2E2E", "obras": [1, 2, 3, 4, 5, 6]},
  {"id": 2, "nombre": "Harry Potter", "descripcion": "El mundo mágico en papel, en el cine y en la escena.", "color": "#4B3A8C", "obras": [7, 8, 9, 10]},
  {"id": 3, "nombre": "Dune", "descripcion": "Arrakis, la especia y las adaptaciones de una saga enorme.", "color": "#9A6B2F", "obras": [11, 12, 13]},
]

const OBRAS = [
  {"id": 1, "titulo": "Los juegos del hambre", "formato": "Libro", "anio": 2008, "universoId": 1, "fidelity": null},
  {"id": 2, "titulo": "En llamas", "formato": "Libro", "anio": 2009, "universoId": 1, "fidelity": null},
  {"id": 3, "titulo": "Sinsajo", "formato": "Libro", "anio": 2010, "universoId": 1, "fidelity": null},
  {"id": 4, "titulo": "Los juegos del hambre", "formato": "Película", "anio": 2012, "universoId": 1, "fidelity": 82},
  {"id": 5, "titulo": "En llamas", "formato": "Película", "anio": 2013, "universoId": 1, "fidelity": 88},
  {"id": 6, "titulo": "Balada de pájaros cantores y serpientes", "formato": "Película", "anio": 2023, "universoId": 1, "fidelity": 75},
  {"id": 7, "titulo": "La piedra filosofal", "formato": "Libro", "anio": 1997, "universoId": 2, "fidelity": null},
  {"id": 8, "titulo": "El prisionero de Azkaban", "formato": "Libro", "anio": 1999, "universoId": 2, "fidelity": null},
  {"id": 9, "titulo": "El prisionero de Azkaban", "formato": "Película", "anio": 2004, "universoId": 2, "fidelity": 71},
  {"id": 10, "titulo": "Harry Potter", "formato": "Serie", "anio": 2027, "universoId": 2, "fidelity": null},
  {"id": 11, "titulo": "Dune", "formato": "Libro", "anio": 1965, "universoId": 3, "fidelity": null},
  {"id": 12, "titulo": "Dune", "formato": "Película", "anio": 2021, "universoId": 3, "fidelity": 84},
  {"id": 13, "titulo": "Dune: Prophecy", "formato": "Serie", "anio": 2024, "universoId": 3, "fidelity": 63},
]

const CONTINUAR = [
  {"obraId": 2, "progreso": 60},
  {"obraId": 9, "progreso": 30},
  {"obraId": 11, "progreso": 15},
]

const RESENAS = [
  {"obraId": 5, "autor": "lunareader", "texto": "La arena giratoria está igual que en el libro, y el final del vasallaje te deja sin aire.", "spoiler": true},
  {"obraId": 5, "autor": "panem_fan", "texto": "La fotografía es preciosa y la banda sonora acompaña muy bien.", "spoiler": false},
  {"obraId": 9, "autor": "potterhead", "texto": "Recortan mucho la explicación de quién es Lunático, Colagusano, Canuto y Cornamenta.", "spoiler": true},
  {"obraId": 12, "autor": "arrakis", "texto": "Visualmente brutal; se nota que solo adapta la primera mitad del libro.", "spoiler": false},
]
