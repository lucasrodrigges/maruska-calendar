import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  collection, getDocs,
} from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFromLS } from '../../services/localStorage';
import { app, db } from '../../services/firebase';
import Header from '../../components/Header';
import EventReview from '../../components/EventReview';
import { EventContext } from '../../context/EventProvider';

export default function BandForm() {
  const {
    members,
    setMembers,
  } = useContext(EventContext);

  const [thisMusician, setThisMusician] = useState('');
  const [musicians, setMusicians] = useState([]);
  const [cloneMusicians, setCloneMusicians] = useState([]);
  const [errorMessage, setError] = useState('');
  const [showReview, setReview] = useState(false);

  const navigate = useNavigate();

  const auth = getAuth(app);

  useEffect(() => {
    onAuthStateChanged(auth, ({ accessToken }) => {
      const currAccessToken = getFromLS('session').accessToken;

      if (accessToken !== currAccessToken) navigate('/');
    });
  }, []);

  useEffect(() => async () => {
    const musiciansArr = [];
    const querySnapshot = await getDocs(collection(db, 'musicians'));
    querySnapshot.forEach((doc) => {
      const { id } = doc;
      const musician = doc.data();
      musiciansArr.push({ ...musician, id });
    });
    setMusicians([...musicians, ...musiciansArr]);
    setCloneMusicians([...musicians, ...musiciansArr]);
  }, []);

  function handleChange({ target: { value } }) {
    if (value === '') {
      setThisMusician('');
      return;
    }
    const findMusician = musicians.find((each) => (each.name === value));
    setThisMusician(findMusician);
    setError('');
  }

  function deleteMusician(name) {
    setMembers(members.filter((each) => each.name !== name));
    setMusicians([...musicians, cloneMusicians.find((musician) => musician.name === name)]);
  }

  function addMusician(e) {
    e.preventDefault();

    if (thisMusician === '') {
      setError('Selecione um músico');
      return;
    }
    setMusicians(musicians.filter(({ name }) => name !== thisMusician.name));
    const includes = members.some(({ name }) => name === thisMusician.name);
    if (includes) {
      setError('Músico já cadastrado');
      return;
    }
    setMembers([...members, thisMusician]);
  }

  function createMusicianList(array) {
    if (members.length === 0) {
      return (<span>Você ainda não selecionou nenhum músico...</span>);
    }
    const musicianList = array.map(({ name, instrument }) => (
      <div key={name}>
        <span>{`${name} (${instrument})`}</span>
        <button type="button" onClick={() => deleteMusician(name)}>Excluir</button>
      </div>
    ));
    return musicianList;
  }

  function createSelects() {
    if (!musicians.length) {
      return (<option value="">Carregando...</option>);
    }
    return musicians.map(({ name }) => (<option key={name} value={name}>{name}</option>));
  }

  return (
    <div>
      <Header />
      <h2>Adicione Músicos</h2>
      <form action="" onSubmit={() => setReview(true)}>
        <div>
          <label htmlFor="musician">
            Músico
            <select name="musician" onChange={handleChange}>
              <option value="">Selecione</option>
              {createSelects()}
            </select>
            <button type="submit" onClick={addMusician}>Adicionar Músico</button>
          </label>
          {errorMessage && <p>{errorMessage}</p>}
        </div>
      </form>
      <div>
        {createMusicianList(members)}
      </div>
      <button type="button" disabled={errorMessage} onClick={() => setReview(true)}>Revisar</button>
      <button type="button" onClick={() => navigate('/novo-musico')}>Cadastrar um novo músico</button>
      {showReview && <EventReview members={members} cloneMusicians={cloneMusicians} />}
    </div>
  );
}
