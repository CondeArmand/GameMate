import app from './firebase-app.js';
import {
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    setDoc
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

// Checar dados no firestore

export async function checkDocumentGame(gameUid) {
    const docRef = doc(db, 'games', gameUid);
    const docSnap = await getDoc(docRef);

    return !!docSnap.exists();
}





