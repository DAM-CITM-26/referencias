// DATOS · escritos en el código para que la referencia funcione sin servidor.
// En React (Sprint 2) no se copian: llegan de la API, desde src/data/api.js,
// y la pantalla muestra «cargando», un error con «Reintentar» o «sin resultados».
// Cada elemento sigue el modelo de docs/datos.md.

const INTERESES = [
  "Cerámica",
  "Costura",
  "Pintura",
  "Joyería",
  "Macramé",
  "Papel",
]

const TALLERES = [
  {"id": 1, "titulo": "Torno de cerámica para principiantes", "categoria": "Cerámica", "fecha": "2026-11-21", "hora": "18:00", "lugar": "Gràcia", "precio": 35, "aforo": 8, "reservas": 6, "intereses": ["Cerámica"], "descripcion": "Tus primeras piezas en el torno: centrar el barro, levantar las paredes y dar forma a un cuenco."},
  {"id": 2, "titulo": "Tu primer bolso de tela", "categoria": "Costura", "fecha": "2026-11-22", "hora": "11:00", "lugar": "Sants", "precio": 28, "aforo": 10, "reservas": 10, "intereses": ["Costura"], "descripcion": "Patrón, corte y costura a máquina de un bolso de algodón que te llevas a casa."},
  {"id": 3, "titulo": "Acuarela botánica", "categoria": "Pintura", "fecha": "2026-11-23", "hora": "17:30", "lugar": "Poblenou", "precio": 22, "aforo": 12, "reservas": 4, "intereses": ["Pintura"], "descripcion": "Hojas y flores del natural con acuarela: mezclas, capas y transparencias."},
  {"id": 4, "titulo": "Anillos de plata martillada", "categoria": "Joyería", "fecha": "2026-11-25", "hora": "19:00", "lugar": "Eixample", "precio": 45, "aforo": 6, "reservas": 5, "intereses": ["Joyería"], "descripcion": "Corta, lima, martilla y suelda tu propio anillo de plata."},
  {"id": 5, "titulo": "Macramé para colgar plantas", "categoria": "Macramé", "fecha": "2026-11-26", "hora": "18:30", "lugar": "Gràcia", "precio": 20, "aforo": 10, "reservas": 3, "intereses": ["Macramé"], "descripcion": "Los nudos básicos del macramé para hacer un colgador de macetas."},
  {"id": 6, "titulo": "Encuadernación japonesa", "categoria": "Papel", "fecha": "2026-11-28", "hora": "10:30", "lugar": "Raval", "precio": 25, "aforo": 8, "reservas": 8, "intereses": ["Papel"], "descripcion": "Cose tu propia libreta con la técnica japonesa de cuatro agujeros."},
  {"id": 7, "titulo": "Tazas pintadas a mano", "categoria": "Cerámica", "fecha": "2026-11-29", "hora": "12:00", "lugar": "Sant Andreu", "precio": 30, "aforo": 12, "reservas": 7, "intereses": ["Cerámica", "Pintura"], "descripcion": "Decora una taza de cerámica con esmaltes; la cocemos y te la llevas en una semana."},
  {"id": 8, "titulo": "Bordado de iniciales", "categoria": "Costura", "fecha": "2026-12-01", "hora": "18:00", "lugar": "Sants", "precio": 18, "aforo": 10, "reservas": 2, "intereses": ["Costura"], "descripcion": "Punto de cadeneta y relleno para bordar tus iniciales en un pañuelo."},
  {"id": 9, "titulo": "Pendientes de arcilla polimérica", "categoria": "Joyería", "fecha": "2026-12-03", "hora": "17:00", "lugar": "Poblenou", "precio": 24, "aforo": 8, "reservas": 7, "intereses": ["Joyería", "Cerámica"], "descripcion": "Modela, hornea y monta tus pendientes con arcilla polimérica."},
  {"id": 10, "titulo": "Postales de papel reciclado", "categoria": "Papel", "fecha": "2026-12-05", "hora": "11:30", "lugar": "Eixample", "precio": 15, "aforo": 15, "reservas": 6, "intereses": ["Papel", "Pintura"], "descripcion": "Fabrica papel reciclado y conviértelo en postales."},
]
