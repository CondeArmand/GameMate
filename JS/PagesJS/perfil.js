import {getDocumentUser} from "../FB_Functions/firestore.js";

const btnExpandir = document.querySelector('.btn-expandir');
const menuLateral = document.querySelector('.menu-lateral');
const menu = document.querySelector('.menu');

btnExpandir.addEventListener('click', () => {
    menuLateral.classList.toggle('active');
    menu.classList.toggle('active');
});


document.addEventListener('click', (event) => {
const isClickInside = menuLateral.contains(event.target) || btnExpandir.contains(event.target);

if (!isClickInside) {
    menuLateral.classList.remove('active');
    menu.classList.remove('active');

}
});

const copyToClipboard = (text) => {
    const input = document.createElement('textarea');
    input.style.position = 'fixed';
    input.style.opacity = '0';
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('Copy');
    document.body.removeChild(input);
  }
  
  const copyButton = document.querySelector('.fa-copy');
  const idElement = document.querySelector('.id');
  
  copyButton.addEventListener('click', () => {
    const idText = idElement.textContent;
    copyToClipboard(idText);
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