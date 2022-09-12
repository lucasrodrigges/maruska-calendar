/* eslint-disable no-console */

export default async function sendWppMessage(obj) {
  const {
    number, musician, date, location,
  } = obj;
  const body = `{"messaging_product":"whatsapp","to":${number},"type":"template","template":{"name":"scheduled_events_template","language":{"code":"pt_BR"},"components":[{"type":"body","parameters":[{"type":"text","text":"${musician}"},{"type":"text","text":"${date}"},{"type":"text","text":"${location}"}]}]}}`;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: process.env.REACT_APP_WPP_TOKEN,
    },
    body,
  };

  fetch('https://graph.facebook.com/v14.0/103144999216868/messages/', options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}
