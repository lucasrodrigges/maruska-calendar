import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Loading from '../components/Loading';
import useCheckLogin from '../context/hooks/useCheckLogin';
import { MusiciansContext } from '../context/MusiciansProvider';
import '../style/Musicians.css';

export default function Musicians() {
  const {
    musicians,
    isLoading,
  } = useContext(MusiciansContext);

  const navigate = useNavigate();

  useCheckLogin();

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
            <button
              className="button-1"
              type="button"
              onClick={() => navigate('/novo-musico')}
            >
              Cadastrar músico
            </button>
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
}
