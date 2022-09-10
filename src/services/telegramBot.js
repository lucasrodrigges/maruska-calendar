import fetch from 'node-fetch';

export default async function sendTelegramMessage(userId, msg) {
  const options = {
    method: 'POST',
    headers: { Authorization: 'Bearer ACCESS_TOKEN', 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: userId, text: msg }),
  };

  fetch(`https://api.telegram.org/bot${process.env.REACT_APP_TOKEN}/sendMessage`, options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}
