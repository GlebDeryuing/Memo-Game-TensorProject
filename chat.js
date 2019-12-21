const request = require('superagent');

function requestMessages(requestData) {
  return request
    .post('/api/messages')
    .set('Content-Type', 'application/json')
    .send({ text: requestData })
    .then((response) => JSON.stringify(response))
    .catch((err) => console.log(err));
}

/*function sendMessage(text) {
  return text;
}*/

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

export function sendButtonClick(message) {
  const text = message;
  // chatArea.getElementById('send').onClick = function () {
  console.log('TEXT: ', text);
  if (text) {
    console.log('text was sent');
    requestMessages(text).then(() => {
      text = '';
    });
  }
  // };
}
