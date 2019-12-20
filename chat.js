const request = require('./node_modules/superagent');

export default function sent() {
  request
    .post('/api/users')
    .set('Content-Type', 'application/json')
    .send({ name: 'lol' })
    .then(console.log('ready!'))
    .then((res) => {
      console.log(res.body.Cookie.sid);
    })
    .catch((err) => console.log(err));

  /*request
    .get('/api/users')
    .set('Content-Type', 'application/json')
    .then(res => {
      const users = new json.JSONObject(res);
      console.log(users);
    });*/
}
