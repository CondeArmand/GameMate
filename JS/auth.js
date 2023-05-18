import app from './firebase-app.js';
import { getAuth, signInWithEmailAndPassword, signOut } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';

const auth = getAuth(app);

const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const logoutButton = document.getElementById('logout');

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Autenticação bem-sucedida
            const user = userCredential.user;
            console.log('Usuário autenticado:', user);
        })
        .catch((error) => {
            // Erro na autenticação
            console.log('Erro na autenticação:', error);
        });
});

logoutButton.addEventListener('click', () => {
    signOut(auth).then(() => {
        // Sign-out bem-sucedido
        console.log('Sign-out bem-sucedido');
    }).catch((error) => {
        // Erro no sign-out
        console.log('Erro no sign-out:', error);
    });
});