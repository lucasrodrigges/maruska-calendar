/* eslint-disable no-console */

export default async function sendWppMessage(obj) {
  const URL = `https://graph.facebook.com/v14.0/${process.env.REACT_APP_PHONE_ID}/messages/`;
  const {
    phoneNum, musician, date, location,
  } = obj;
  const body = {
    messaging_product: 'whatsapp',
    to: phoneNum,
    type: 'template',
    template: {
      name: 'scheduled_events_template',
      language: { code: 'pt_BR' },
      components: [{
        type: 'body',
        parameters: [{
          type: 'text',
          text: musician,
        }, {
          type: 'text',
          text: date,
        }, {
          type: 'text',
          text: location,
        }],
      }],
    },
  };

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.REACT_APP_WPP_TOKEN}`,
    },
    body: JSON.stringify(body),
  };

  fetch(URL, options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
}
