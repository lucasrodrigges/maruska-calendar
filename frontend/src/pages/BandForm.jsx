import React, { useEffect, useState, useContext } from 'react';
import {
  collection, getDocs,
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../services/firebase';
import Header from '../components/Header';
import EventReview from '../components/EventReview';
import { EventContext } from '../context/EventProvider';
// import '../style/App.css';
import '../style/BandForm.css';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import { UserContext } from '../context/UserProvider';
import { ADMIN_UID_ARR } from '../helpers/data';

export default function BandForm() {
  const { UID } = useContext(UserContext);
  const {
    members,
    setMembers,
  } = useContext(EventContext);

  const [thisMusician, setThisMusician] = useState('');
  const [musicians, setMusicians] = useState([]);
  const [cloneMusicians, setCloneMusicians] = useState([]);
  const [errorMessage, setError] = useState('');
  const [showReview, setReview] = useState(false);
  const [isLoaging, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = ADMIN_UID_ARR.includes(UID);
    if (!isAdmin) navigate('/calendario');
    else setLoading(false);
  }, []);

  useEffect(() => {
    const musiciansArr = [];
    getDocs(collection(db, 'musicians'))
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const { id } = doc;
          const musician = doc.data();
          musiciansArr.push({ ...musician, id });
        });
        setMusicians([...musicians, ...musiciansArr]);
        setCloneMusicians([...musicians, ...musiciansArr]);
      });
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
      return (<span className="error-message">Você ainda não selecionou nenhum músico...</span>);
    }
    const musicianList = array.map(({ name, instrument }) => (
      <div className="musicians-list" key={name}>
        <span>{`${name} (${instrument})`}</span>
        <button
          className="fa-solid fa-circle-minus del-button"
          type="button"
          onClick={() => deleteMusician(name)}
        >
          <i />
        </button>
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

  return isLoaging ? <Loading /> : (
    <div>
      <Header />
      <div className="band-form-container">
        <h2 className="band-form-title">Adicionar integrantes</h2>
        <form className="band-form" action="" onSubmit={() => setReview(true)}>
          <select
            className="input-1"
            name="musician"
            onChange={handleChange}
          >
            <option value="">Selecione</option>
            {createSelects()}
          </select>
          <button
            className="button-1"
            type="submit"
            onClick={addMusician}
          >
            Adicionar
          </button>
          {errorMessage && (
          <p className="error-message">{errorMessage}</p>
          )}
        </form>
        <div>
          {createMusicianList(members)}
        </div>
        <button
          className="button-1"
          type="button"
          disabled={errorMessage}
          onClick={() => setReview(true)}
        >
          Revisar
        </button>
        {showReview && <EventReview members={members} cloneMusicians={cloneMusicians} />}
      </div>
      <Footer />
    </div>
  );
}