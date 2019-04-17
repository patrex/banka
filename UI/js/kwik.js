const menuBar = document.querySelector('#menu-btn');
const list = document.querySelector('ul');
const closeBtn = document.querySelector('.close');

menuBar.addEventListener('click', () => {
  list.classList.toggle('active');
  menuBar.style.display = 'none';
});

closeBtn.addEventListener('click', () => {
  list.classList.toggle('active');
  menuBar.style.display = '';
});

const imageURI = document.querySelector('#img');
const username = document.querySelector('#thename');

const getUser = () => {
  const url = 'https://randomuser.me/api/';


  fetch(url)
    .then(user => user.json())
    .then((user) => {
      imageURI.src = user.results[0].picture.large;
      imageURI.getElementsByClassName.borderRadius = '50%';
      username.innerHTML = `${user.results[0].name.first} ${(user.results[0].name.last)}`
    })
    // eslint-disable-next-line arrow-parens
    .catch((err )=> {
    });
}
