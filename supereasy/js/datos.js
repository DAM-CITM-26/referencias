// DATOS · escritos en el código para que la referencia funcione sin servidor.
// En React (Sprint 2) no se copian: llegan de la API, desde src/data/api.js,
// y la pantalla muestra «cargando», un error con «Reintentar» o «sin resultados».
// Cada elemento sigue el modelo de docs/datos.md.

const SUPERMERCADOS = [
  "Mercadona",
  "Lidl",
  "Carrefour",
  "Dia",
]

const PRODUCTOS = [
  {"id": 1, "nombre": "Leche entera", "categoria": "Lácteos", "cantidad": 1, "unidad": "l", "precios": {"Mercadona": 0.95, "Lidl": 0.89, "Carrefour": 0.99, "Dia": 0.92}},
  {"id": 2, "nombre": "Arroz redondo", "categoria": "Despensa", "cantidad": 1, "unidad": "kg", "precios": {"Mercadona": 1.35, "Lidl": 1.29, "Carrefour": 1.45}},
  {"id": 3, "nombre": "Aceite de oliva virgen extra", "categoria": "Despensa", "cantidad": 1, "unidad": "l", "precios": {"Mercadona": 8.95, "Lidl": 8.49, "Carrefour": 9.2, "Dia": 8.75}},
  {"id": 4, "nombre": "Huevos M (12)", "categoria": "Frescos", "cantidad": 12, "unidad": "ud", "precios": {"Mercadona": 2.7, "Carrefour": 2.85, "Dia": 2.65}},
  {"id": 5, "nombre": "Pan de molde integral", "categoria": "Panadería", "cantidad": 0.5, "unidad": "kg", "precios": {"Mercadona": 1.4, "Lidl": 1.19, "Dia": 1.3}},
  {"id": 6, "nombre": "Plátanos", "categoria": "Fruta", "cantidad": 1, "unidad": "kg", "precios": {"Mercadona": 1.99, "Lidl": 1.85, "Carrefour": 2.15, "Dia": 1.95}},
  {"id": 7, "nombre": "Yogur natural (4)", "categoria": "Lácteos", "cantidad": 4, "unidad": "ud", "precios": {"Mercadona": 0.8, "Lidl": 0.75, "Carrefour": 0.95}},
  {"id": 8, "nombre": "Pasta espagueti", "categoria": "Despensa", "cantidad": 0.5, "unidad": "kg", "precios": {"Mercadona": 0.75, "Lidl": 0.69, "Carrefour": 0.85, "Dia": 0.72}},
  {"id": 9, "nombre": "Tomate triturado", "categoria": "Despensa", "cantidad": 0.8, "unidad": "kg", "precios": {"Mercadona": 0.85, "Carrefour": 0.99, "Dia": 0.8}},
  {"id": 10, "nombre": "Café molido", "categoria": "Despensa", "cantidad": 0.25, "unidad": "kg", "precios": {"Mercadona": 2.65, "Lidl": 2.49, "Carrefour": 2.99}},
]
