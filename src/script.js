import { sendButtonClick, getMessages } from './chat';
<<<<<<< HEAD:src/script.js
import auth from './auth';
=======
import auth from './auth.js';
>>>>>>> auth:script.js

const memo = document.querySelector('.memo');
let selectedId = -1;
let playingDivs = [];
let canClick = true;
const windowModal = document.querySelector('.modal');
const level = document.querySelectorAll('.modal-block__level');
const refresh = document.querySelector('.refresh');
const settings = document.querySelector('.settings');
const exit = document.querySelectorAll('.exit');
const countFields = 16;
let newCountFields = 16;

document.addEventListener('DOMContentLoaded', () => {
  auth();
  generator(countFields);

  memo.addEventListener('click', (e) => {
    const targ = e.target.nodeName === 'DIV' ? e.target : e.target.parentNode;
    if (canClick && targ.className != 'selected' && targ.className != 'defeated' && targ.className != 'memo' && targ.className != 'setting') {
      targ.className = 'selected';
      const img = document.createElement('img');
      img.src = `image/cards/${playingCards[playingDivs.indexOf(targ)].value}.svg`;
      targ.appendChild(img);
      if (selectedId === -1) {
        selectedId = playingDivs.indexOf(targ);
      } else {
        const same = check(selectedId, playingDivs.indexOf(targ));
        const lastTarg = playingDivs[selectedId];
        selectedId = -1;
        canClick = false;
        setTimeout(() => {
          if (same) {
            targ.className = 'defeated';
            targ.firstChild.style.opacity = 0.7;
            lastTarg.className = 'defeated';
            lastTarg.firstChild.style.opacity = 0.7;
          } else {
            targ.className = '';
            targ.innerHTML = '';
            lastTarg.className = '';
            lastTarg.innerHTML = '';
          }
          canClick = true;
        }, 300);
      }
    } else if (targ.className === 'selected') {
      targ.className = '';
      targ.innerHTML = '';
      selectedId = -1;
    }
  });

  exit.forEach((e) => e.addEventListener('click', () => {
    windowModal.style.display = 'none';
    const windows = document.querySelectorAll('.modal-message');
    windows.forEach((e) => {
      e.style.display = 'none';
    });
  }));
  settings.addEventListener('click', () => {
    // Открытие модального окна с выборами уровня сложности
    windowModal.style.display = 'flex';
    document.querySelector('.modal-block').style.display = 'flex';
  });

  level.forEach((e) => e.addEventListener('click', () => {
    const cnt = e.id;
    newCountFields = parseInt(cnt);
    windowModal.style.display = 'none';
    document.querySelector('.modal-block').style.display = 'none';
    refresh.click();
  }));


  refresh.addEventListener('click', () => {
    // Появление модального окна с всплывающим блоком
    windowModal.style.display = 'flex';
    document.querySelector('#modalRefresh').style.display = 'flex';
  });

  const Buttons = document.querySelectorAll('.modal-message-content');
  Buttons.forEach((e) => {
    e.addEventListener('click', (event) => {
      if (event.target.id === 'yesRefresh' || event.target.id === 'noWinning') {
        while (memo.firstChild) memo.removeChild(memo.firstChild);
        generator(newCountFields);
      }
      windowModal.style.display = 'none';
      const windows = document.querySelectorAll('.modal-message');
      windows.forEach((e) => {
        e.style.display = 'none';
      });
    });
  });
  const sendButton = document.getElementById('send');
  sendButton.addEventListener('click', () => {
    sendButtonClick();
  });

  setInterval(getMessages, 2000);
});


var playingCards = [];
let freeCounter = 0;

function objectCreation(value) {
  const newobj = {
    value,
    passed: false,
  };
  return newobj;
}

function generator(count) {
  playingCards = [];
  playingDivs = [];
  freeCounter = count;
  for (let index = 0; index < count / 2; index++) {
    playingCards.push(objectCreation(index));
    playingCards.push(objectCreation(index));
  }
  for (let index = 0; index < playingCards.length; index++) {
    const tempObj = playingCards[index];
    const newRandom = Math.floor(Math.random() * (count - 1));
    playingCards[index] = playingCards[newRandom];
    playingCards[newRandom] = tempObj;
  }
  for (let index = 0; index < playingCards.length; index++) {
    const field = document.createElement('div');
    field.className = '';
    playingDivs.push(field);
    memo.appendChild(field);
  }
  resize();

  // Создание окна меню без вложенных элементов
  // var menu = document.createElement('div');
  // menu.className = "setting";
  // memo.appendChild(menu);
}

function check(a, b) {
  const first = playingCards[a];
  const second = playingCards[b];
  if (!first.passed && !second.passed && first.value === second.value) {
    freeCounter -= 2;
    first.passed = true;
    second.passed = true;
    if (freeCounter === 0) {
      // вывести победное окно

      setTimeout(() => {
        windowModal.style.display = 'flex';
        const windowWinning = document.querySelector('#modalWinning');
        windowWinning.style.display = 'flex';
      }, 1000);

      // windowWinning.firstChild.textContent = `Вы победили! Ваши очки: \n Хотите добавиться в таблицу лидеров?`;
    }
    return true;
  } return false;
}

function resize() {
  const blocks = memo.children;
  const size = 100 / Math.ceil(Math.sqrt(blocks.length));
  const padd = window.innerWidth / 230;
  memo.style.padding = `${padd / 2}px`;
  for (let index = 0; index < blocks.length; index++) {
    blocks[index].style.margin = `${padd / 2}px`;
    blocks[index].style.height = `calc(${size}% - ${padd}px)`;
    blocks[index].style.width = `calc(${size}% - ${padd}px)`;
  }
}
