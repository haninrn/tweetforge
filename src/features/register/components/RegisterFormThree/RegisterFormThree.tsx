import React from 'react';
import { ValidatedDisplay } from '../../../../components/ValidatedInput/ValidatedDisplay';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser } from '../../../../redux/Slices/RegisterSlice';
import { RootState, AppDispatch } from '../../../../redux/Store';
import { stringifyDate } from '../../utils/DateUtils';
import { StyledNextButton } from '../RegisterNextButton/RegisterNextButton';
import './RegisterFormThree.css';
import { cleanDateForRequest } from '../../utils/DateUtils';


export const RegisterFormThree:React.FC = () => {

    const state = useSelector((state:RootState) => state.register);
    const dispatch:AppDispatch = useDispatch();

    const submitUser = () =>{



        const user = {
            firstName: state.firstName,
            lastName: state.lastName,
            email: state.email,
            dob: cleanDateForRequest(state.dob)
        }   

        console.log("we are attempting to register the user");

        dispatch(registerUser(user));
    }

    return(
        <div className='reg-step-three-container'>
            <div className='reg-step-three-content'>
                <h1 className='reg-step-three-header'>Create your account</h1>
                <div className='reg-step-three-value'>
                    <ValidatedDisplay label={'Name'} value={`${state.firstName} ${state.lastName}`}/>    
                </div>
                <div className='reg-step-three-value'>
                    <ValidatedDisplay label={'Email'} value={state.email}/>
                    {state.error ?
                        <p className='reg-step-three-error'>The email you specified is in use, please use a different one</p> : <></>
                    }    
                </div>
                <div className='reg-step-three-value'>
                    <ValidatedDisplay label={'Birth date'} value={stringifyDate(state.dob)}/>    
                </div>
                <p className='reg-step-three-policy'>
                    By signing up you agree <span className='reg-step-three-link'>Terms of Services</span> and <span
                    className='reg-step-three-link'>Privacy Policy</span>, including <span className='reg-step-three-link'>Cookie
                    Use</span>. TweetForge may use your contact information, including your email address and phone number for purposes
                    outlined in our Privacy Policy, like keeping your account secure and personalizing our services including ads.
                    <span className='reg-step-three-link'>Learn more</span>. Others will be able to find you by email or phone
                    number. when provided unless you choose otherwise <span className='reg-step=three-link'>here</span>.
                </p>
            </div>
            <StyledNextButton onClick={submitUser} color={'blue'} active={true}>Sign Up</StyledNextButton>
        </div>
    )
}