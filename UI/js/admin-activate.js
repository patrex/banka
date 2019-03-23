const list = document.querySelector('#list'),
        menu = document.querySelector('#menu-bar'),
        closeMenu = document.querySelector('#menu-exit');



menu.addEventListener('click', (e) => {
    e.preventDefault();
    list.classList.toggle('active');
});

closeMenu.addEventListener('click', (e) => {
    list.classList.toggle('active');
})