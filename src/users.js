/* eslint-disable no-undef */
const request = require('superagent');

function removeAllUsers() {
  const users = document.querySelectorAll('.users');
  users.forEach((user) => user.remove);
}

function createDiv(className, user) {
  const div = document.createElement('div');
  div.className = className;
  div.textContent = user;
}

function addUsers(users) {
  const usersArea = document.body.getElementsByClassName('users-body');

  users.forEach((user) => createDiv('.user', user))
    .forEach((div) => usersArea.append(div));
}

export default function getUsers() {
  request
    .get('/api/users')
    .then((res) => res.body)
    .then((users) => {
      removeAllUsers();
      addUsers(users.name);
    })
    .catch((err) => console.log(err));
}
