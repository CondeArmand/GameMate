import app from './firebase-app.js';
import {getLoggedInUserId} from "./auth.js";
import {
    arrayUnion,
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    query,
    setDoc,
    updateDoc,
    where
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

            // Limpa os dados armazenados no localStorage das funções anteriores
            localStorage.removeItem('userGames');
            localStorage.removeItem('gamesData');

            alert('Jogo adicionado com sucesso!');
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


export function getDocumentsGames() {
    const storedData = localStorage.getItem('gamesData');

    if (storedData) {
        const games = JSON.parse(storedData);
        console.log('Dados recuperados do localStorage');
        return games;
    }

    // Se não houver dados no localStorage, fazer a consulta ao banco de dados
    return fetchDocumentsGames();
}

async function fetchDocumentsGames() {
    const gamesUids = await getUserGames();
    const gamesCollection = collection(db, 'games');
    const gamesQuery = query(gamesCollection, where('__name__', 'in', gamesUids));
    const querySnapshot = await getDocs(gamesQuery);

    const games = [];

    querySnapshot.forEach((docSnap) => {
        if (docSnap.exists()) {
            games.push(docSnap.data());
        } else {
            console.log(`Documento ${docSnap.id} não existe!`);
        }
    });

    localStorage.setItem('gamesData', JSON.stringify(games));
    console.log('Dados armazenados no localStorage');

    return games;
}


// Puxar dados do usuário do firestore
export async function getDocumentUser() {
    const storedData = localStorage.getItem('userData');

    if (storedData) {
        const user = JSON.parse(storedData);
        console.log('Dados do usuário recuperados do localStorage');
        return user;
    }

    // Se não houver dados no localStorage, fazer a consulta ao banco de dados
    return fetchDocumentUser();
}

async function fetchDocumentUser() {
    const userUid = await getLoggedInUserId();
    const docRef = doc(db, 'users', userUid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const userData = docSnap.data();
        localStorage.setItem('userData', JSON.stringify(userData));
        console.log('Dados do usuário armazenados no localStorage');
        return userData;
    } else {
        console.log('Documento não existe!');
    }
}

export function getUserGames() {
    const storedData = localStorage.getItem('userGames');

    if (storedData) {
        const games = JSON.parse(storedData);
        console.log('Dados de jogos do usuário recuperados do localStorage');
        return games;
    }

    // Se não houver dados no localStorage, fazer a consulta ao banco de dados
    return fetchUserGames();
}

async function fetchUserGames() {
    const userUid = await getLoggedInUserId();

    try {
        const games = [];
        const docRef = doc(db, 'users', userUid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data();
            if (userData.hasOwnProperty('games') && Array.isArray(userData.games)) {
                games.push(...userData.games);
                localStorage.setItem('userGames', JSON.stringify(games));
                console.log('Dados de jogos do usuário armazenados no localStorage');
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





