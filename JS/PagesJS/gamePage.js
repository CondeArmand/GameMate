import {formatarData} from "../utilitarios.js";

const background_image = document.querySelector('.gamecover');
const name = document.querySelector('.titulo-jogo');
const released = document.querySelector('.cor-lancamento');
const metacritic = document.querySelector('.cor-metacritic');
const developers = document.querySelector('.cor-produtora');
const publisher = document.querySelector('.cor-publicadora');
const tipos = document.querySelector('.tipos');
const genre = document.querySelector('.genero');
const plataformas = document.querySelector('.plataformas');
const empresas = document.querySelector('.empresas');
const secondBackground = document.querySelector('.second-background');
const description = document.querySelector('.sobre-jogo');

export function renderGameDetails(game) {
    try {
        background_image.src = game.background_image;
        name.innerHTML = game.name;
        released.innerHTML = formatarData(game.released);
        metacritic.innerHTML = game.metacritic;
        developers.innerHTML = game.developers[0].name;
        publisher.innerHTML = game.publishers[0].name;

        game.genres.forEach(genre => {
            const genres = document.createElement('h5')
            genres.classList.add('genero');
            genres.innerHTML = genre.name;
            tipos.appendChild(genres);
        })

        game.platforms.forEach(platform => {
            const consoles = document.createElement('h5')
            consoles.classList.add('plataforma');
            consoles.innerHTML = platform.platform.name;
            empresas.appendChild(consoles);

            const genresQuantity = game.genres.length;

            if (genresQuantity <= 3) {
                plataformas.style.top = '9rem';
                empresas.style.top = '17rem';
            } else if (genresQuantity > 3 && genresQuantity <= 6) {
                plataformas.style.top = '11rem';
                empresas.style.top = '19rem';
            } else if (genresQuantity > 6) {
                plataformas.style.top = '13rem';
                empresas.style.top = '21rem';
            }
        })

        secondBackground.src = game.background_image_additional;
        description.innerHTML = game.description;
    } catch (error) {
        console.log(error);
    }
    document.body.style.visibility = 'visible';
}