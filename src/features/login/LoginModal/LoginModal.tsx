import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {Modal} from '../../../components/Modal/Modal';
import { LoginModalTop } from '../LoginModalTop/LoginModalTop';
import { LoginFormOne } from '../LoginForm/LoginFormOne';
import { LoginFormTwo } from '../LoginForm/LoginFormTwo';
import { LoginButton } from '../LoginButton/LoginButton';

import { RootState } from '../../../redux/Store';
import { useSelector } from 'react-redux';


interface LoginModalProps {
    toggleModal: ()=>void;
    toggleRegister: ()=>void;
    toggleForgot: ()=>void;
}

export const LoginModal:React.FC<LoginModalProps>=({toggleModal, toggleRegister, toggleForgot}) => {

    const navigate = useNavigate();

    const state = useSelector((state:RootState) => state.user);

    const [password, setPassword] = useState<string>('');

    const handlePassword = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const openRegister = () => {
        toggleModal();
        toggleRegister();
    }

    useEffect(() => {
        if(state.loggedIn){
            navigate('/home');

            return() => {

            }
        }
    })

    return (
        <Modal
        topContent={<LoginModalTop closeModal={toggleModal} />}
        content={state.username ? <LoginFormTwo setPassword={handlePassword} /> : <LoginFormOne  noAccount={openRegister} forgot={toggleForgot}/>}
        bottomContent={state.username ? <LoginButton username={state.username} password={password} /> : <></>}
        />
    )
}