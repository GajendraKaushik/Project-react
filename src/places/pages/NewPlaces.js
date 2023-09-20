import React from 'react';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE} from'../../shared/util/validators'
import {useForm} from '../../shared/hooks/form-hook'

import './PlaceForm.css'

const NewPlaces = (props) => {
    const [formState, inputHandler] = useForm( 
        {
            title:{
                value:'',
                isValid: false
            },
            description:{
                value:'',
                isValid: false
            },
            address:{
                value:'',
                isValid: false
            }
    },
    false
    
    )  

    const placeSubmitHandler = event => {
        event.preventDefault() ;
        console.log(formState.inputs); // we will sent this to backend 
    }
    
    return <form className ="place-form" onSubmit={placeSubmitHandler}>
       <Input
         id ="title"
         element ="input" 
         type="text" 
         lable="Title"  
         validators ={[VALIDATOR_REQUIRE()]} 
         errorText ="Please enter a valid title"  
         onInput = {inputHandler}
        />

       <Input
          id ="description"
          element ="textarea" 
          type="text" 
          lable="Description"  
          validators ={[VALIDATOR_MINLENGTH(5)]} 
          errorText ="Please enter a valid description( at least 5 characters ) "  
          onInput = {inputHandler}
        />
        <Input
          id ="address"
          element ="input" 
          lable="Address"  
          validators ={[VALIDATOR_REQUIRE()]} 
          errorText ="Please enter a valid address"  
          onInput = {inputHandler}
        />
        <Button type="submit" disabled = {!formState.isValid}>
            ADD PLACE
        </Button>
    </form>
}

export default NewPlaces;