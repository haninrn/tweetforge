import React from 'react';

import blueLogo from '../../../assets/fwitter-logo-large-blue.png';
import './LoginModalTop.css';

interface LoginModalTopProps {
    closeModal: ()=>void;
}

export const LoginModalTop:React.FC<LoginModalTopProps>=({closeModal}) => {
    return (
        < div className="login-modal-top">
            <div className="login-modal-top-left">
            <div className="login-modal-top-shadow" onClick={closeModal}>
                X
            </div>
            </div>
            <div className="login-modal-top-middle">
                <img className="login-modal-top-logo" src={blueLogo} />
            </div>
            <div className="login-modal-top-right"></div>
        </div>
    )
}