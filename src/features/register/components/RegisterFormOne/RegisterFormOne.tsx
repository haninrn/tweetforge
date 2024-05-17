import React, {useState, useEffect} from 'react'

import { validateName } from '../../../../services/Validators';

import { ValidatedInput } from '../../../../components/ValidatedInput/ValidatedInput';

import './RegisterFormOne.css'
import { ValidatedDateSelector } from '../../../../components/ValidatedInput/ValidatedDateSelector';
import { RegisterDateInput } from '../RegisterDateInput/RegisterDateInput';

interface FormOneState{
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth: string;
}

export const RegisterFormOne:React.FC = () => {

    const [stepOneState, setStepOneState] = useState<FormOneState> ({
        firstName: "",
        lastName: "",
        email: "",
        dateOfBirth: ""
    });

    const updateUser = (e:React.ChangeEvent<HTMLInputElement>): void => {
        setStepOneState({...stepOneState, [e.target.name]: e.target.value});
    }

    useEffect(() => {
        console.log("State change: " , stepOneState);
    }, [stepOneState])

  return (
    <div className="reg-step-one-container">
        <div className="reg-step-one-content">
            <ValidatedInput name={"firstName"} label={"first"}
                errorMessage={"What's your name?"}
                changeValue = {updateUser}
                validator ={validateName}
            />
            <ValidatedInput name={"lastName"} label={"last"}
                errorMessage={"What's your name?"}
                changeValue = {updateUser}
                validator ={validateName}
            />
            <ValidatedInput name={"email"} label={"Email"}
                errorMessage={"Please enter a valid email"}
                changeValue = {updateUser}
                validator ={() => true}
            />
            <RegisterDateInput />
        </div>
    </div>
  )
}
