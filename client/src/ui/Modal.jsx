import React from 'react';
import { createPortal } from 'react-dom';

const Backdrop = ({onClose}) => {
    return <div className="backdrop" onClick={onClose}></div>
}

const ModalOverlay = ({children}) => {
    return <div className='modal'>{children}</div>
}

const Modal = ({onClose , children}) => {
    return (
        <>
            {createPortal(
                <Backdrop onClose={onClose} /> , document.getElementById("overlays")
            )}
            {createPortal(
                <ModalOverlay>{children}</ModalOverlay> , 
                document.getElementById("overlays")
            )}
        </>
    );
};

export default Modal;