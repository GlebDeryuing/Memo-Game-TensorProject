/* eslint-disable no-undef */
import {
  authorize, sendButtonClick, getMessages, deleteUser,
} from './chat';
import updateUsers from './users';
import getUsers from './users';

const memo = document.querySelector('.memo');
let selectedId = -1;
let playingDivs = [];
const listUsers = document.querySelector('#listUsers');
let canClick = true;
let score = 0;
const windowModal = document.querySelector('#myModal');
const level = document.querySelectorAll('.modal-block__level');
const refresh = document.querySelector('.refresh');
const settings = document.querySelector('.settings');
const exit = document.querySelectorAll('.exit');
const collapse = document.querySelector('#listUsers-head__collapse');
const countFields = 16;
let newCountFields = 16;
let visible = true;
const userName = document.querySelector('#userName');

let playingCards = [];
let freeCounter = 0;

function objectCreation(value) {
  const newobj = {
    value,
    passed: false,
  };
  return newobj;
}

function resize() {
  const blocks = memo.children;
  const size = 100 / Math.ceil(Math.sqrt(blocks.length));
  const padd = window.innerWidth / 230;
  memo.style.padding = `${padd / 2}px`;
  for (let index = 0; index < blocks.length; index += 1) {
    blocks[index].style.margin = `${padd / 2}px`;
    blocks[index].style.height = `calc(${size}% - ${padd}px)`;
    blocks[index].style.width = `calc(${size}% - ${padd}px)`;
  }
}

function generator(count) {
  playingCards = [];
  playingDivs = [];
  freeCounter = count;
  for (let index = 0; index < count / 2; index += 1) {
    playingCards.push(objectCreation(index));
    playingCards.push(objectCreation(index));
  }
  for (let index = 0; index < playingCards.length; index += 1) {
    const tempObj = playingCards[index];
    const newRandom = Math.floor(Math.random() * (count - 1));
    playingCards[index] = playingCards[newRandom];
    playingCards[newRandom] = tempObj;
  }
  for (let index = 0; index < playingCards.length; index += 1) {
    const field = document.createElement('div');
    field.className = '';
    playingDivs.push(field);
    memo.appendChild(field);
  }
  resize();
}

function check(a, b) {
  const first = playingCards[a];
  const second = playingCards[b];
  score += 1;
  if (!first.passed && !second.passed && first.value === second.value) {
    freeCounter -= 2;
    first.passed = true;
    second.passed = true;
    if (freeCounter === 0) {
      // вывести победное окно
      const message = document.querySelector('#modalWinningMessage');
      message.textContent = `Победа! Количество ваших ходов: ${score}`;
      setTimeout(() => {
        windowModal.style.display = 'flex';
        const windowWinning = document.querySelector('#modalWinning');
        windowWinning.style.display = 'flex';
      }, 1000);
    }
    return true;
  } return false;
}

function inputValidate() {
  const val = userName.value;
  if (val.length < 4) {
    userName.style.border = '3px solid rgba(255, 0, 0, 0.4)';
    return false;
  }

  userName.style.border = '1px solid rgb(138, 138, 138)';
  return true;
}


dragElement(listUsers);
function dragElement(elmnt) {
  let pos1 = 0;
  let pos2 = 0;
  let pos3 = 0;
  let pos4 = 0;
  if (document.getElementById(`${elmnt.id}-head`)) {
    /* if present, the header is where you move the DIV from: */
    document.getElementById(`${elmnt.id}-head`).onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV: */
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = `${elmnt.offsetTop - pos2}px`;
    elmnt.style.left = `${elmnt.offsetLeft - pos1}px`;
  }

  function closeDragElement() {
    /* stop moving when mouse button is released: */
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const auth = document.querySelector('#startGame');
  auth.addEventListener('click', () => {
    const res = inputValidate();
    if (res) {
      auth.style.display = 'none';
      const modal = document.querySelector('#myModalFirst');
      modal.style.display = 'none';
      return authorize(userName.value);
    }
    // eslint-disable-next-line no-alert
    return alert('This user is authorized!');
  });
  userName.addEventListener('input', () => inputValidate());
  generator(countFields);

  collapse.addEventListener('click', () => {
    const users = document.querySelector('#listUsers-body');
    if (!visible) {
      users.style.display = 'flex';
      visible = true;
      setInterval(getUsers, 3000);
    } else if (visible) {
      users.style.display = 'none';
      visible = false;
    }
  });

  memo.addEventListener('click', (e) => {
    const targ = e.target.nodeName === 'DIV' ? e.target : e.target.parentNode;
    if (canClick && targ.className !== 'selected' && targ.className !== 'defeated' && targ.className !== 'memo' && targ.className !== 'setting') {
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

  exit.forEach((event) => event.addEventListener('click', () => {
    windowModal.style.display = 'none';
    event.parentNode.style.display = 'none';
    deleteUser();
  }));
  settings.addEventListener('click', () => {
    // Открытие модального окна с выборами уровня сложности
    windowModal.style.display = 'flex';
    document.querySelector('.modal-block').style.display = 'flex';
  });

  level.forEach((e) => e.addEventListener('click', () => {
    const cnt = e.id;
    // eslint-disable-next-line radix
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
      if (event.target.id === 'yesRefresh' || event.target.id === 'okWinning') {
        while (memo.firstChild) memo.removeChild(memo.firstChild);
        generator(newCountFields);
      }
      windowModal.style.display = 'none';
      const windows = document.querySelectorAll('.modal-message');
      // eslint-disable-next-line no-shadow
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
  setInterval(updateUsers, 3000);
});
