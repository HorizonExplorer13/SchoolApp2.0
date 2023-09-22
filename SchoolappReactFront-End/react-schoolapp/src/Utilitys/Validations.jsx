
// Here we set the function to validate the composition of each imput(that we decided to validate).
// the next two validations are related with the student Name and Surname, and validated that both imputs start with a mayus letter.
export function ValidationNames(value){
    if (!value || !/^[A-Z].*/.test(value)) {
        return "Ingresa un nombre válido (este campo debe iniciar con mayúscula).";
}
return null;
}

export function ValidationSurnames(value){
    if (!value || !/^[A-Z].*/.test(value)) {
        return "Ingresa un apellido válido (este campo debe iniciar con mayúscula).";
}
return null;
}

// here we validate the extension in the student document(Doc).
export function ValidatateDoc(value){
    if(!value || value.length != 10){
        return "Este numero de documento no es valido(debe estar comformado por 10 digitos)."
    }
    return null;
}
// here we validate the extension in the student phone number.
export function ValidatePhoneN(value){
if(!value || value.length < 3 || value.length > 10){
    return "Este numero de contacto es invalido(debe contener un minimo de 3 y un maximo de 10 digitos)."
}
return null;
}