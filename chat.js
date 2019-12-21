const request = require('superagent');

function requestMessages(requestData) {
  return request
    .post('/api/messages')
    .set('Content-Type', 'application/json')
    .send({ text: requestData })
    .then((response) => response.json())
    .catch((err) => console.log(err));
}

function sendMessage(text) {
  return requestMessages({
    body: JSON.stringify({
      text,
    }),
  });
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
  const chatArea = document.body.getElementsByClassName('chat-send');
  console.log('Chat Area: ', chatArea);
  //chatArea.getElementById('send').onClick = function () {
    const text = chatArea.getElementById('#').value;
    console.log('TEXT: ', text);
    if (text) {
      console.log('text was sent');
      sendMessage(text).then(() => {
        chatArea.getElementById('#').value = '';
      });
    }
 // };
}
