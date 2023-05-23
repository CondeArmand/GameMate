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
        console.error('Nenhum resultado encontrado');
      }
    } else {
      console.error('Erro ao buscar jogos');
    }
  }
  
  function displayResults(results) {
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = '';
  
    results.forEach(result => {
      const game = document.createElement('div');
      game.classList.add('game');
  
      const img = document.createElement('img');
      img.src = result.background_image;
      img.alt = result.name;
  
      const title = document.createElement('h2');
      title.textContent = result.name;
  
      const releaseDate = document.createElement('p');
      releaseDate.textContent = `Lançado em: ${result.released}`;
  
      const platforms = document.createElement('p');
      platforms.textContent = `Plataformas: ${result.platforms.map(platform => platform.platform.name).join(', ')}`;
  
      game.appendChild(img);
      game.appendChild(title);
      game.appendChild(releaseDate);
      game.appendChild(platforms);
  
      resultsContainer.appendChild(game);
    });
    }

  getGameDetails();
  

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
          var newUrl = "../pages/telaBusca.html?termo=" + encodeURIComponent(searchTerm);
          window.location.href = newUrl;
        }
      }
    }
    