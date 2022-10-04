import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CalendarContext } from '../context/CalendarProvider';
import '../style/Footer.css';

export default function Footer() {
  const { showActions, setShowActions } = useContext(CalendarContext);
  return (
    <footer className="footer">
      <Link to="/calendario">
        <i className="fa-solid fa-house icons footer-icons" />
      </Link>
      <button
        className="reset-button fa-solid fa-circle-plus icons plus-button footer-icons footer-icons"
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
  );
}
