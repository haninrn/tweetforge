import React from 'react';
import { Checkbox } from '../../../../components/Checkbox/Checkbox';
import { DropDown } from '../../../../components/DropDown/DropDown';
import { ValidatedTextInput } from '../../../../components/ValidatedInput/ValidatedTextInput';

export const RegisterFormFour:React.FC = () => {
    return(
        <div className='reg-step-four-container'>
            <div className='reg-step-four-content'>
                <h1>Add a phone number</h1>
                <p>Enter the phone number you would like to associate with your TweetForge account. You won't get a verification code 
                    sent here.</p>
                    <div className='reg-step-four-inputs'>
                        <DropDown
                            content= {() => {return []}}
                            change = {() => console.log("changing")}
                            label = {"Country Code"}
                            defaultValue={"United States +1"}
                        />
                        <ValidatedTextInput
                            valid={true}
                            name={"phoneNumber"}
                            label= {"Your Phone Number"}
                            changeValue={()=>console.log("Phone number")}
                        />
                    </div>
                    <div className='reg-step-four-check-group'>""
                    <p>Let people who have your phone number find and connect with you on TweetForge. <span 
                    className='reg-step-four-link'>Learn More</span>.</p>
                    <Checkbox />
                    </div>
                    <div className='reg-step-four-check-group'>
                        <p>Let TweetForge use your phone number to personalize our services, including ads (if permitted
                        by your ads preferences). If you don't enable this, TweetForge will still use your phone number
                        for purposes including account security, spam, fraud, and abuse prevention. <span 
                        className='reg-step-four-link'>See our Privacy Policy for more information.</span></p>
                        <Checkbox />
                    </div>
            </div>
        </div>
    )
}