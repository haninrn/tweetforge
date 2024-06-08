import React from "react";

import blueLogo from '../../../../../assets/fwitter-logo-large-blue.png';
import './ForgotModalTop.css';
import '../../../../../assets/global.css';

interface ForgotModalTopProps {
    closeModal: ()=> void;
}

export const ForgotModalTop:React.FC<ForgotModalTopProps> = ({closeModal}) => {
    return(
        <div className="forgot-modal-top">
            <div className="forgot-modal-top-left" onClick={closeModal}>
                <div className="forgot-modal-top-shadow">
                    x
                </div>
            </div>
            <div className="forgot-modal-top-middle">
                <img className="forgot-modal-top-logo" src={blueLogo}/>
            </div>
            <div className="forgot-modal-top-right"></div>
    </div>
    );
};