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

// document.body.addEventListener('click', (e) => {
//     if(list.classList.contains('active'))
//         list.classList.toggle('active');
// });