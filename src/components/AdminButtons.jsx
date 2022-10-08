import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { UserContext } from '../context/UserProvider';
import { ADMIN_UID_ARR } from '../helpers/data';
import '../style/Musicians.css';
import { CalendarContext } from '../context/CalendarProvider';

export default function AdminButtons({ type }) {
  const { UID } = useContext(UserContext);
  const { showActions, setShowActions } = useContext(CalendarContext);

  const isAdmin = ADMIN_UID_ARR.includes(UID);

  const navigate = useNavigate();

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
  } return '';
}

AdminButtons.propTypes = {
  type: PropTypes.string,
}.isRequired;
