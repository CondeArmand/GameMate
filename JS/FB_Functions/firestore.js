import app from './firebase-app.js';
import { getLoggedInUserId } from "./auth.js";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    setDoc,
    updateDoc,
    arrayUnion
} from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';

const db = getFirestore(app);



// Salvar dados do usuario no Firestore

export async function createDocumentUser(userData, userUid) {
    try {
        await setDoc(doc(db, 'users', userUid), userData);
        console.log('Documento cadastrado com sucesso')
    } catch (e) {
        console.error('Error adding document: ', e);
        alert('Erro ao cadastrar usuário!');
    }
}

// Salvar dados do jogo no Firestore

export async function createDocumentGame(gameData, gameUid) {
    try {
        await setDoc(doc(db, 'games', gameUid), gameData);
        console.log('Jogo cadastrado com sucesso')
    } catch (e) {
        console.error('Error adding document: ', e);
        console.log('Erro ao cadastrar jogo!')
    }
}

// Atualizar dados do usuario no Firestore

export async function addGameToUser(game) {
    try {
        const userUid = await getLoggedInUserId();
        if (userUid) {
            const userRef = doc(db, 'users', userUid);
            await updateDoc(userRef, {
                games: arrayUnion(game)
            });
            console.log('Novo jogo adicionado com sucesso!');
        } else {
            console.log('Nenhum usuário logado.');
        }
    } catch (error) {
        console.log('Erro ao adicionar novo jogo:', error);
    }
}
// Puxar dados do jogo do firestore

export async function getDocumentGame(gameUid) {
    const docRef = doc(db, 'games', gameUid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data()
    } else {
        console.log('Documento não existe!');
    }
}

// Puxar dados do usuário do firestore
export async function getUserGames(userUid) {
    try {
        const games = [];
        const docRef = doc(db, 'users', userUid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            if (userData.hasOwnProperty('games') && Array.isArray(userData.games)) {
                games.push(...userData.games);
                console.log('Jogos do usuário buscados com sucesso!', games);
                return games;
            } else {
                console.log('Usuário não possui a propriedade "games" ou não é um array.');
            }
        } else {
            console.log('Documento do usuário não encontrado.');
        }
    } catch (e) {
        console.log('Erro ao buscar jogos do usuário:', e);
    }
}

// Checar dados no firestore
export async function checkDocumentUser(userUid) {
    const docRef = doc(db, 'users', userUid);
    const docSnap = await getDoc(docRef);

    return !!docSnap.exists();
}

export async function checkDocumentGame(gameUid) {
    const docRef = doc(db, 'games', gameUid);
    const docSnap = await getDoc(docRef);

    return !!docSnap.exists();
}





