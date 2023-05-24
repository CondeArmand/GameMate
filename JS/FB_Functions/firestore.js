import app from './firebase-app.js';
import {
    collection,
    doc,
    getDocs,
    getFirestore,
    setDoc
} from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';

const db = getFirestore(app);



// Salvar dados do usuario no Firestore

export async function createDocumentUser(userData, userUid) {
    try {
        await setDoc(doc(db, 'users', userUid), userData);
        alert('Usuário cadastrado com sucesso!');
    } catch (e) {
        console.error('Error adding document: ', e);
        alert('Erro ao cadastrar usuário!');
    }
}

export async function getCollection(collectionName) {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map(doc => doc.data());
}

getCollection('users').then((data) => {
    const name = data[0].name;
    const username = data[0].username;

    const nameElement = document.getElementById('name');
    const usernameElement = document.getElementById('username');

    nameElement.innerHTML = name;
    usernameElement.innerHTML = username;
}
);

getCollection('games').then((data) => {
    const gamesList = document.querySelector('.gameData')

    data.forEach((game) => {
        const gameElement = document.createElement('img');
        gameElement.classList.add('game');
        gameElement.src = game.screenshot;

        gamesList.appendChild(gameElement);
    });
});
