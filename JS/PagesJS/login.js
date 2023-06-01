//ver senha

const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');
           
togglePassword.addEventListener('click', function (e) {
    // toggle the type attribute
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute("type", type);
    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');


    // toggle the eye slash icon
});



//validar formulario

let user = document.forms['form']['user'];
let pass = document.forms['form']['password'];

let userError = document.getElementById('userError');
let passError = document.getElementById('passwordError');

user.addEventListener('textInput', userVerify);
pass.addEventListener('textInput', passVerify);

function validar(){
    if(user.value.length < 6){
        user.style.border = "1px solid red";
        userError.style.display = "block";
        user.focus();
        return false;
    }

    if(pass.value.length < 8){
        pass.style.border = "1px solid red";
        passError.style.display = "block";
        pass.focus();
        return false;
    }
}

function userVerify(){
    if(user.value.length >= 6){
        user.style.border = "1px solid silver";
        userError.style.display = "none";
        return true;
    }
}

function passVerify(){
    if(pass.value.length >= 8){
        pass.style.border = "1px solid silver";
        passError.style.display = "none";
        return true;
    }
}
