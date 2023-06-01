import {redirectGamePage} from "../main.js";
import { getDocumentsGames } from "../FB_Functions/firestore.js";


$(document).ready(function() {
	const carrossel1 = $('#carrossel1');
	const carrossel2 = $('#carrossel2');
  
	// Configuração do carrossel 1
	carrossel1.owlCarousel({
	  loop: true,
	  margin: 20,
	  nav: true,
	  autoplay: true,
	  autoplayTimeout: 4500, // Tempo de espera entre os slides (em milissegundos)
	  responsive: {
		0: {
		  items: 1
		},
		600: {
		  items: 3
		},
		1000: {
		  items: 5
		}
	  }
	});
  
	// Carregar jogos lançados em 2023 no carrossel 1
	const API_KEY = '5c3cadf5b8e04858a193936f32bad73c';
	const API_URL = `https://api.rawg.io/api/games?key=${API_KEY}&dates=2023-01-01,2023-12-31`;
  
	fetch(API_URL)
	  .then(response => response.json())
	  .then(data => {
		data.results.forEach(game => {
		  var gameCover = $('<div class="carousel-item"></div>');
		  gameCover.css('background-image', `url(${game.background_image})`);
		  var gameTitle = $('<h2></h2>').text(game.name);
		  gameCover.append(gameTitle);
		  carrossel1.trigger('add.owl.carousel', [gameCover]);
		});
  
		carrossel1.trigger('refresh.owl.carousel');
	  })
	  .catch(error => console.log(error));
  
	// Configuração do carrossel 2
	carrossel2.owlCarousel({
	  loop: true,
	  margin: 20,
	  nav: true,
	  
	  responsive: {
		0: {
		  items: 1
		},
		600: {
		  items: 3
		},
		1000: {
		  items: 5
		}
	  }
	});
  
	// Carregar jogos da biblioteca do usuário no carrossel 2
	async function renderGamesFromLibrary() {
	  try {
		const games = await getDocumentsGames();
		
		games.forEach((game) => {
		  var gameCover = $('<div class="carousel-item"></div>');
		  gameCover.css('background-image', `url(${game.background_image})`);
		  var gameTitle = $('<h2></h2>').text(game.name);
		  gameCover.append(gameTitle);
		  carrossel2.trigger('add.owl.carousel', [gameCover]);
		});
  
		carrossel2.trigger('refresh.owl.carousel');
	  } catch (error) {
		console.log(error);
	  }
	}
  
	renderGamesFromLibrary();
  });
  