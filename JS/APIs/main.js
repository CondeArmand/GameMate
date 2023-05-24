import { getGameDetails } from "./api.js";

export function redirectGamePage(id) {
   if (!id) return console.error('ID não informado');
   if (document.title.includes("Tela Busca")) {
       window.location.href = `../pages/telaJogo.html?id=${id}`;
   } else if (document.title.includes("Tela Principal")) {
       window.location.href = `pages/telaJogo.html?id=${id}`;
   }
}

document.addEventListener('DOMContentLoaded', () => {
   if (document.title.includes("Jogo")) {
     const urlParams = new URLSearchParams(window.location.search);
     const id = urlParams.get('id');
     getGameDetails(id).then(r => console.log("Tá caçando o quê aqui?")).catch(e => console.error("erro"));
   }

   // Campo de busca

   const search = document.getElementById('search-bar');
   const lupa = document.getElementsByClassName('submit')[0];
   lupa.onclick = function(){
     search.classList.toggle('abrir');
   }

   function handleKeyPress(event) {
     if (event.key === 'Enter') {
       const termo = document.getElementsByClassName('search-txt')[0].value;
       if (termo) {
         window.location.href = "../telaBusca.html?termo=" + termo;

       }
     }
    }
});

