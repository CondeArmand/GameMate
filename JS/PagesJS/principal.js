import {redirectGamePage} from "../main.js";
import { getDocumentsGames } from "../FB_Functions/firestore.js";
// // const API_KEY ='5c3cadf5b8e04858a193936f32bad73c';
// // const API_URL = `https://api.rawg.io/api/games?key=${API_KEY}&dates=2023-01-01,2023-12-31`;

// // const gameCovers = document.getElementById('game-covers');

// // fetch(API_URL)
// // 	.then(response => response.json())
// // 	.then(data => {
// // 		data.results.forEach(game => {
// // 			const gameCover = document.createElement('div');
// // 			gameCover.addEventListener('click', () => redirectGamePage(game.id));
// // 			gameCover.classList.add('game-cover');
// // 			gameCover.style.backgroundImage = `url(${game.background_image})`;
// // 			gameCovers.appendChild(gameCover);
// //       const gameTitle = document.createElement('h2');
// //       gameTitle.innerText = game.name;
// //       gameCover.appendChild(gameTitle);
// // 		});
// // 	})
// // 	.catch(error => console.log(error));
  

$(document).ready(function(){
	var owl = $('.owl-carousel');

	const API_KEY = '5c3cadf5b8e04858a193936f32bad73c';
	const API_URL = `https://api.rawg.io/api/games?key=${API_KEY}&dates=2023-01-01,2023-12-31`;
;
	
	fetch(API_URL)
	  .then(response => response.json())
	  .then(data => {
		data.results.forEach(game => {
		  var gameCover = $('<div class="carousel-item"></div>');
		  gameCover.css('background-image', `url(${game.background_image})`);
		  var gameTitle = $('<h2></h2>').text(game.name);
		  gameCover.append(gameTitle);
		  owl.append(gameCover);
		});
  
		owl.owlCarousel({
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
	  })
	  .catch(error => console.log(error));
  });

  // ...
  $(document).ready(function(){
const carrossel2 = $('#biblioteca');
  async function renderGamesFromLibrary() {
	try {
	  const games = await getDocumentsGames();
	  
	  games.forEach((game) => {
        var gameCover = $('<div class="carousel-item"></div>');
        gameCover.css('background-image', `url(${game.background_image})`);
        var gameTitle = $('<h2></h2>').text(game.name);
        gameCover.append(gameTitle);
        carrossel2.trigger('add.owl.carousel', [gameCover]).trigger('refresh.owl.carousel')
      });

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
    } catch (error) {
      console.log(error);
    }
  }

	  renderGamesFromLibrary();
});