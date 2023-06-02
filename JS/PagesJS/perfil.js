import {getDocumentUser} from "../FB_Functions/firestore.js";


const copiar = document.querySelector('.fa-copy');
const id = document.querySelector('.id-perfil');
copiar.addEventListener('click', () => {
    navigator.clipboard.writeText(id.textContent);
});

export async function loadPerfilInfos() {
    try {
        const userData = await getDocumentUser();

        const photo = document.querySelector('.perfil');
        const photoImg = document.createElement('img');
        photoImg.src = userData.photo;
        photo.appendChild(photoImg);

        const name = document.querySelector('.nome-perfil');
        const perfilId = document.querySelector('.id-perfil');
        const level = document.querySelector('.level');
        const friends = document.querySelector('.numAmigos');
        const games = document.querySelector('.numJogos');

        name.textContent = userData.username;
        perfilId.textContent = userData.id;
        level.textContent = userData.level;
        friends.textContent = userData.friends.length.toString();
        games.textContent = userData.games.length.toString();

    } catch (error) {
        console.log(error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadPerfilInfos();
});