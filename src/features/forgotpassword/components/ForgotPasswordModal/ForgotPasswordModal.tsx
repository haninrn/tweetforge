import React, {useState, useEffect} from "react";
import { Modal } from "../../../../components/Modal/Modal";
import { ForgotModalTop } from "./ForgotModalTop/ForgotModalTop";
import { ForgotFormOne } from "./ForgotForms/ForgotFormOne";
import { validateEmail, validatePhone } from "../../../../services/Validators";
import { ForgotButtonOne } from "./ForgotButtonOne/ForgotButtonOne";
import { ForgotFormTwo } from "./ForgotForms/ForgotFormTwo";
import { ForgotButtonTwo } from "../ForgotButtonTwo/ForgotButtonTwo";
import axios from "axios";
import { determineForgotButton, determineForgotFormContent } from "../../utils/ForgotPasswordUtils";

interface UserInfo {
    email:string;
    phone:string;
    username:string;
}

export const ForgotPasswordModal:React.FC<{toggleModal:()=>void}> = ({toggleModal}) => {

    const [credential, setCredential] = useState<string>('');
    const [userInfo, setUserInfo] = useState<UserInfo>({
        email: '',
        phone: '',
        username: ''
    });

    const [error, setError] = useState<boolean>(false);
    const [step, setStep] = useState<number>(1);
    const [resetCode, setResetCode] = useState<number>(0);
    const [userInputCode, setUserInputCode] = useState<number>(0);
    const [password, setPassword] = useState<Record<string, string>>({
        password: '',
        confirm: ''
    });
    const [matching , setMatching] = useState<boolean>(true);

    const changeCredential = (credential:string) => {
        setCredential(credential);
    }

    const changeUserInputCode = (value:number) => {
        setUserInputCode(value);
    }

    const updatePassword = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPassword({
            ...password,
            [e.target.name]: e.target.value
        })
    }

    const searchUser = async () => {
        let findUserDTO = {
            email: '',
            phone: '',
            username: '',
        };

        if(validateEmail(credential)) {
            findUserDTO = {
                ...findUserDTO,
                email: credential
            }
        }   else if(validatePhone(credential)) {
            findUserDTO = {
                ...findUserDTO,
                phone: credential
            }
        } else {
            findUserDTO = {
                ...findUserDTO,
                username: credential
            }
        }

        try{
            setError(false);
            let res = await axios.post('http://localhost:8000/auth/find', findUserDTO)
            let data = await res.data;
            setUserInfo({
                email: data.email,
                phone: data.phone,
                username: data.username
            })
            setStep(2);
        } catch(e) {
            setError(true);
        }
    }

    const sendReset = async () => {
        const code = Math.floor(100000 + Math.random() * 900000);
        setResetCode(code);

        try{
            let req = await axios.post('http://localhost:8000/auth/password/code', {
             email: userInfo.email,
             code   
            });
            let res = await req.data;
            setStep(3);
        } catch(e) {
            console.log(e);
        }
    }

    const checkCode= () => {
        if(resetCode === userInputCode) {
            setStep(4);
        } else {
            setError(true);
        }
    }

    const sendPassword = async () => {
        let body = {
            username: userInfo.username,
            password: password.password
        }
        try{
            let req = await axios.put("https://localhost:8000/auth/update/password", body);
            let res = await req.data;
            toggleModal();
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        console.log(password);
        if(password.password && password.confirm) {
            setMatching(password.password === password.confirm);
        }
    }, [password.password, password.confirm])

    return(
        <Modal
            topContent={<ForgotModalTop closeModal={toggleModal}/>}
            content={determineForgotFormContent(
                step,
                setCredential,
                error,
                userInfo.email,
                userInfo.phone,
                !error,
                changeUserInputCode,
                updatePassword,
                matching
            )}
            bottomContent={determineForgotButton(
                step,
                credential,
                searchUser,
                toggleModal,
                sendReset,
                userInputCode ? true : false,
                checkCode,
                () => {setStep(3)},
                sendPassword,
                (password.password && matching ? true : false)
            )}
      />
    )
}