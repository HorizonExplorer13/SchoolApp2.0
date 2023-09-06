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


export function ValidatateDoc(value){
    if(!value || value.length != 10){
        return "Este numero de documento no es valido(debe estar comformado por 10 digitos)."
    }
    return null;
}

export function ValidatePhoneN(value){
if(!value || value.length < 3 || value.length > 10){
    return "Este numero de contacto es invalido(debe contener un minimo de 3 y un maximo de 10 digitos)."
}
return null;
}