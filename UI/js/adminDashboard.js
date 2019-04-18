const list = document.querySelector('#list'),
  menu = document.querySelector('#menu-bar'),
  closeBtn = document.querySelector('#menu-exit')

menu.addEventListener('click', (e) => {
  list.classList.toggle('active');
  e.preventDefault();
});

closeBtn.addEventListener('click', (e) => {
  list.classList.toggle('active');
});

const imageURI = document.querySelector('#img');
const username = document.querySelector('#thename');

const getUser = () => {
  const url = 'https://randomuser.me/api/';


  fetch(url)
    .then(user => user.json())
    .then((user) => {
      imageURI.src = user.results[0].picture.large;
      username.innerHTML = `${user.results[0].name.first} ${(user.results[0].name.last)}`
    })
    .catch((err) => {
    });
}
