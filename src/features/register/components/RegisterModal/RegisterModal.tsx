import React, {useState} from 'react'
import { Modal } from '../../../../components/Modal/Modal'


import './RegisterModal.css'
import { RegistrationStepCounter } from '../RegisterStepCounter/RegistrationStepCounter'



export const RegisterModal:React.FC = () => {

  return (
        <Modal>
            <div className='register-container'>
              <RegistrationStepCounter step={4}/>
            </div>
        </Modal>
  )
}
