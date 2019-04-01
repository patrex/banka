const menuBar = document.querySelector('#menu-btn'),
      list = document.querySelector('ul'),
      closeBtn = document.querySelector('.close');

menuBar.addEventListener('click', (e) => {
    list.classList.toggle('active');
    menuBar.style.display = 'none';

});

closeBtn.addEventListener('click', (e) => {
    list.classList.toggle('active');
    menuBar.style.display = '';
});