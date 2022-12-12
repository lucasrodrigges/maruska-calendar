import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading';
import AdminButtons from '../components/AdminButtons';
import '../style/Musicians.css';
import { GlobalContext } from '../context/GlobalProvider';
import { getMusicians } from '../api/routes/musicianRoute';

export default function Musicians() {
  const {
    musicians,
    setMusicians,
    isLoading,
  } = useContext(GlobalContext);

  useEffect(() => {
    getMusicians().then(({ status, data }) => {
      if (status === 200) setMusicians(data);
      else setMusicians([]);
    });
  }, []);

  return (
    <div>
      {isLoading ? <Loading /> : (
        <div>
          <Header />
          <div className="registered-musicians">
            {musicians.length > 0 ? (
              musicians.map(({ name, instrument }) => (
                <div className="musician-card" key={name}>
                  <div>
                    <h3 className="musician-name">{name}</h3>
                    <p>{`Instrumento: ${instrument}`}</p>
                  </div>
                  <i className="fa-solid fa-user musicians-icon" />
                </div>
              ))
            ) : <p>Não há músicos cadastrados</p>}
            <AdminButtons type="newMus" />
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
}
