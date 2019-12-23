/* eslint-disable no-undef */
const request = require('superagent');

const gameName = 'Memo';

export function createId() {
  return request
    .post('/api/records')
    .set('Content-Type', 'application/json')
    .send({ game: gameName })
    .catch((err) => console.log(err));
}

export function add(userId, points) {
  request
    .patch('/api/records')
    .set('Content-Type', 'application/json')
    .send({
      id: userId,
      score: points,
    })
    .catch((err) => console.log(err));
}

export function getAll() {
  return request
    .get('/api/records')
    .set('Content-Type', 'application/json')
    .then((res) => res.body)
    .catch((err) => console.log(err));
}
