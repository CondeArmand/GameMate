import app from './firebase-app.js';
import { createDocumentUser, checkDocumentUser } from "./firestore.js";
import {
    getAuth,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    signInWithPopup,
    GoogleAuthProvider,
    sendPasswordResetEmail,

} from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';
import {gerarNumeroAleatorio} from "../utilitarios.js";

const auth = getAuth(app);

const loginButton = document.querySelector('.login');
const emailInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const logoutButton = document.querySelectorAll('.item')[3]
const googleButton = document.querySelector('.googleButton')




export async function login(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        // Signed in
        const user = userCredential.user;
        console.log('Usuário autenticado:', user.uid);
        window.location.href = '../../index.html'
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('Erro no login:', errorCode, errorMessage);
    }
}

export async function loginWithGoogle() {
    try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;


        if (!await checkDocumentUser(user.uid)) {
            const userData = {
                name: user.displayName,
                username: user.displayName,
                email: user.email,
                photo: user.photoURL,
                games: [],
                friends: [],
                id: gerarNumeroAleatorio(),
                level: 0,
            }
            await createDocumentUser(userData, user.uid);
            console.log('Usuário cadastrado no banco de dados');
        }

        // window.location.href = '../../index.html'
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log('Erro no login:', errorCode, errorMessage, email, credential);
    }
}

export async function logout() {
    try {
        await signOut(auth);
        // Sign-out bem-sucedido
        console.log('Sign-out bem-sucedido');
        window.location.href = '../../pages/login.html'
    } catch (error) {
        // Erro no sign-out
        console.log('Erro no sign-out:', error);
    }
}

export async function isUserLoggedIn() {
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            console.log('Usuário não autenticado');
            window.location.href = '../../pages/login.html'
        }
    });
}

export async function userForgotPassword(email) {
    try {
        await sendPasswordResetEmail(auth, email);
        // Email de redefinição de senha enviado
        alert('Email de redefinição de senha enviado');
    } catch (error) {
        // Erro no envio do email de redefinição de senha
        alert('Erro no envio do email de redefinição de senha')
    }
}

export function getLoggedInUserId() {
    return new Promise((resolve, reject) => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            unsubscribe(); // Para de ouvir o evento após a primeira chamada

            if (user) {
                resolve(user.uid);
            } else {
                resolve(null); // Nenhum usuário logado
            }
        }, reject);
    });
}






document.addEventListener('DOMContentLoaded', () => {
    if (document.title.includes("Tela Principal")){
        isUserLoggedIn();
        logoutButton.addEventListener('click', () => {
            logout();
        });
    } else if (document.title.includes("Login")){
        loginButton.addEventListener('click', (event) => {
            event.preventDefault();
            login(emailInput.value, passwordInput.value);
        });
        googleButton.addEventListener('click', () => {
            loginWithGoogle();
        });

    } else if (document.title.includes("Esqueceu a senha")){
        const emailInput = document.getElementById('RecoveryEmail');
        const forgotPasswordButton = document.querySelector('.redefinir');
        forgotPasswordButton.addEventListener('click', (event) => {
            event.preventDefault();
            userForgotPassword(emailInput.value);
        });
    }
});