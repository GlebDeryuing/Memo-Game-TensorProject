const request = require('superagent');

function removeAll() { // Очистка списка сообщений для вставки последних
  const allMessages = document.querySelectorAll('.message');
  const allMineMessages = document.querySelectorAll('.my-message');
  allMessages.forEach((message) => message.remove());
  allMineMessages.forEach((message) => message.remove());
}

function createDiv(className, text, author) { // Создает дивы из распарсенных данных
  const div = document.createElement('div');
  const userName = document.createElement('h3');
  const message = document.createElement('p');
  div.className = className;
  div.textContent = text;
  userName.textContent = author;
  message.textContent = text;
  div.appendChild(userName).appendChild(message);
  return div;
}

const getName = (message) => message.name;
const getText = (message) => message.text;
const getTime = (message) => message.time;
const getGame = (message) => message.game;

function getDataDiv(response) { // Парсинг ответа сервера, создание классов
  const message = response;
  const name = getName(message);
  console.log(name);
  const text = getText(message);
  const className = message.isMine ? 'my-message' : 'message';
  return createDiv(className, text, name);
}

function render(messages) { // Обновляем чат после очистки, вставляя последние сообщения
  removeAll();
  console.log(messages);
  const chat = document.body.getElementsByClassName('chat-body');
  console.log("CHAT:", chat);
  const parsed = Object.values(messages).map((item) => getDataDiv(item));
  console.log("Parsed: ", parsed);
  parsed.forEach((i) => document.body.getElementsByClassName('chat-body')[0].appendChild(i));
}

function scrollChatOnBottom() {
  const element = document.body.querySelector('.chat-body');
  element.scrollTop = element.scrollHeight;
}

export function getMessages() { // Получить последние сообщения с сервера
  return request
    .get('/api/messages')
    .set('Content-Type', 'application/json')
    .then(render);
}

function sendMessage(message) { // Отправить запрос с сообщением на сервер
  return request
    .post('/api/messages')
    .set('Content-Type', 'application/json')
    .send({ text: message })
    .catch((err) => console.log(err));
}

export function authorize() {
  request
    .post('/api/users')
    .set('Content-Type', 'application/json')
    .send({ name: 'lol' })
    .then(console.log('authorized!'))
    .catch((err) => console.log(err));
}

export function sendButtonClick() { // Прослушка клика на кнопку отправки
  const text = document.getElementById('#');
  if (text.value) {
    sendMessage(text.value).then(() => {
      text.value = '';
    });
    console.log('text was sent');
    getMessages();
    scrollChatOnBottom();
  }
}
