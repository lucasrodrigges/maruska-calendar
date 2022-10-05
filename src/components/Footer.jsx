import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CalendarContext } from '../context/CalendarProvider';
import '../style/Footer.css';

export default function Footer() {
  const { showActions, setShowActions } = useContext(CalendarContext);

  const navigate = useNavigate();

  return (
    <div className="footer-container">
      {showActions && (
      <div className="buttons-container">
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
        <button
          className="button-2"
          type="button"
        >
          Shows Realizados
        </button>
        <button
          className="button-2"
          type="button"
          onClick={() => {
            setShowActions(!showActions);
            navigate('/musicos');
          }}
        >
          Músicos Cadastrados
        </button>
      </div>
      )}
      <footer className="footer">
        <Link to="/calendario">
          <i className="fa-solid fa-house icons footer-icons" />
        </Link>
        <button
          className="plus-footer-button fa-solid fa-circle-plus icons plus-button footer-icons footer-icons"
          type="button"
          onClick={() => setShowActions(!showActions)}
        >
          <i />
          {/* <i className="fa-solid fa-circle-plus icons plus-button footer-icons" /> */}
        </button>
        <Link to="/">
          <i className="fa-solid fa-right-from-bracket icons footer-icons" />
        </Link>
      </footer>
    </div>
  );
}
