

function validar(){
    var email,pass,pass1,name,appat,apmat,gender,street,num,numi,col,cod,del,state,phone,type,ced;
    email = document.getElementsByName("email");
    pass = document.getElementsByName("pass");
    pass1 = document.getElementsByName("pass1");
    name = document.getElementsByName("name");
    appat = document.getElementsByName("appat");
    apmat = document.getElementsByName("apmat");
    gender = document.getElementsByName("sex");
    street = document.getElementsByName("calle");
    num = document.getElementsByName("nume");
    numi = document.getElementsByName("numi");
    col = document.getElementsByName("col");
    cod = document.getElementsByName("cod");
    del = document.getElementsByName("mun");
    state = document.getElementsByName("est");
    phone = document.getElementsByName("tel");
    type = document.getElementsByName("tip");
    ced = document.getElementsByName("ced");
    //Correo
    var emailval = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/;
    if(emailval.test(email) || email.length > 100){

    }else{
        mensaje = "Direccion de Correo no valida";
        return false;
    }
    //Contraseña
    var cont = true;
    var passval = /^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/;
    if(pass.length > 30){
        mensaje = "Contraseña no valida";
    }else{
        for(var i = 0; i <pass.length;i++){
            if(pass.charAt(i) == " "){
                cont = false;
                break;
            }else{}
        }
        if(passval.test(pass)){
            if(pass == pass1){
                cont = true;
            }else{cont = false;}
        }else{cont = false;}
        if(!cont){
            mensaje = "Contraseña no valida";
            return false;
        }
    }
    //Nombre y Apellidos
    var nomval = /^[A-Z]+$/i;
    if(!nomval.test(name) || name.length > 20){
        mensaje = "Nombre no valido";
        return false;
    }else{
        if(!nomval.test(appat) || appat.length > 20){
            mensaje = "Apellido Paterno no valido";
            return false;
        }else{
            if(!nomval.test(apmat) || apmat.length > 20){
                mensaje = "Apellido Materno no valido";
                return false;
            }
        }
    }
    //Direccion, telefono y Cedula
    var dirval = /^[$%&/<>""{}()*+=#@|ª!?¿-.:;_]+$/;
    var numeval = /^([0-9])+$/;
    //Direccion
    if(dirval.test(street) || street.length > 150){
        mensaje = "Calle no valida";
        return false;
    }
    if(!numeval.test(num) || num.length > 10){
        mensaje = "Numero Exterior no valido";
        return false;
    }
    if(!numeval.test(numi) || numi.length > 20){
        mensaje = "Numero Interior no valido";
        return false;
    }
    if(dirval.test(col) || col.length > 150){
        mensaje = "Colonia no valida";
        return false;
    }
    if(!numeval.test(cod) || num.length > 5){
        mensaje = "Codigo Postal no valido";
        return false;
    }
    if(dirval.test(del) || del.length > 100){
        mensaje = "Delegacion o Municipio no valido";
        return false;
    }
    if(dirval.test(state) || state.length > 100){
        mensaje = "Estado no valido";
        return false;
    }
    //Telefono
    if(!numeval.test(phone) || phone.length > 10 || phone.length < 8){
        mensaje = "Numero de Telefono no valido";
        return false;
    }
    //Cedula
    var ced1val = /^[AE]$/i;
    var ced1val2 = /^[0-9]{5,6}$/;
    var ced2val = /^[SSA]$/i;
    var ced2val2 = /^[0-9]{4,5}$/;
    var letr = "";
    var n = "";
    if(ced.length > 8){
        mensaje = "Cedula no valida";
        return false;
    }else{
        if(dirval.test(ced)){
            mensaje = "Cedula no valida";
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

                }else{
                    mensaje = "Cedula no valida";
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

                }else{
                    mensaje = "Cedula no valida";
                    return false;
                }
            }
        }
    }
}
