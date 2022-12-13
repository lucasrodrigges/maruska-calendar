import React from 'react';
import PropTypes from 'prop-types';

import '../style/Calendar.css';

export default function AlertConfirm({ func, setShowAlert, content }) {
  return (
    <div className="alert-confirm">
      <div className="alert">
        <h3>{content}</h3>
        <button type="button" className="button-1" onClick={() => func()}>Sim</button>
        <button type="button" className="button-1" onClick={() => setShowAlert()}>Não</button>
      </div>
    </div>
  );
}

AlertConfirm.propTypes = {
  func: PropTypes.func.isRequired,
  setShowAlert: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
}.isRequired;
