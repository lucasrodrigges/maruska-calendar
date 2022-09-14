export default async function getMus() {
  const URL = 'http://18.231.68.157:3000/getMus';

  const data = await fetch(URL);
  const response = await data.json();

  return response;
}
