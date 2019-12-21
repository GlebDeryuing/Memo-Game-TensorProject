const request = require('superagent');

function removeAll() {
  const allMessages = document.querySelectorAll('.message');
  const allMineMessages = document.querySelectorAll('.my-message');
  allMessages.forEach((message) => message.remove());
  allMineMessages.forEach((message) => message.remove());
}

function createDiv(className, text, author) {
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

function render(messages) {
  removeAll();

  const chat = document.getElementsByClassName('chat-body');

  messages
    .map((item) => {
      const name = getName(item);
      const text = getText(item);
      const className = item.isMine ? 'my-message' : 'message';
      return createDiv(className, text, name);
    })
    .forEach((elem) => chat.appendChild(elem));
}

export function getMessages() {
  return request
    .get('/api/messages')
    .set('Content-Type', 'application/json')
    .then(render);
}

function sendMessage(message) {
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
  /*    .then((res) => {
      const sid = JSON.parse(res.body.Cookie.sid);
      console.log(sid);
    }) */
    .catch((err) => console.log(err));

/*  request
    .get('/api/users')
    .set('Content-Type', 'application/json')
    .then((res) => {
      const users = JSON.parse(res.body);
      console.log(users);
    });
    */
}

export function sendButtonClick() {
  const text = document.getElementById('#');
  if (text.value) {
    sendMessage(text.value).then(() => {
      text.value = '';
    });
    console.log('text was sent');
    getMessages();
  }
}
