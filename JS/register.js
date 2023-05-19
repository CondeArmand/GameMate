import app from '/JS/firebase-app.js';

import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';


const auth = getAuth(app);

const registerForm = document.getElementById('registerForm');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('password2');

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
            console.log('Registro bem-sucedido');
            window.location.href = '../index.html'
        }
        ).catch((error) => {
            // Erro no registro
            console.log('Erro no registro:', error);
        })
});