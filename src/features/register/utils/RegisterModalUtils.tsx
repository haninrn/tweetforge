import { RegisterFormOne } from "../components/RegisterFormOne/RegisterFormOne"
import { RegisterFormTwo } from "../components/RegisterFormTwo/RegisterFormTwo"
import { RegisterFormThree } from "../components/RegisterFormThree/RegisterFormThree"
import { RegisterFormFour } from "../components/RegisterFormFour/RegisterFormFour"
import { RegisterFormFive } from "../components/RegisterFormFive/RegisterFormFive"
import { RegisterFormSix } from "../components/RegisterFormSix/RegisterFormSix"
import data from '../../../data/codes.json';

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
            return <RegisterFormFive/>
        case 6:
            return <RegisterFormSix/>
        default:
            return <></>
    }
}

export const countryCodeDropDown = ():JSX.Element[] =>{
    let options = data.filter((country) => {
        if(country.code !== "Malaysia"){
            return country;
        }
    }).map((country) =>{
        return<option value={`${country.dial_code} ${country.name}`}
            key={country.code}>
                {`${country.dial_code} ${country.name}`}
            </option>
    })

    options.unshift(
        <option value={"+60 Malaysia"} key={"Malaysia"}>{"+60 Malaysia"}</option>
    )

    return options;
}