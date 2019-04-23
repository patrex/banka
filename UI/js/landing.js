/* eslint-disable linebreak-style */
const menuBar = document.querySelector('#menu-btn');
const list = document.querySelector('ul');
const xClose = document.querySelector('.x-close');
const optionBox = document.querySelector('#kwikTransactionType');
const kwikSend = document.querySelector('.kwik-send');
const kwikReceive = document.querySelector('.kwik-receive');
const kwikSubmit = document.querySelector('#subBtn');

const kwikTransactionId = document.querySelector('#kwik-transaction-id');
const kwikTransactionAccountNumber = document.querySelector('#kwik-account-number');
const kwikTransactionAmount = document.querySelector('#kwik-transaction-amount');

menuBar.addEventListener('click', () => {
  list.classList.toggle('active');
  menuBar.style.display = 'none';
  xClose.style.display = 'inline';
});

xClose.addEventListener('click', () => {
  list.classList.toggle('active');
  menuBar.style.display = '';
  xClose.style.display = '';
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
    .then(results => results.json())
    .then((data) => {
      nairaDollar.innerHTML = (data.rates.NGN).toFixed(2);
      nairaGBP.innerHTML = (1 / refTabs.ngnGBP).toFixed(2);
      nairaJPY.innerHTML = (1 / refTabs.ngnJPY).toFixed(2);
    })
    .catch(() => {

    });
};

// setInterval(showCurr, 60000);    // attempt to update currencies every minute

const showKwikReceiveDialog = () => {
  kwikSend.style.display = 'none';
  kwikReceive.style.display = 'block';
};

const showKwikSendDialog = () => {
  kwikReceive.style.display = 'none';
  kwikSend.style.display = 'block';
};

optionBox.addEventListener('change', () => {
  if (optionBox.value === 'send') {
    showKwikSendDialog();
  } else if (optionBox.value === 'receive') {
    showKwikReceiveDialog();
  } else {
    kwikReceive.style.display = 'none';
    kwikSend.style.display = 'none';
  }
});

kwikSubmit.addEventListener('click', (e) => {
  if (optionBox.value === '') {
    e.preventDefault();
    // eslint-disable-next-line no-alert
    alert('You did not choose any Kwik transaction option');
    return;
  }

  if (optionBox.value === 'receive') {
    if (kwikTransactionId.value.length !== 5) {
      e.preventDefault();
      // eslint-disable-next-line no-alert
      alert('Invalid Transaction ID');
      return;
    }

    // add api call here
  }

  if (optionBox.value === 'send') {
    if (kwikTransactionAccountNumber.value.length < 1) {
      e.preventDefault();
      // eslint-disable-next-line no-alert
      alert('Invalid Account Number');
      return;
    }
  
    if (kwikTransactionAmount.value <= 0) {
      e.preventDefault();
      // eslint-disable-next-line no-alert
      alert('Invalid Transaction. Amount cannot be less than 1');
      return;
    }

    // add api call here
  }
});