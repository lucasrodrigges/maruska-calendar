import fetch from 'node-fetch';

export default async function getMus(request, response) {
  const URL = 'http://18.231.68.157:3000/getMus';

  const res = await fetch(URL);
  const db = await res.json();

  response.status(200).json({
    db,
  });
}
