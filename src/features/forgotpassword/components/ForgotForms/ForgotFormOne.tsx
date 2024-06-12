import React from 'react';
import { ValidatedTextInput } from '../../../../components/ValidatedInput/ValidatedTextInput';

import './ForgotForm.css';
import '../../../../assets/global.css';

interface ForgotFormOneProps {
    setCredential:(name:string) => void;
    error: boolean;
}

export const ForgotFormOne:React.FC<ForgotFormOneProps> = ({setCredential, error}) => {

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setCredential(e.target.value);
    }

    return(
        <div className="forgot-form-container">
            <h1 className="forgot-form-header">
                Find your TweetForge Account
            </h1>
            <p className="forgot-form-text color-gray">
                Enter you email, phone number, or username associated with you account to change your password.
            </p>
            <ValidatedTextInput
                valid={!error}
                name={"forgot"}
                label={"Email, phone number, or username"}
                changeValue={handleChange}
            />
            {error ? <p className="color-red forgot-error">User not found</p> : <></>}
        </div>
    )
}