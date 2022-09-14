import fetch from 'node-fetch';

export default async function handler() {
  const URL = 'http://18.231.68.157:3000/getMus';

  const data = await fetch(URL);
  const res = await data.json();
  return res;
  // return response.status(200).json({ res });
}
