import React, {useState} from "react";
import { UseSelector, useSelector } from "react-redux";
import { RootState } from "../../../redux/Store";

import { ValidatedTextInput } from "../../../components/ValidatedInput/ValidatedTextInput";
import { DisabledValidatedInput } from "../../../components/ValidatedInput/DisabledValidatedInput";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlined from '@mui/icons-material/VisibilityOffOutlined';

import './LoginForms.css';

interface LoginFormTwoProps {
    setPassword: (e:React.ChangeEvent<HTMLInputElement>) => void;
}

export const LoginFormTwo:React.FC<LoginFormTwoProps> = ({setPassword}) => {
    const state = useSelector((state:RootState) => state.user);

    const [active, setActive] = useState<boolean>(false);

    const toggleView = () => {
        setActive(!active);
    }

    return( 
    <div className="login-form-two-container">
        <div className="login-form-content">
        <h1 className="login-form-header">Enter your password</h1>
            <DisabledValidatedInput
                label={"Username"}
                value={state.username}
                />
                <div className="login-form-two-password">
                    <ValidatedTextInput
                            valid={!state.error}
                            label={"Password"}
                            name={"password"}
                            changeValue={setPassword}
                            attributes={{
                            minLength:8,
                            type: active ? "text" : "password"
                        }}
                        />
                        <div onClick={toggleView} className="login-form-two-password-icon">
                            {active ? <VisibilityOffOutlined sx={{
                                fontSize: "24px"
                            }}/> :
                                <VisibilityOutlinedIcon sx = {{
                                    fontSize: "24px"
                                }}/>
                            }
                        </div>
                        {state.error ? <p className="login-form-error color-red">Password is incorrect</p> : <></>}
                        <p className="login-form-two-forgot color-blue">Forgot password?</p>
                </div>   
        </div>     
    </div>
    );
}