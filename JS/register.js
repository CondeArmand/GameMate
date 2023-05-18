import app from '/JS/firebase-app.js';

import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';


const auth = getAuth(app);

const registerForm = document.getElementById('registerForm');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');

async function registerUser(email, password) {
    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
        // Autenticação bem-sucedida
        const user = userCredential.user;
        console.log('Usuário autenticado:', user);
    }).catch((error) => {
        // Erro na autenticação
        console.log('Erro na autenticação:', error);
    });
}

export async function logout() {
    signOut(auth).then(() => {
        // Sign-out bem-sucedido
        console.log('Sign-out bem-sucedido');
    }).catch((error) => {
        // Erro no sign-out
        console.log('Erro no sign-out:', error);
    });
}

registerForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const emailValue = email.value;
    const passwordValue = password.value;
    const confirmPasswordValue = confirmPassword.value;

    if (passwordValue !== confirmPasswordValue) {
        alert('As senhas não coincidem!');
        return;
    }

    registerUser(emailValue, passwordValue)
        .then(() => {
            // Registro bem-sucedido
            alert('Usuário registrado com sucesso!');
        }
        ).catch((error) => {
            // Erro no registro
            console.log('Erro no registro:', error);
        })
});