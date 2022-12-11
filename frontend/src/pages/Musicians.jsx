import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading';
import AdminButtons from '../components/AdminButtons';
import '../style/Musicians.css';
import { GlobalContext } from '../context/GlobalProvider';

export default function Musicians() {
  const {
    musicians,
    isLoading,
  } = useContext(GlobalContext);

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
