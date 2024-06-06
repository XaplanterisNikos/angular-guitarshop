import { FormControl, ValidationErrors } from "@angular/forms";

/**
 * A collection of custom validators for form controls used in the Luv2Shop application.
 */
export class Luv2ShopValidators {

     /**
     * Validator that checks if the input contains only whitespace.
     * @param {FormControl} control - The form control to validate.
     * @returns {ValidationErrors | null} - Returns a validation error object if the input contains only whitespace, otherwise returns null.
     */
    static notOnlyWhitespace(control:FormControl):ValidationErrors | null{
        
        if((control.value !=null) && (control.value.trim().length === 0)){
            return {'notOnlyWhitespace':true};
        }else{
            return null;
        }
        
        
    }
}
