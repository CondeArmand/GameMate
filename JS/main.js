import { getGameDetails } from "./APIs/api.js";
import { addGameToUser } from "./FB_Functions/firestore.js";

export function redirectGamePage(id) {
   if (!id) return console.error('ID não informado');
   if (document.title.includes("Tela Busca")) {
       window.location.href = `../pages/telaJogo.html?id=${id}`;
   } else if (document.title.includes("Tela Principal")) {
       window.location.href = `../pages/telaJogo.html?id=${id}`;
   }
}

document.addEventListener('DOMContentLoaded', () => {
   if (document.title.includes("Jogo")) {
         const urlParams = new URLSearchParams(window.location.search);
         const id = urlParams.get('id');
         getGameDetails(id).then(r => console.log("Tá caçando o quê aqui?")).catch(e => console.error("erro"));


        const addGame = document.querySelector('.adicionarJogo');
        addGame.addEventListener('click', () => {
            addGameToUser(id);
        })
   }

   // Campo de busca

   const search = document.getElementById('search-bar');
   const seachinput = document.querySelector('.search-txt');
   const lupa = document.getElementsByClassName('submit')[0];

   lupa.onclick = function(){
     search.classList.toggle('abrir');
   }

    seachinput.addEventListener('keydown', function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            const termo = document.getElementsByClassName('search-txt')[0].value;
            if (termo) {
                if (document.title.includes("Tela Principal")) {
                    window.location.href = "pages/telaBusca.html?termo=" + termo;
                } else {
                    window.location.href = "../pages/telaBusca.html?termo=" + termo;
                }
            }
        }
    });

    // Menu
    const btnExpandir = document.querySelector('.btn-expandir');const menuLateral = document.querySelector('.menu-lateral');const menu = document.querySelector('.menu');btnExpandir.addEventListener('click', () => {menuLateral.classList.toggle('active');menu.classList.toggle('active');});
    document.addEventListener('click', (event) => {const isClickInside = menuLateral.contains(event.target) || btnExpandir.contains(event.target);
        if (!isClickInside) {menuLateral.classList.remove('active');menu.classList.remove('active');}});



   // Service Worker
   if ('serviceWorker' in navigator) {
       navigator.serviceWorker.register('../JS/service-worker.js')
       .then(reg => console.log('service worker registered'))
       .catch(err => console.log('service worker not registered', err));
   }
});

