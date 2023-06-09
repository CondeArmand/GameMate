import {redirectGamePage} from "../main.js";
import {formatarData} from "../utilitarios.js";

const nenhumResultado = document.querySelector('.nenhumResultado')

function getGameDetails() {
    const searchTerm = new URLSearchParams(window.location.search).get('termo');
    if (searchTerm) {
        searchGames(searchTerm);
    }
}

async function searchGames(query) {
    const apiKey = '5c3cadf5b8e04858a193936f32bad73c';
    const url = `https://api.rawg.io/api/games?key=${apiKey}&search=${query}`;
    const response = await fetch(url);

    if (response.ok) {
        const data = await response.json();
        if (data.results.length > 0) {
            const results = data.results;
            displayResults(results);
        } else {
            document.body.style.visibility = 'visible';
            nenhumResultado.style.display = 'flex';
            console.error('Nenhum resultado encontrado');
        }
    } else {
        console.error('Erro ao buscar jogos');
    }
}

function displayResults(results) {
    const resultsContainer = document.getElementById('resultsContainer');

    resultsContainer.innerHTML = '';

    try {
        results.forEach(result => {
            const game = document.createElement('div');
            game.addEventListener('click', () => redirectGamePage(result.id));
            game.classList.add('game');

            const img = document.createElement('img');
            img.src = result.background_image;
            img.alt = result.name;

            const title = document.createElement('h2');
            title.textContent = result.name;

            const releaseDate = document.createElement('p');

            releaseDate.textContent = `Lançado em: ${formatarData(result.released)}`;

            const platforms = document.createElement('p');
            platforms.textContent = `Plataformas: ${result.platforms.map(platform => platform.platform.name).join(', ')}`;

            game.appendChild(img);
            game.appendChild(title);
            game.appendChild(releaseDate);
            game.appendChild(platforms);

            resultsContainer.appendChild(game);
            document.body.style.visibility = 'visible';
        });
    } catch (error) {
        document.body.style.visibility = 'visible';
        nenhumResultado.style.display = 'flex';
        console.log('Erro ao exibir resultados')
        console.log(error);
    }
}

getGameDetails();
  



