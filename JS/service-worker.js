self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open('v1').then(function(cache) {
            return cache.addAll([
                '../',
                '../index.html',
                '../pages/telaBusca.html',
                '../pages/telaJogo.html',
                '../pages/cadastro.html',
                '../pages/biblioteca.html',
                '../pages/perfil.html',
                '../JS/main.js',
                '../CSS/biblioteca.css',
                '../CSS/cadastro.css',
                '../CSS/perfil.css',
                '../CSS/telaBusca.css',
                '../CSS/telaJogo.css',
                '../CSS/Principal.css'
        ]);
    }));
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});