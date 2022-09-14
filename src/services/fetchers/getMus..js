/* eslint-disable no-console */
// const fetch = require('node-fetch');

export default async function getMus() {
  const URL = 'https://maruska-calendar-api.herokuapp.com/getMus';

  const data = await fetch(URL);
  const response = await data.json();

  return response;
}
