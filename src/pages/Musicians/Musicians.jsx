import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Loading from '../../components/Loading';
import { app, db } from '../../services/firebase';
import { getFromLS } from '../../services/localStorage';

export default function Musicians() {
  const [musicians, setMusicians] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const navigate = useNavigate();

  const auth = getAuth(app);

  useEffect(() => {
    onAuthStateChanged(auth, ({ accessToken }) => {
      const currAccessToken = getFromLS('session').accessToken;

      if (accessToken !== currAccessToken) navigate('/maruska-calendar');
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
    setLoading(false);
  }, []);

  return (
    <div>
      {isLoading ? <Loading /> : (
        <div>
          <Header />
          {musicians.length > 0 ? (
            musicians.map(({ name, instrument }) => (
              <div key={name}>
                <h3>{name}</h3>
                <p>{instrument}</p>
              </div>
            ))
          ) : <p>Não há músicos cadastrados</p>}
        </div>
      )}
      <button type="button" onClick={() => navigate(-1)}>Voltar</button>
      <button type="button" onClick={() => navigate('/maruska-calendar/novo-musico')}>Cadastrar Músico</button>
    </div>
  );
}
