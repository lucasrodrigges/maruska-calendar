import UseAxios from '../UseAxios';

export default function EventRoute() {
  const axios = UseAxios();

  const getEvents = () => (
    axios.get('/event')
      .then(({ status, data }) => ({ status, data }))
      .catch(({ response: { status, data } }) => ({ status, data }))
  );

  const getEventById = (id) => (
    axios.get(`/event/${id}`)
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

  return {
    getEvents, getEventById, createEvent, deleteEvent,
  };
}
