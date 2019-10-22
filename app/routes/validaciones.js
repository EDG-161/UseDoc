function validarNombre(name,appat,apmat){
    var nomval = /^[A-Z]+$/i;
    var cont = true;
    if(!nomval.test(name) || name.length > 20){
        cont = false;
    }else{
        if(!nomval.test(appat) || appat.length > 20){
            cont = false;
        }else{
            if(!nomval.test(apmat) || apmat.length > 20){
                cont = false;
            }
        }
    }
    return cont;
}

function validarEmail(email){
    var emailval = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(emailval.test(email) || email.length > 100){
        return true;
    }else{
        return false;
    }
    return true;
}

function validarPassword(pass,pass2){
    let cont = true;
    var passval = /^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/;
    if(pass.length > 30){
        return false;
    }else{
        if(passval.test(pass)){
            if(pass == pass1){
                cont = true;
            }else{cont = false;}
        }else{cont = false;}
        if(!cont){
            return false;
        }else{
            return true;
        }
    }
}

function validarCodigoP(num){
    var dirval = /^[$%&/<>""{}()*+=#@|ª!?¿-.:;_]+$/;
    var numeval = /^([0-9])+$/;
    if(!numeval.test(cod) || num.length > 5){
        mensaje = "Codigo Postal no valido";
        return false;
    }
    return true;
}

function validarTelefono(phone){
    var dirval = /^[$%&/<>""{}()*+=#@|ª!?¿-.:;_]+$/;
    var numeval = /^([0-9])+$/;
    if(!numeval.test(phone) || phone.length > 10 || phone.length < 8){
        mensaje = "Numero de Telefono no valido";
        return false;
    }else{
        return true;
    }
}

function validarCedula(ced, tip){
    var ced1val = /^[AE]$/i;
    var ced1val2 = /^[0-9]{5,6}$/;
    var ced2val = /^[SSA]$/i;
    var ced2val2 = /^[0-9]{4,5}$/;
    var letr = "";
    var n = "";
    if(tip == 1){
        if(ced.length > 8){
            return false;
        }else{
            if(dirval.test(ced)){
                return false;
            }else{
                if(ced.charAt(0) == "A" || ced.charAt(0) == "a"){
                    for(var t = 0; t < ced.length;t++){
                        if(t = 0){
                            letr = letr + ced.charAt(t);
                        }else if(t = 1){
                            letr = letr + ced.charAt(t);
                        }else{
                            n = n + ced.charAt(t);
                        }
                    }
                    if(ced1val.test(letr) && ced1val2.test(n)){
                        return true;
                    }else{
                        return false;
                    }
                }else if(ced.charAt(0) == "S" || ced.charAt(0) == "s"){
                    for(var g = 0; g < ced.length;g++){
                        if(g = 0){
                            letr = letr + ced.charAt(g);
                        }else if(g = 1){
                            letr = letr + ced.charAt(g);
                        }else if(g = 2){
                            letr = letr + ced.charAt(g);
                        }else{
                            n = n + ced.charAt(g);
                        }
                    }
                    if(ced2val.test(letr) && ced2val2.test(n)){
                        return true;
                    }else{
                        return false;
                    }
                }
            }
        }
    }else{
        return true;
    }
}

function validarLogin(email,pass){
	//aqui validaran inyecciones sql, longitud de cadenas, ya saben
    var emailcar = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
;
    var sql = /^(?=.*")(?=.*')/;
    if(email.length >100){
        console.log("longitud mayor");
        return false;
    }else{
        if(sql.test(email)){
            console.log("Contiene comillas");
            return false;
        }else{
            if(emailcar.test(email)){
                console.log("Valido");
                return true;
            }else{
                console.log("No es email");
                return false;
            }
        }
    }
    let cont = true;
    var passval = /^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/;
    if(pass.length > 30){
        console.log("Contraseña larga");
        return false;
    }else{
        if(!sql.test(pass)){
            if(passval.test(pass)){
                console.log("Valida");
                cont = true;
            }else{
                console.log("Contraseña no valida");
                cont = false;
            }
            if(!cont){
                return false;
            }else{
                return true;
            }
        }else{
            console.log("contiene comillas");
            return false;
        }
    }
}

exports.validarCedula = validarCedula;
exports.validarLogin = validarLogin;
exports.validarNombre = validarNombre;
exports.validarEmail = validarEmail;
exports.validarPassword = validarPassword;
exports.validarCodigoP = validarCodigoP;
exports.validarTelefono = validarTelefono;

