// DATOS · escritos en el código para que la referencia funcione sin servidor.
// En React (Sprint 2) no se copian: llegan de la API, desde src/data/api.js,
// y la pantalla muestra «cargando», un error con «Reintentar» o «sin resultados».
// Cada elemento sigue el modelo de docs/datos.md.

const FOODIES = [
  {"id": 1, "nombre": "Nora Vidal", "bio": "Ramen y cocina asiática"},
  {"id": 2, "nombre": "Marc Gil", "bio": "Tapas y bares de barrio"},
  {"id": 3, "nombre": "Sara Llopis", "bio": "Vegetariana y de temporada"},
  {"id": 4, "nombre": "Iker Soto", "bio": "Pizza y pasta"},
]

const SIGUIENDO_INICIAL = [
  1,
  3,
]

const RESTAURANTES = [
  {"id": 1, "nombre": "La Taberna del Puerto", "cocina": "Mediterránea", "barrio": "Barceloneta", "precio": "€€", "direccion": "Passeig de Joan de Borbó, 12", "resenas": [{"foodieId": 1, "nota": 5, "texto": "El arroz del señoret, de diez."}, {"foodieId": 2, "nota": 4, "texto": "Buen producto, algo ruidoso."}]},
  {"id": 2, "nombre": "Sakura Ramen", "cocina": "Japonesa", "barrio": "Eixample", "precio": "€€", "direccion": "Carrer del Consell de Cent, 210", "resenas": [{"foodieId": 3, "nota": 4, "texto": "Tienen ramen vegetal muy bueno."}, {"foodieId": 4, "nota": 5, "texto": "El tonkotsu más intenso de la ciudad."}]},
  {"id": 3, "nombre": "Trattoria Nonna", "cocina": "Italiana", "barrio": "Gràcia", "precio": "€€", "direccion": "Carrer de Verdi, 45", "resenas": [{"foodieId": 2, "nota": 3, "texto": "Correcta, nada especial."}, {"foodieId": 4, "nota": 4, "texto": "La pasta fresca se nota."}]},
  {"id": 4, "nombre": "El Huerto Verde", "cocina": "Vegetariana", "barrio": "Poblenou", "precio": "€", "direccion": "Rambla del Poblenou, 88", "resenas": [{"foodieId": 1, "nota": 4, "texto": "Menú del día muy completo."}, {"foodieId": 3, "nota": 5, "texto": "Mi sitio favorito para comer verdura."}]},
  {"id": 5, "nombre": "Taquería La Lupe", "cocina": "Mexicana", "barrio": "Raval", "precio": "€", "direccion": "Carrer de la Riera Baixa, 7", "resenas": [{"foodieId": 2, "nota": 5, "texto": "Los tacos al pastor, increíbles."}]},
  {"id": 6, "nombre": "Brasa y Leña", "cocina": "Mediterránea", "barrio": "Sant Antoni", "precio": "€€€", "direccion": "Carrer del Comte Borrell, 33", "resenas": [{"foodieId": 4, "nota": 4, "texto": "Carne a la brasa espectacular."}, {"foodieId": 3, "nota": 3, "texto": "Pocas opciones sin carne."}]},
  {"id": 7, "nombre": "Dim Sum House", "cocina": "China", "barrio": "Eixample", "precio": "€€", "direccion": "Carrer de Pau Claris, 150", "resenas": [{"foodieId": 1, "nota": 3, "texto": "Bien, pero esperaba más."}]},
  {"id": 8, "nombre": "Pizzeria Forno", "cocina": "Italiana", "barrio": "Sants", "precio": "€", "direccion": "Carrer de Sants, 101", "resenas": [{"foodieId": 4, "nota": 5, "texto": "Masa de 48 horas, se nota."}, {"foodieId": 2, "nota": 4, "texto": "Buena relación calidad-precio."}]},
  {"id": 9, "nombre": "Casa Hanoi", "cocina": "Vietnamita", "barrio": "Gràcia", "precio": "€€", "direccion": "Carrer de Torrijos, 20", "resenas": [{"foodieId": 3, "nota": 5, "texto": "El pho más reconfortante."}]},
]
