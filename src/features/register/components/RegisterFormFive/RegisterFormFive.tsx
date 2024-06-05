import React, {useEffect, useState} from 'react';
import { UseSelector, useDispatch, useSelector } from 'react-redux';
import { ValidatedTextInput } from '../../../../components/ValidatedInput/ValidatedTextInput';
import { RootState, AppDispatch } from '../../../../redux/Store';
import { StyledNextButton } from '../RegisterNextButton/RegisterNextButton';
import { resendEmail, sendVerification } from '../../../../redux/Slices/RegisterSlice';
import './RegisterFormFive.css';

export const RegisterFormFive:React.FC = () => {

    const state = useSelector((state: RootState) => state.register);

    const dispatch:AppDispatch = useDispatch();

    const [code , setCode] = useState<string>("");

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setCode(e.target.value);
    }

    const resend = () => {
        dispatch(
            resendEmail(state.username)
        )
    };

    const verify = () => {
        dispatch(
            sendVerification({
                username: state.username,
                code
            })
        )
    }

    return(
        <div className='reg-step-five-container'>
            <div className='reg-step-five-content'>
                <h1>We sent you a code</h1>
                <p>Enter it below to verify {state.email}</p>
                <ValidatedTextInput valid={true} name={'code'}
                    label={"Verification Code"} changeValue={handleChange}/>
                <p className='reg-step-five-message' onClick={resend}>Didn't receive an email?</p>

            </div>
            <StyledNextButton active={code ? true : false} disabled={code ? false : true} color={"black"}
                    onClick={verify}>Next</StyledNextButton>
        </div>
    )
}