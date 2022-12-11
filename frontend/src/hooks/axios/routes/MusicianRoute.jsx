import UseAxios from '../UseAxios';

export default function MusicianRoute() {
  const axios = UseAxios();

  const getMusicians = () => (
    axios.get('/musician')
      .then(({ status, data }) => ({ status, data }))
      .catch(({ response: { status, data } }) => ({ status, data }))
  );

  const createMusician = (body) => (
    axios.post('/musician', body)
      .then(({ status, data }) => ({ status, data }))
      .catch(({ response: { status, data } }) => ({ status, data }))
  );

  return { getMusicians, createMusician };
}
