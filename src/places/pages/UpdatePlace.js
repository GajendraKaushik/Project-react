import React from "react"
import {useParams} from 'react-router-dom'

import Input from "../../shared/components/FormElements/Input"
import Button from "../../shared/components/FormElements/Button"
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators"
import { useForm } from "../../shared/hooks/form-hook"
import './PlaceForm.css'

const DUMMY_PLACES = [
    {
        id:"p1",
        title:"Hawa Mahal",
        description:"Regarded as one of the iconic symbols of the state of Rajasthan",
        imageUrl:"https://static.toiimg.com/img/101335068/Master.jpg",
        address:"Hawa Mahal Rd, Badi Choupad, J.D.A. Market, Pink City, Jaipur, Rajasthan 302002",
        location:{
            let:26.9239363,
            lng:75.8267438
        },
        creator:'u1'

    },
    {
        id:"p2",
        title:"Hawa Mahal",
        description:"Regarded as one of the iconic symbols of the state of Rajasthan",
        imageUrl:"https://static.toiimg.com/img/101335068/Master.jpg",
        address:"Hawa Mahal Rd, Badi Choupad, J.D.A. Market, Pink City, Jaipur, Rajasthan 302002",
        location:{
            let:26.9239363,
            lng:75.8267438
        },
        creator:'u2'

    }
] 

const UpdatePlace = () =>{
    const placeId = useParams().placeId 

    const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId)

    const [formState,inputHandler] = useForm(
        {
            title:{
                value:identifiedPlace.title,
                isValid:true
            },
            description:{
                value:identifiedPlace.description,
                isValid: true
            }
        },
        true 
    )

    const placeUpdateSubmitHandler = event =>{
        event.preventDefault()
        console.log(formState.inputs)
    }

    if(!identifiedPlace){
        return(
            <div className="center">
                <h2>Could not find place!</h2>
            </div>
        )
    }

    return (
        <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
            <Input 
            id="title"
            element="input"
            type="text"
            lable="Title"
            validators ={[VALIDATOR_REQUIRE()]}
            errorText ="Please enter a valid title." 
            onInput={inputHandler}
            initialValue = {formState.inputs.title.value}
            initialValid ={formState.inputs.title.isValid}        
            />
            <Input
            id="description"
            element="textarea"
            lable="Description"
            validators ={[VALIDATOR_MINLENGTH(5)]}
            errorText ="Please enter a valid description (min. 5 charactors)." 
            onInput={inputHandler}
            initialValue = {formState.inputs.description.value}
            initialValid ={formState.inputs.description.isValid}             
            />
            <Button type ="submit" disabled = {!formState.isValid}>
            UPDATE PLACE
            </Button>
        </form>
    )

}

export default UpdatePlace;

