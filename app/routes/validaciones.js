function validarNombre(nombre,appat,apmat){
	//Aqui tendran que validar la longitud caracteres que solo sean letras y eso si no lo cumple
    //retornaran un false 
    //Iabo no hizo esta parte 
    return true;
}

function validarEmail(parametro){
    //Aqui validaran que no exista el correo, osea que no este registrado y lo mismo, longitud , caracteres especiales etc
    return true;
}

function validarPassword(parametro,pass2){
    //Lo mismo longitud, caracteres especiales (',<,>)esas cosas
    return true;
}

function validarCodigoP(parametro){
    //aqui validaran que solo sean numeros, de cierta longitud 
    return true;
}

function validarTelefono(parametro){
    //este no tiene mucha ciencia
    return true;
}

function validarLogin(emal,pass){
	//aqui validaran inyecciones sql, longitud de cadenas, ya saben 

	return true;
}

exports.validarLogin = validarLogin;
exports.validarNombre = validarNombre;
exports.validarEmail = validarEmail;
exports.validarPassword = validarPassword;
exports.validarCodigoP = validarCodigoP;
exports.validarTelefono = validarTelefono;

