self.addEventListener('install', event => {
    event.waitUntil(
        caches.open('app-cache').then(cache => {
            return cache.add('/')
                .then(() => cache.add('index.html'))
                .then(() => cache.add('app.js'))
                .then(() => cache.add('offline.html'))
                .catch(error => {
                    console.log('Falha ao adicionar recurso ao cache:', error);
                });
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            // Verifica se a resposta foi encontrada no cache
            if (response) {
                return response; // Retorna a resposta do cache
            }

            // Caso contrário, busca a resposta na rede
            return fetch(event.request).catch(() => {
                // Se não for possível buscar na rede, carrega a página offline
                return caches.match('offline.html');
            });
        }).catch(error => {
            // Se ocorrer algum erro, pode tratar de acordo com suas necessidades
            console.log('Erro ao buscar recurso:', error);
        })
    );
});

