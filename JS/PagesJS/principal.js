import {redirectGamePage} from "../main.js";

const API_KEY ='5c3cadf5b8e04858a193936f32bad73c';
const API_URL = `https://api.rawg.io/api/games?key=${API_KEY}&dates=2023-01-01,2023-12-31`;

const gameCovers = document.getElementById('game-covers');

fetch(API_URL)
	.then(response => response.json())
	.then(data => {
		data.results.forEach(game => {
			const gameCover = document.createElement('div');
			gameCover.addEventListener('click', () => redirectGamePage(game.id));
			gameCover.classList.add('game-cover');
			gameCover.style.backgroundImage = `url(${game.background_image})`;
			gameCovers.appendChild(gameCover);
      const gameTitle = document.createElement('h2');
      gameTitle.innerText = game.name;
      gameCover.appendChild(gameTitle);
		});
	})
	.catch(error => console.log(error));
  

  
