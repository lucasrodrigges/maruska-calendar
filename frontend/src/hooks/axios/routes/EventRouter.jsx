import UseAxios from '../UseAxios';

export default function EventRouter() {
  const axios = UseAxios();

  const getEvents = () => (
    axios.get('/event')
      .then(({ status, data }) => ({ status, data }))
      .catch(({ response: { status, data } }) => ({ status, data }))
  );

  const createEvent = (body) => (
    axios.post('/event', body)
      .then(({ status, data }) => ({ status, data }))
      .catch(({ response: { status, data } }) => ({ status, data }))
  );

  const deleteEvent = (id) => (
    axios.delete(`/event/${id}`)
      .then(({ status, data }) => ({ status, data }))
      .catch(({ response: { status, data } }) => ({ status, data }))
  );

  return { getEvents, createEvent, deleteEvent };
}
