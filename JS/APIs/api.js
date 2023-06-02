const apiKey = '5c3cadf5b8e04858a193936f32bad73c';

import {renderGameDetails} from "../PagesJS/gamePage.js";
import {checkDocumentGame, createDocumentGame, getDocumentGame} from "../FB_Functions/firestore.js";

export async function getGames() {
    const url = `https://api.rawg.io/api/games?key=${apiKey}&ordering=-rating&page_size=10`;
    const response = await fetch(url);
    return await response.json();
}

export async function searchGame(query) {
    const url = `https://api.rawg.io/api/games?key=${apiKey}&search=${query}`;
    const response = await fetch(url);

    if (response.ok) {
        const data = await response.json();
        if (data.results.length === 0) {
            alert('Nenhum jogo encontrado')
        } else {
            console.log(data.results[0]);
        }
    } else {
        alert('Erro na requisição');
    }
}

export async function getGameDetails(id) {
    if (!id) return console.error('ID não informado');
    let game;


    if (await checkDocumentGame(id)) {
        game = await getDocumentGame(id)
    } else {
        const url = `https://api.rawg.io/api/games/${id}?key=${apiKey}`;
        const response = await fetch(url);
        game = await response.json();

        const gameData = {
            gameId: game.id,
            background_image: game.background_image,
            name: game.name,
            released: game.released,
            metacritic: game.metacritic,
            developers: game.developers,
            publishers: game.publishers,
            genres: game.genres,
            platforms: game.platforms,
            background_image_additional: game.background_image_additional,
            description: game.description
        }

        await createDocumentGame(gameData, id)
    }
    renderGameDetails(game);
    return game;
}

