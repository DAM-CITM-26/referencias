// SERVICE WORKER · guarda los ficheros de la app la primera vez,
// para que se pueda abrir sin conexión. En React lo hace la plantilla (vite-plugin-pwa).
// Si cambiáis algún fichero, subid la versión para que el móvil descargue la nueva.
const VERSION = 'ludoteca-v5'
const FICHEROS = [
  './', 'index.html', 'css/estilos.css',
  'js/datos.js', 'js/logica.js', 'js/componentes.js', 'js/app.js',
  'manifest.webmanifest', 'icono.svg', 'icono-192.png', 'icono-512.png',
]

self.addEventListener('install', (evento) => {
  evento.waitUntil(caches.open(VERSION).then((cache) => cache.addAll(FICHEROS)))
  self.skipWaiting()
})

self.addEventListener('activate', (evento) => {
  evento.waitUntil(
    caches.keys().then((claves) =>
      Promise.all(claves.filter((clave) => clave !== VERSION).map((clave) => caches.delete(clave))),
    ),
  )
  self.clients.claim()
})

// Primero lo guardado; si no está, de la red
self.addEventListener('fetch', (evento) => {
  evento.respondWith(caches.match(evento.request).then((guardado) => guardado || fetch(evento.request)))
})
