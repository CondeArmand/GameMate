import apiKey from './apikey.js';
import { renderGameDetails } from "./gamePage.js";

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
    const url = `https://api.rawg.io/api/games/${id}?key=${apiKey}`;
    const response = await fetch(url);
    const game = await response.json();
    renderGameDetails(game);
    return game;
}

