const list = document.querySelector('#list');
const menu = document.querySelector('#menu-bar');
const closeMenu = document.querySelector('#menu-exit');

menu.addEventListener('click', (e) => {
  e.preventDefault();
  list.classList.toggle('active');
});

closeMenu.addEventListener('click', () => {
  list.classList.toggle('active');
})