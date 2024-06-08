import React from "react";
import { ModalButton } from "../../../landing/components/ModalButton/ModalButton";
import './ForgotButtonThree.css';
import { Modal } from "../../../../components/Modal/Modal";

interface ForgotButtonThreeProps {
    active: boolean;
    checkCode: ()=> void;
    back: ()=> void;
}

export const ForgotButtonThree:React.FC<ForgotButtonThreeProps> = ({active, checkCode, back}) => {
    return (
        <div className="forgot-button-three">
            {
                active ?
                    <ModalButton
                        active={true}
                        height={50}
                        fontColor={"white"}
                        backgroundColor={"black"}
                        fontSize={17}
                        fontWeight={700}
                        hoverBackground={{
                            r:0,
                            g:0,
                            b:0,
                            a:.9
                        }}
                        onClick={checkCode}
                        >
                            Next
                        </ModalButton> :
                        <ModalButton 
                            active={true}
                            height={50}
                            fontColor={"black"} 
                            borderColor={"#AAB8C2"}
                            backgroundColor={"white"}
                            fontSize={17}
                            fontWeight={600}
                            hoverBackground={{
                                r:0,
                                g:0,
                                b:0,
                                a:.05
                            }}
                            hoverBorder={{
                               r:0,
                               g:0,
                               b:0,
                               a:.3  
                            }}
                            onClick={back}>
                                Back
                            </ModalButton>                            
                             
            }
        </div>
    )
}