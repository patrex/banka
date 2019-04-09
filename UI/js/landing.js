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

const nairaDollar = document.querySelector('#nairaDollar');
const nairaGBP = document.querySelector('#nairaGBP');
const nairaJPY = document.querySelector('#nairaJPY');

const showCurr = () => {
    const refTabs = {
        ngnGBP: 0.00211,
        ngnJPY: .31,
    }
    const url = 'https://openexchangerates.org/api/latest.json?app_id=b3cc319547964c44bd16f451895333f8&base=USD&symbols=NGN,JPY,GBP';
    fetch(url)
        .then((results) => results.json())
        .then(data => {
            nairaDollar.innerHTML = (data.rates.NGN).toFixed(2);
            nairaGBP.innerHTML = (1 / refTabs.ngnGBP).toFixed(2);
            nairaJPY.innerHTML = (1 / refTabs.ngnJPY).toFixed(2);
        })
        .catch((err) => {
            console.log(err);
        });
} 

setInterval(showCurr, 60000);    //attempt to update currencies every minute
