const togglePassword = document.querySelector('#togglePassword1');
const password = document.querySelector('#password');
           
togglePassword.addEventListener('click', function (e) {
    // toggle the type attribute
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute("type", type);
    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
    // toggle the eye slash icon
});

const togglePassword2 = document.querySelector('#togglePassword2');
const password2 = document.querySelector('#password2');

togglePassword2.addEventListener('click', function (e) {

    const type = password2.getAttribute('type') === 'password' ? 'text' : 'password';
    password2.setAttribute("type", type);
    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
});
