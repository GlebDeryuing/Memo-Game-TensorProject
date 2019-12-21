const request = require('superagent');

export default function authorize() {
  document.addEventListener('click', () => {
    const login = document.getElementById('login').value;
    request
      .post('/api/users')
      .set('Content-Type', 'application/json')
      .send({ name: login })
      .then(console.log('authorized!'))
      .catch((err) => console.log(err));
  });
}
