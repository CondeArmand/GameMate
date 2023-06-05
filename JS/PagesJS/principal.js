import {getDocumentsGames} from "../FB_Functions/firestore.js";


$(document).ready(function () {
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

    // Função para fazer a requisição e armazenar os dados no localStorage
    function fetchAndStoreData(API_URL) {
        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                const expirationDate = new Date().getTime() + 24 * 60 * 60 * 1000; // Define a data de validade para 24 horas
                const dataToStore = {
                    expiration: expirationDate,
                    results: data.results
                };
                localStorage.setItem('gameData', JSON.stringify(dataToStore));
                renderCarrossel1();
                return data.results;
            })
            .catch(error => console.log(error));
    }

// Verifica se os dados estão armazenados e se estão válidos
    function checkStoredData() {
        if (localStorage.getItem('gameData')) {
            const storedData = JSON.parse(localStorage.getItem('gameData'));
            const now = new Date().getTime();
            if (now < storedData.expiration) {
                return storedData.results;
            } else {
                localStorage.removeItem('gameData');
            }
        }
        return null;
    }

// Verifica se os dados já estão armazenados e se estão válidos
    function renderCarrossel1() {
        const gameData = checkStoredData();

        if (gameData) {
            // Dados válidos já estão no localStorage, busca a partir deles
            gameData.forEach(game => {
                const gameCover = $('<div class="carousel-item"></div>');
                gameCover.on('click', () => window.location.href = `pages/telaJogo.html?id=${game.id}`);
                gameCover.css('background-image', `url(${game.background_image})`);
                const gameTitle = $('<h2></h2>').text(game.name);
                gameCover.append(gameTitle);
                carrossel1.trigger('add.owl.carousel', [gameCover]);
            });

            carrossel1.trigger('refresh.owl.carousel');
        } else {
            // Dados não estão no localStorage ou não estão mais válidos, faz a requisição e armazena
            fetchAndStoreData(API_URL)
        }
    }
    renderCarrossel1()


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
                const gameCover = $('<div class="carousel-item"></div>');
                gameCover.css('background-image', `url(${game.background_image})`);
                const gameTitle = $('<h2></h2>').text(game.name);
                gameCover.append(gameTitle);

                // Adicione o evento de clique para redirecionar para a página do jogo
                gameCover.on('click', function () {
                    window.location.href = `pages/telaJogo.html?id=${game.gameId}`;
                });

                carrossel2.trigger('add.owl.carousel', [gameCover]);
            });

            carrossel2.trigger('refresh.owl.carousel');
        } catch (error) {
            console.log(error);
        }
    }

    renderGamesFromLibrary();
});
  