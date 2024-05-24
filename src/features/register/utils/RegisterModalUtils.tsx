import { RegisterFormOne } from "../components/RegisterFormOne/RegisterFormOne"
import { RegisterFormTwo } from "../components/RegisterFormTwo/RegisterFormTwo"
import { RegisterFormThree } from "../components/RegisterFormThree/RegisterFormThree"
import { RegisterFormFour } from "../components/RegisterFormFour/RegisterFormFour"

export const determineModalContent = (step: number): JSX.Element => {
    switch(step) {
        case 1: 
            return <RegisterFormOne/>
        case 2:
            return <RegisterFormTwo/>
        case 3:
            return <RegisterFormThree/>
        case 4:
            return <RegisterFormFour/>
        case 5:
            return <span>Registration Step 5</span>
        case 6:
            return <span>Registration Step 6</span>
        default:
            return <></>
    }
}