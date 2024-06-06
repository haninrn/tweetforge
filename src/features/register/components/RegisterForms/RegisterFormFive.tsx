import React, { useState} from 'react';
import {  useDispatch, useSelector } from 'react-redux';
import { ValidatedTextInput } from '../../../../components/ValidatedInput/ValidatedTextInput';
import { RootState, AppDispatch } from '../../../../redux/Store';
import { resendEmail, sendVerification, updateRegister } from '../../../../redux/Slices/RegisterSlice';
import'./RegisterForm.css';
import '../../../../assets/global.css';


export const RegisterFormFive:React.FC = () => {

    const state = useSelector((state: RootState) => state.register);

    const dispatch:AppDispatch = useDispatch();

    const [code , setCode] = useState<string>("");

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setCode(e.target.value);
        dispatch(updateRegister({
            name: "code",
            value: e.target.value

        }));
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
        <div className="register-container">
            <div className="register-content">
                <h1 className="register-header-2">We sent you a code</h1>
                <p className="register-text color-gray">Enter it below to verify {state.email}</p>
                <div className = "register-five-input-wrapper">
                <ValidatedTextInput valid={true} name={'code'}
                    label={"Verification Code"} changeValue={handleChange}/>
                <p className="register-five-message color-blue" onClick={resend}>Didn't receive an email?</p>
                </div>
            </div>
        </div>
    )
}