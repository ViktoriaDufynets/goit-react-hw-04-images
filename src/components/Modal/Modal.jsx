import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({currentImageUrl, currentImageDescription, onClose}) {

  useEffect(() => {
   const hanpleKeydown = e => {
       if (e.code === 'Escape') {
         onClose();
       }
   }
  
   window.addEventListener('keydown', hanpleKeydown);

   return () => window.removeEventListener('keydown', hanpleKeydown);
 }, [onClose]);

 const handleClickBackdrop = e => {
   if (e.target === e.currentTarget) {
     onClose();
   }
  };
  
  
      return createPortal(
        <div className={css.Backdrop} onClick={handleClickBackdrop}>
          <div className={css.Modal}>
            <img
              src={currentImageUrl}
              alt={currentImageDescription}
            />
          </div>
        </div>,
        modalRoot
      );
    }
  
  
  Modal.propTypes = { 
    onClose: PropTypes.func.isRequired,
    currentImageUrl: PropTypes.string,
    currentImageDescription: PropTypes.string,
  };

