/* eslint-disable no-console */
export default async function addMus(name, phoneNumber, instrument) {
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
