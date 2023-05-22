import app from './firebase-app.js';
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';

const auth = getAuth(app);

const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const logoutButton = document.querySelectorAll('.item')[3]




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
        if (user) {
            const uid = user.uid;
            console.log('Usuário autenticado:', uid);
        } else {
            console.log('Usuário não autenticado');
            window.location.href = '../../pages/login.html'
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.title.includes("Tela Principal")){
        isUserLoggedIn();
        logoutButton.addEventListener('click', () => {
            logout();
        });

    } else if (document.title.includes("Login")){
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            login(emailInput.value, passwordInput.value);
        });
    }
});