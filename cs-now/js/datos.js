// DATOS · escritos en el código para que la referencia funcione sin servidor.
// En React (Sprint 2) no se copian: llegan de la API, desde src/data/api.js,
// y la pantalla muestra «cargando», un error con «Reintentar» o «sin resultados».
// Cada elemento sigue el modelo de docs/datos.md.

const EQUIPOS = [
  {"id": 1, "nombre": "Vitality", "pais": "🇫🇷", "puntos": 1000},
  {"id": 2, "nombre": "Spirit", "pais": "🇷🇺", "puntos": 912},
  {"id": 3, "nombre": "MOUZ", "pais": "🇪🇺", "puntos": 880},
  {"id": 4, "nombre": "FaZe", "pais": "🇪🇺", "puntos": 796},
  {"id": 5, "nombre": "NAVI", "pais": "🇺🇦", "puntos": 771},
  {"id": 6, "nombre": "G2", "pais": "🇪🇺", "puntos": 702},
  {"id": 7, "nombre": "Astralis", "pais": "🇩🇰", "puntos": 610},
  {"id": 8, "nombre": "Heroic", "pais": "🇩🇰", "puntos": 589},
]

const PARTIDOS = [
  {"id": 1, "torneo": "IEM Cologne", "hora": "14:00", "estado": "Terminado", "equipoA": 1, "equipoB": 4, "marcadorA": 13, "marcadorB": 9, "mapa": "Mirage"},
  {"id": 2, "torneo": "IEM Cologne", "hora": "17:00", "estado": "En directo", "equipoA": 2, "equipoB": 5, "marcadorA": 8, "marcadorB": 10, "mapa": "Inferno"},
  {"id": 3, "torneo": "IEM Cologne", "hora": "20:00", "estado": "Próximo", "equipoA": 3, "equipoB": 6, "marcadorA": 0, "marcadorB": 0, "mapa": "Nuke"},
  {"id": 4, "torneo": "BLAST Premier", "hora": "15:30", "estado": "Terminado", "equipoA": 7, "equipoB": 8, "marcadorA": 11, "marcadorB": 13, "mapa": "Ancient"},
  {"id": 5, "torneo": "BLAST Premier", "hora": "18:30", "estado": "En directo", "equipoA": 1, "equipoB": 6, "marcadorA": 6, "marcadorB": 6, "mapa": "Anubis"},
  {"id": 6, "torneo": "ESL Pro League", "hora": "16:00", "estado": "Terminado", "equipoA": 3, "equipoB": 5, "marcadorA": 13, "marcadorB": 7, "mapa": "Dust2"},
  {"id": 7, "torneo": "ESL Pro League", "hora": "21:00", "estado": "Próximo", "equipoA": 2, "equipoB": 7, "marcadorA": 0, "marcadorB": 0, "mapa": "Mirage"},
]
