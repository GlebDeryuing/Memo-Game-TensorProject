/* eslint-disable no-undef */
const request = require('superagent');

function removeAllUsers() {
  const users = document.querySelectorAll('.user');
  users.forEach((user) => user.remove);
}

function createDiv(className, user) {
  const div = document.createElement('div');
  div.className = className;
  div.textContent = user;
  return div;
}

function addUsers(users) {
  removeAllUsers();
  const usersArea = document.getElementById('#listUsers-body');
  Object.values(users).map((user) => console.log(user.name))
    .forEach((div) => usersArea.append(div));
}

export default function getUsers() {
  request
    .get('/api/users')
    .then((res) => res.body)
    .then(addUsers)
    .catch((err) => console.log(err));
}
