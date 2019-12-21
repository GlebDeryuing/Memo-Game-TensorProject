const request = require('superagent');

function removeAll() {
  const chat = document.querySelectorAll('.message');
  console.log(chat);
  chat.forEach((message) => message.remove());
}

function updateChat() {
  request
    .get('/api/messages')
    .set('Content-Type', 'application/json')
    .then(removeAll)
    .catch((err) => console.log(err));
}

function sendMessage(message) {
  return request
    .post('/api/messages')
    .set('Content-Type', 'application/json')
    .send({ text: message })
    .then((response) => JSON.stringify(response))
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
  let text = document.getElementById('#').value;
  // chatArea.getElementById('send').onClick = function () {
  console.log('TEXT: ', text);
  if (text) {
    sendMessage(text).then(() => '');
    console.log('text was sent');
    updateChat();
  }
  // };
}
