import { getDocumentsGames } from "../FB_Functions/firestore.js";
import {redirectGamePage} from "../main.js";




async function renderGames() {
    try {
        const games = await getDocumentsGames();


        games.forEach((game) => {
            const divCapas = document.querySelector('.capas');
            const divCapa = document.createElement('div');
            divCapa.classList.add('capa');
            divCapa.style.backgroundImage = `url(${game.background_image})`;
            divCapa.addEventListener('click', () => window.location.href = `../pages/telaJogo.html?id=${game.gameId}`);

            const titulo = document.createElement('p');
            titulo.classList.add('jogo');
            titulo.innerText = game.name;

            const divBotoes = document.createElement('p');
            divBotoes.classList.add('pontos');
            divBotoes.innerText = '...';
            divCapa.appendChild(titulo);
            divCapas.appendChild(divCapa);
        });
    } catch (error) {
        console.log(error);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    renderGames();


    // Menu lateral
    const btnExpandir = document.querySelector('.btn-expandir');const menuLateral = document.querySelector('.menu-lateral');const menu = document.querySelector('.menu');btnExpandir.addEventListener('click', () => {menuLateral.classList.toggle('active');menu.classList.toggle('active');});
    document.addEventListener('click', (event) => {const isClickInside = menuLateral.contains(event.target) || btnExpandir.contains(event.target);
        if (!isClickInside) {menuLateral.classList.remove('active');menu.classList.remove('active');}});
});



















