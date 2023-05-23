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
    function toggleSearch() {
        let searchInput = document.getElementById("searchInput");
        if (searchInput.style.display === "none") {
            searchInput.style.display = "block";
        } else {
            searchInput.style.display = "none";
        }
    }

    function handleKeyPress(event) {
        if (event.key === "Enter") {
            var searchTerm = document.getElementById("searchInput").value;
            if (searchTerm.trim() !== "") {
                var newUrl = "../pages/telaBusca.html?termo=" + encodeURIComponent(searchTerm);
                window.location.href = newUrl;
            }
        }
    }
});


