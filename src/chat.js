const request = require('superagent');

function timeConverter(response) {
  const a = new Date(response * 1000);
  const hour = a.getHours();
  const min = a.getMinutes();
  const sec = a.getSeconds();
  const time = `${hour}:${min}:${sec}`;
  return time;
}

function removeAll() { // Очистка списка сообщений для вставки последних
  const allMessages = document.querySelectorAll('.message');
  const allMineMessages = document.querySelectorAll('.my-message');
  allMessages.forEach((message) => message.remove());
  allMineMessages.forEach((message) => message.remove());
}

function createDiv(className, text, author, time) { // Создает дивы из распарсенных данных
  const div = document.createElement('div');
  const userName = document.createElement('h3');
  const date = document.createElement('span');
  const message = document.createElement('p');
  div.className = className;
  userName.textContent = author;
  date.textContent = timeConverter(time);
  message.textContent = text;
  div.appendChild(userName).appendChild(date).appendChild(message);
  return div;
}

const getName = (message) => message.user;
const getText = (message) => message.text;
const getTime = (message) => message.time;
const getGame = (message) => message.game;

function getDataDiv(response) { // Парсинг ответа сервера, создание классов
  const message = response;
  const name = getName(message);
  const text = getText(message);
  const time = getTime(message);
  const className = message.isMine ? 'my-message' : 'message';
  return createDiv(className, text, name, time);
}

function render(messages) { // Обновляем чат после очистки, вставляя последние сообщения
  removeAll();
  const chat = document.body.getElementsByClassName('chat-body');
  const parsed = Object.values(messages).map((item) => getDataDiv(item));
  parsed.forEach((i) => chat[0].appendChild(i));
}

function scrollChatOnBottom() {
  const element = document.body.querySelector('.chat-body');
  element.scrollTop = element.scrollHeight;
}

export function getMessages() { // Получить последние сообщения с сервера
  return request
    .get('/api/messages')
    .set('Content-Type', 'application/json')
    .then((response) => response.body)
    .then(render);
}

function sendMessage(message) { // Отправить запрос с сообщением на сервер
  return request
    .post('/api/messages')
    .set('Content-Type', 'application/json')
    .send({ text: message })
    .catch((err) => console.log(err));
}

export function authorize(userName) {
  request
    .post('/api/users')
    .set('Content-Type', 'application/json')
    .send({ name: userName })
    .catch((err) => console.log(err));
}

export function sendButtonClick() { // Прослушка клика на кнопку отправки
  const text = document.getElementById('#');
  if (text.value) {
    sendMessage(text.value).then(() => {
      text.value = '';
    });
    getMessages();
    scrollChatOnBottom();
  }
}
