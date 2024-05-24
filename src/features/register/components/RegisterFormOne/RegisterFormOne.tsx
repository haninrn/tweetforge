import React, {useState, useEffect} from 'react'

import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/Store';
import { incrementStep, updateRegister } from '../../../../redux/Slices/RegisterSlice';

import './RegisterFormOne.css'
import { RegisterDateInput } from '../RegisterDateInput/RegisterDateInput';
import { RegisterNameInputs } from '../RegisterNameInput/RegisterNameInputs';
import { RegisterEmailInput } from '../RegisterEmailInput/RegisterEmailInput';
import { StyledNextButton } from '../RegisterNextButton/RegisterNextButton';

interface FormOneState{
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
}

export const RegisterFormOne:React.FC = () => {

    const registerState = useSelector((state:RootState) => state.register);
    const dispatch:AppDispatch = useDispatch();

    const [buttonActive, setButtonActive] = useState<boolean>(false);

    const nextPage = () => {
        dispatch(updateRegister({
            name: "error",
            value: false
        }));
        dispatch(incrementStep());
    }

    useEffect(() => {
        
        if(registerState.dobValid && registerState.emailValid && registerState.firstNameValid && registerState.lastNameValid) {
            setButtonActive(true);
        } else {
            setButtonActive(false);
        }
       
    }, [registerState])

  return (
    <div className="reg-step-one-container">
        <div className="reg-step-one-content">
            <h1 className = "reg-step-one-header">Create your account</h1>
            <RegisterNameInputs firstName={registerState.firstName} lastName={registerState.lastName} />
            <RegisterEmailInput email={registerState.email} />
            <div className="reg-step-one-dob-dislaimer">
                <p className="reg-step-one-dob-header">Date of Birth</p>
                <span className='teg-step-one-dob-text'>
                    This will not be shown publicly. Confirm your own age, even if this account is for a business, pet, or something else.
                </span>
            </div>
            <RegisterDateInput date={registerState.dob} />
        </div>
        <StyledNextButton
            disabled={!buttonActive}
            color={"black"}
            active={buttonActive}
            onClick={nextPage}>
                Next
            </StyledNextButton>
    </div>
  )
}
