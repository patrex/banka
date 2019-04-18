const password = document.querySelector('#password');
const rpassword = document.querySelector('#rpassword');
const submit = document.querySelector('.subBtn');

submit.addEventListener('click', (e) => {
  if (password.value !== rpassword.value) {
    e.preventDefault();
    alert("passwords don't match");
  }
});
