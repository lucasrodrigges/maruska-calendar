/* eslint-disable no-console */
const fetch = require('node-fetch');

export async function addMus(name, phoneNumber, instrument) {
  const URL = `http://18.231.68.157:3000/addMus/${process.env.REACT_APP_API_TOKEN}`;

  const body = {
    name, phoneNumber, instrument,
  };

  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };

  fetch(URL, options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}

export async function getMus() {
  const URL = 'http://18.231.68.157:3000/getMus';

  const data = await fetch(URL);
  const response = await data.json();

  return response;
}
