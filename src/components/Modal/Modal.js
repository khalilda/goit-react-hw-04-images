import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import s from '../Modal/Modal.module.css';

const Modal = ({ onModalClose, largeImageURL }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.keyCode === 27) {
        return onModalClose();
      }
      if (e.target === e.currentTarget) {
        onModalClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onModalClose]);

  


  return (
    <div className={s.Overlay} onClick={onModalClose}>
      <div className={s.Modal}>
        <img src={largeImageURL} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  onModalClose: PropTypes.func,
  largeImageURL: PropTypes.string.isRequired,
};

export default Modal;


