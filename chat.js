const request = require('./node_modules/superagent');

export default function sent() {
  request
    .post('/api/users')
    .set('Content-Type', 'application/json')
    .send({ name: 'lol' })
    .then(console.log('ready!'))
    .then((res) => {
      const sid = JSON.parse(res.body.sid);
      console.log(sid);
    })
    .catch((err) => console.log(err));

  request
    .get('/api/users')
    .set('Content-Type', 'application/json')
    .then((res) => {
      const users = JSON.parse(res.body.users.all);
      console.log(users);
    });
}
