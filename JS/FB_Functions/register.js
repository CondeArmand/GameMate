import app from '/JS/FB_Functions/firebase-app.js';
import { createDocumentUser} from "./firestore.js";

import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';


const auth = getAuth(app);

const registerForm = document.getElementById('registerForm');
const name = document.getElementById('firstname');
const username = document.getElementById('lastname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('password2');


async function registerUser(email, password) {
    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
        // Autenticação bem-sucedida
        const userData = {
            name: name.value,
            username: username.value,
        }
        const user = userCredential.user;
        console.log('Usuário autenticado:', user.uid)
        createDocumentUser(userData, user.uid);
    }).catch((error) => {
        // Erro na autenticação
        console.log('Erro na autenticação:', error);
        alert('Erro ao cadastrar usuário!')
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
            // window.location.href = '../../index.html'
        }
        ).catch((error) => {
            // Erro no registro
            console.log('Erro no registro:', error);
        })
});