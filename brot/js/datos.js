// DATOS · escritos en el código para que la referencia funcione sin servidor.
// En React (Sprint 2) no se copian: llegan de la API, desde src/data/api.js,
// y la pantalla muestra «cargando», un error con «Reintentar» o «sin resultados».
// Cada elemento sigue el modelo de docs/datos.md.

const RECETAS = [
  {"id": 1, "nombre": "Porridge de avena y plátano", "tipo": "Desayuno", "minutos": 10, "emoji": "🥣", "ingredientes": [{"ingrediente": "avena", "gramos": 50}, {"ingrediente": "plátano", "gramos": 100}, {"ingrediente": "bebida de soja", "gramos": 200}], "pasos": ["Calienta la bebida de soja.", "Añade la avena y remueve 5 minutos.", "Sirve con el plátano en rodajas."]},
  {"id": 2, "nombre": "Tostada de hummus y tomate", "tipo": "Desayuno", "minutos": 5, "emoji": "🍞", "ingredientes": [{"ingrediente": "pan integral", "gramos": 60}, {"ingrediente": "hummus", "gramos": 40}, {"ingrediente": "tomate", "gramos": 80}], "pasos": ["Tuesta el pan.", "Unta el hummus.", "Añade el tomate en rodajas."]},
  {"id": 3, "nombre": "Lentejas con verduras", "tipo": "Comida", "minutos": 40, "emoji": "🍲", "ingredientes": [{"ingrediente": "lentejas", "gramos": 80}, {"ingrediente": "zanahoria", "gramos": 70}, {"ingrediente": "espinacas", "gramos": 40}], "pasos": ["Sofríe la zanahoria.", "Añade las lentejas y agua.", "Cuece 30 minutos y añade las espinacas al final."]},
  {"id": 4, "nombre": "Bowl de quinoa y garbanzos", "tipo": "Comida", "minutos": 25, "emoji": "🥗", "ingredientes": [{"ingrediente": "quinoa", "gramos": 70}, {"ingrediente": "garbanzos", "gramos": 100}, {"ingrediente": "espinacas", "gramos": 40}], "pasos": ["Cuece la quinoa.", "Saltea los garbanzos.", "Monta el bowl con las espinacas."]},
  {"id": 5, "nombre": "Curry de tofu", "tipo": "Comida", "minutos": 30, "emoji": "🍛", "ingredientes": [{"ingrediente": "tofu", "gramos": 150}, {"ingrediente": "leche de coco", "gramos": 100}, {"ingrediente": "arroz", "gramos": 70}], "pasos": ["Dora el tofu en dados.", "Añade la leche de coco y el curry.", "Sirve con el arroz."]},
  {"id": 6, "nombre": "Crema de calabaza", "tipo": "Cena", "minutos": 35, "emoji": "🎃", "ingredientes": [{"ingrediente": "calabaza", "gramos": 250}, {"ingrediente": "anacardos", "gramos": 20}, {"ingrediente": "bebida de soja", "gramos": 100}], "pasos": ["Asa la calabaza.", "Tritura con la bebida de soja.", "Sirve con los anacardos."]},
  {"id": 7, "nombre": "Tacos de seitán", "tipo": "Cena", "minutos": 20, "emoji": "🌮", "ingredientes": [{"ingrediente": "seitán", "gramos": 120}, {"ingrediente": "tortillas de maíz", "gramos": 90}, {"ingrediente": "tomate", "gramos": 60}], "pasos": ["Saltea el seitán en tiras.", "Calienta las tortillas.", "Rellena con el seitán y el tomate."]},
  {"id": 8, "nombre": "Ensalada de tempeh", "tipo": "Cena", "minutos": 15, "emoji": "🥬", "ingredientes": [{"ingrediente": "tempeh", "gramos": 100}, {"ingrediente": "espinacas", "gramos": 60}, {"ingrediente": "anacardos", "gramos": 20}], "pasos": ["Dora el tempeh.", "Mézclalo con las espinacas.", "Añade los anacardos."]},
  {"id": 9, "nombre": "Brownie de boniato", "tipo": "Postre", "minutos": 45, "emoji": "🍫", "ingredientes": [{"ingrediente": "boniato", "gramos": 150}, {"ingrediente": "avena", "gramos": 40}, {"ingrediente": "plátano", "gramos": 60}], "pasos": ["Asa el boniato.", "Tritura con el plátano y la avena.", "Hornea 25 minutos."]},
  {"id": 10, "nombre": "Yogur de soja con frutos rojos", "tipo": "Postre", "minutos": 5, "emoji": "🍓", "ingredientes": [{"ingrediente": "yogur de soja", "gramos": 125}, {"ingrediente": "frutos rojos", "gramos": 80}], "pasos": ["Sirve el yogur.", "Añade los frutos rojos."]},
]

// Nutrientes por cada 100 g de ingrediente (proteínas y fibra en g; hierro y calcio en mg)
const NUTRIENTES = {
  'avena': { proteinas: 13, hierro: 4.3, calcio: 54, fibra: 10 },
  'plátano': { proteinas: 1.1, hierro: 0.3, calcio: 5, fibra: 2.6 },
  'bebida de soja': { proteinas: 3.3, hierro: 0.4, calcio: 120, fibra: 0.6 },
  'pan integral': { proteinas: 9, hierro: 2.5, calcio: 70, fibra: 7 },
  'hummus': { proteinas: 8, hierro: 2.4, calcio: 38, fibra: 6 },
  'tomate': { proteinas: 0.9, hierro: 0.3, calcio: 10, fibra: 1.2 },
  'lentejas': { proteinas: 24, hierro: 7.5, calcio: 35, fibra: 11 },
  'zanahoria': { proteinas: 0.9, hierro: 0.3, calcio: 33, fibra: 2.8 },
  'espinacas': { proteinas: 2.9, hierro: 2.7, calcio: 99, fibra: 2.2 },
  'quinoa': { proteinas: 14, hierro: 4.6, calcio: 47, fibra: 7 },
  'garbanzos': { proteinas: 8.9, hierro: 2.9, calcio: 49, fibra: 7.6 },
  'tofu': { proteinas: 15, hierro: 5.4, calcio: 350, fibra: 0.3 },
  'leche de coco': { proteinas: 2, hierro: 1.6, calcio: 16, fibra: 0 },
  'arroz': { proteinas: 7, hierro: 0.8, calcio: 10, fibra: 1.3 },
  'calabaza': { proteinas: 1, hierro: 0.8, calcio: 21, fibra: 0.5 },
  'anacardos': { proteinas: 18, hierro: 6.7, calcio: 37, fibra: 3.3 },
  'seitán': { proteinas: 25, hierro: 1.2, calcio: 50, fibra: 0.6 },
  'tortillas de maíz': { proteinas: 5.7, hierro: 1.5, calcio: 80, fibra: 6 },
  'tempeh': { proteinas: 19, hierro: 2.7, calcio: 111, fibra: 0 },
  'boniato': { proteinas: 1.6, hierro: 0.6, calcio: 30, fibra: 3 },
  'yogur de soja': { proteinas: 4, hierro: 0.6, calcio: 120, fibra: 0.5 },
  'frutos rojos': { proteinas: 1, hierro: 0.6, calcio: 20, fibra: 4 },
}

// Lo que se necesita al día (orientativo), según los datos personales
const NECESIDADES_DIA = {
  base: { proteinas: 50, hierro: 8, calcio: 950, fibra: 25 },
  embarazo: { proteinas: 70, hierro: 27, calcio: 1000, fibra: 28 },
}
