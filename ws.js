let v = "v-6"

self.addEventListener('install', (e)=>{
    console.log("Instalando sw...");
    caches.open(v).then(cache=>{
        cache.addAll([
            './index.html',
            './app.js',
            './JS/main.js',
            './CSS/style.css',
            './BD/main.js'
        ]).then(res=>{
            console.log('Archivo guardados en el cache');
        })
    })
})

self.addEventListener('activate', (e)=>{
    console.log("Activo...");
    caches.keys().then(key=>{
        return Promise.all(
            key.map(cache=>{
                if(cache !== v){
                    console.log('Cache eliminado');
                    return caches.delete(cache);
                }
            })
        )
    })
})

self.addEventListener('fetch', (e)=>{
   console.log("Cambios...");
    e.respondWith(async function() {
        const cachedResponse = await caches.match(e.request);
        if (cachedResponse) return cachedResponse;
        return fetch(e.request);
    }());
})