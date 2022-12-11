import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../style/Musicians.css';
import { GlobalContext } from '../context/GlobalProvider';
import UserRoute from '../hooks/axios/routes/UserRoute';

export default function AdminButtons({ type }) {
  const { showActions, setShowActions } = useContext(GlobalContext);

  const [isAdmin, setAdmin] = useState(false);

  const navigate = useNavigate();
  const route = UserRoute();

  useEffect(() => {
    route.getMe().then(({ status, data }) => {
      if (status === 200) setAdmin(data.isAdmin);
      else setAdmin(false);
    });
  }, []);

  if (type === 'newMus' && isAdmin) {
    return (
      <button
        className="button-1"
        type="button"
        onClick={() => navigate('/novo-musico')}
      >
        Cadastrar músico
      </button>
    );
  } if (type === 'addEvent' && isAdmin) {
    return (
      <button
        className="button-2"
        type="button"
        onClick={() => {
          setShowActions(!showActions);
          navigate('/novo-show');
        }}
      >
        Agendar Show
      </button>
    );
  } if (type === 'dashboard' && isAdmin) {
    return (
      <button
        className="button-1"
        type="button"
        onClick={() => navigate('/painel-de-controle')}
      >
        Painel de Controle
      </button>
    );
  }
  return '';
}

AdminButtons.propTypes = {
  type: PropTypes.string,
}.isRequired;
