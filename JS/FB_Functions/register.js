import app from '/JS/FB_Functions/firebase-app.js';
import {createDocumentUser} from "./firestore.js";
import {gerarNumeroAleatorio} from '../utilitarios.js'
import {createUserWithEmailAndPassword, getAuth} from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';


const auth = getAuth(app);

const registerForm = document.getElementById('registerForm');
const name = document.getElementById('firstname');
const username = document.getElementById('lastname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('password2');
const errorMessage = document.querySelector('.errorMessage');


async function registerUser(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Autenticação bem-sucedida
        const userData = {
            email: email,
            name: name.value,
            username: username.value,
            photo: '',
            games: [],
            friends: [],
            id: gerarNumeroAleatorio(),
            level: 0,
        };
        const user = userCredential.user;
        await createDocumentUser(userData, user.uid);

        // Redirecionamento após a conclusão da createDocumentUser
        window.location.href = '../../index.html';
    } catch (error) {
        // Erro na autenticação ou na criação do documento do usuário
        errorMessage.style.display = 'block';
        const errorCode = error.code;
        if (errorCode === 'auth/email-already-in-use') {
            errorMessage.innerHTML = 'Email já cadastrado';
        } else if (errorCode === 'auth/invalid-email') {
            errorMessage.innerHTML = 'Email inválido';
        } else if (errorCode === 'auth/weak-password') {
            errorMessage.innerHTML = 'Senha fraca, deve ter 6 digitos ou mais';
        }
    }
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

    if (passwordValue.length < 6) {
        alert('A senha deve conter no mínimo 6 caracteres!');
        return;
    }

    registerUser(emailValue, passwordValue)
        .then(() => {
            // Registro bem-sucedido
            console.log('Registro bem-sucedido');
        })
        .catch((error) => {
            // Erro no registro
            console.log('Erro no registro:', error);
            alert('Erro ao cadastrar usuário!');
        });

});