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

botao.addEventListener("click", function(){
    if(senha.type == "password"){
        senha.type = "text";
        senha2.type = "text";
    }else{
        senha.type = "password";
        senha2.type = "password";
    }
});

const inputTelefone = document.getElementById('telefone');
inputTelefone.addEventListener('input', formatarTelefone);

function formatarTelefone() {
  let telefone = inputTelefone.value;
  telefone = telefone.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
  if (telefone.length > 0) {
    telefone = '(' + telefone;
  }
  if (telefone.length > 3) {
    telefone = telefone.substr(0, 3) + ') ' + telefone.substr(3);
  }
  if (telefone.length > 10) {
    telefone = telefone.substr(0, 10) + '-' + telefone.substr(10);
  }
  if (telefone.length > 15) {
    telefone = telefone.substr(0, 15);
  }
  inputTelefone.value = telefone;
}
