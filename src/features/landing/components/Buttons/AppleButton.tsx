import React from 'react';

import apple from '../../../../assets/apple.png';
import '../../../../assets/global.css';
import './Buttons.css';

export const AppleButton:React.FC = () => {
    return(
        <div className="landing-button apple">
            <img src={apple} className="landing-button-logo"/>
            <p className="apple-text">Sign up with Apple</p>
        </div>
    )
}