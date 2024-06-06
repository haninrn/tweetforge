import React from 'react';

import google from '../../../../assets/google.png';
import '../../../../assets/global.css';
import './Button.css';

export const GoogleButton:React.FC = () => {
    return (
        <div className="landing-button color-gray google">
            <img src={google} className="landing-button-logo"/>
            <p className="google-text">Sign up with Google</p>
        </div>


    )
}
