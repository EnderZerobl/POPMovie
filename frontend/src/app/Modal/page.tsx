import React from 'react';
import './modal.css';
import Pesquisar from '../Pesquisar/pesquisa';
import Image from 'next/image';

interface ModalProps {
    isOpen: boolean;
    handleClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, handleClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={handleClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={handleClose}><Image src='/close.png' alt='Fechar' width={20} height={20} /></button>
                <Pesquisar/>
            </div>
        </div>
    );
};

export default Modal;
