import React, {useEffect} from 'react'
import { UseDispatch, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/Store';
import { decrementStep, cleanRegisterState } from '../../../../redux/Slices/RegisterSlice';
import { Modal } from '../../../../components/Modal/Modal'
import './RegisterModal.css'

import { RegistrationStepCounter } from '../RegisterStepCounter/RegistrationStepCounter'
import { RegisterNextButton } from '../RegisterNextButton/RegisterNextButton';
import { determineModalContent } from '../../utils/RegisterModalUtils';


export const RegisterModal:React.FC = () => {

  const state = useSelector((state:RootState) => state.register);
  const dispatch:AppDispatch = useDispatch();

  const stepButtonClicked = () => {
    dispatch(decrementStep());
  }

  useEffect(() => {
    return(() => {
      dispatch(cleanRegisterState())
    })
  }, [])


  return (
        <Modal topContent={<RegistrationStepCounter step={state.step} changeStep={stepButtonClicked} />}
        content={determineModalContent(state.step)}
        bottomContent={<RegisterNextButton step={state.step} />}
        
  )
}
