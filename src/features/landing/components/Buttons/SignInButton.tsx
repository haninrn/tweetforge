import React from 'react';

import './Button.css';
import '../../../../assets/global.css';

interface SignInButtonProps {
    handleClick: () => void;
}

export const SignInButton:React.FC<SignInButtonProps> = ({handleClick}) => {
    return (
        <div className="landing-button sign-in" onClick={handleClick}>
            <p className="sign-up-text color-blue">Sign in</p>
        </div>


    )
}