const API_KEY ='5c3cadf5b8e04858a193936f32bad73c';
const API_URL = `https://api.rawg.io/api/games?key=${API_KEY}&dates=2023-01-01,2023-12-31`;

const gameCovers = document.getElementById('game-covers');

fetch(API_URL)
	.then(response => response.json())
	.then(data => {
		data.results.forEach(game => {
			const gameCover = document.createElement('div');
			gameCover.classList.add('game-cover');
			gameCover.style.backgroundImage = `url(${game.background_image})`;
			gameCovers.appendChild(gameCover);
      const gameTitle = document.createElement('h2');
      gameTitle.innerText = game.name;
      gameCover.appendChild(gameTitle);
		});
	})
	.catch(error => console.log(error));
  

  
  
const btnExpandir = document.querySelector('.btn-expandir');const menuLateral = document.querySelector('.menu-lateral');const menu = document.querySelector('.menu');btnExpandir.addEventListener('click', () => {menuLateral.classList.toggle('active');menu.classList.toggle('active');});
document.addEventListener('click', (event) => {const isClickInside = menuLateral.contains(event.target) || btnExpandir.contains(event.target);
if (!isClickInside) {menuLateral.classList.remove('active');menu.classList.remove('active');}});

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
        var newUrl = "/GameMate/pages/telaBusca.html?termo=" + encodeURIComponent(searchTerm);
        window.location.href = newUrl;
      }
    }
  }
  