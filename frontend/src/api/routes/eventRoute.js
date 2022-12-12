import axios from '../axios';

export const getEvents = () => (
  axios().get('/event')
    .then(({ status, data }) => ({ status, data }))
    .catch(({ response: { status, data } }) => ({ status, data }))
);

export const getEventById = (id) => (
  axios().get(`/event/${id}`)
    .then(({ status, data }) => ({ status, data }))
    .catch(({ response: { status, data } }) => ({ status, data }))
);

export const createEvent = (body) => (
  axios().post('/event', body)
    .then(({ status, data }) => ({ status, data }))
    .catch(({ response: { status, data } }) => ({ status, data }))
);

export const updateEvent = (id, body) => (
  axios().put(`/event/${id}`, body)
    .then(({ status, data }) => ({ status, data }))
    .catch(({ response: { status, data } }) => ({ status, data }))
);

export const deleteEvent = (id) => (
  axios().delete(`/event/${id}`)
    .then(({ status, data }) => ({ status, data }))
    .catch(({ response: { status, data } }) => ({ status, data }))
);
