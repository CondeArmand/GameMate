import {getGameDetails} from "./APIs/api.js";
import {addGameToUser} from "./FB_Functions/firestore.js";
import {logout} from "./FB_Functions/auth.js";

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

    lupa.onclick = function () {
        search.classList.toggle('abrir');
    }

    seachinput.addEventListener('keydown', function (event) {
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
    const btnExpandir = document.querySelector('.btn-expandir');
    const menuLateral = document.querySelector('.menu-lateral');
    const menu = document.querySelector('.menu');
    btnExpandir.addEventListener('click', () => {
        menuLateral.classList.toggle('active');
        menu.classList.toggle('active');
    });
    document.addEventListener('click', (event) => {
        const isClickInside = menuLateral.contains(event.target) || btnExpandir.contains(event.target);
        if (!isClickInside) {
            menuLateral.classList.remove('active');
            menu.classList.remove('active');
        }
    });

    // logout button
    const logoutButton = document.querySelectorAll('.item')[3]
    logoutButton.addEventListener('click', () => {
        logout();
    });

    // Footer
    const icons = document.querySelectorAll('.item-footer i');
    if (icons) {
        console.log("tem")
    } else {
        console.log("não tem")
    }
    switch (document.title) {
        case "Tela Principal":
            icons[1].style.backgroundColor = "#0098B5";
            icons[1].style.borderRadius = "50%";
            icons[1].style.padding = "10px";
            icons[1].style.color = "#FFFFFF";
            icons[1].style.transition = "0.5s";
            icons[1].addEventListener('mouseover', () => {
                icons[1].style.backgroundColor = "#FFFFFF";
                icons[1].style.color = "#0098B5";
            });
            icons[1].addEventListener('mouseout', () => {
                icons[1].style.backgroundColor = "#0098B5";
                icons[1].style.color = "#FFFFFF";
            });
            break;
        case "Biblioteca":
            icons[0].style.backgroundColor = "#0098B5";
            icons[0].style.borderRadius = "50%";
            icons[0].style.padding = "10px";
            icons[0].style.color = "#FFFFFF";
            icons[0].style.transition = "0.5s";
            icons[0].addEventListener('mouseover', () => {
                icons[0].style.backgroundColor = "#FFFFFF";
                icons[0].style.color = "#0098B5";
            });
            icons[0].addEventListener('mouseout', () => {
                icons[0].style.backgroundColor = "#0098B5";
                icons[0].style.color = "#FFFFFF";
            });
            break;
        case "Perfil":
            icons[2].style.backgroundColor = "#0098B5";
            icons[2].style.borderRadius = "50%";
            icons[2].style.padding = "10px";
            icons[2].style.color = "#FFFFFF";
            icons[2].style.transition = "0.5s";
            icons[2].addEventListener('mouseover', () => {
                icons[2].style.backgroundColor = "#FFFFFF";
                icons[2].style.color = "#0098B5";
            });
            icons[2].addEventListener('mouseout', () => {
                icons[2].style.backgroundColor = "#0098B5";
                icons[2].style.color = "#FFFFFF";
            });
            break;
    }

    // Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('../JS/service-worker.js')
            .then(reg => console.log('service worker registered'))
            .catch(err => console.log('service worker not registered', err));
    }


});
