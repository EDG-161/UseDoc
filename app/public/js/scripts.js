

function validar(){
    var email,pass,pass1,name,appat,apmat,gender,street,num,numi,col,cod,del,state,phone,type,ced;
    email = $("input[name='email']").val();
    pass = $("input[name='pass']").val();
    pass1 = $("input[name='pass1']").val();
    name = $("input[name='name']").val();
    appat = $("input[name='appat']").val();
    apmat = $("input[name='apmat']").val();
    ced = $("input[name='ced']").val();
    //Correo
    var emailval = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if(emailval.test(email) || email.length > 100){

    }else{
         toastr.error("Email no valido","Error");
        return false;
    }
    //Contraseña
    var cont = true;
    var passval = /^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/;
    if(pass.length >= 30){
        toastr.error("Contraseña no valida","Error");
        return false;
    }else{
        if(passval.test(pass)){
            if(pass == pass1){
                cont = true;
            }else{
                toastr.error("Las contraseñas no coinciden","Error");
                return false;
            }
        }else{
            toastr.error("Contraseña no valida","Error");
            toastr.info("La contraseña debe tener una longitud de entre 8 y 30 caracteres","Info");
            toastr.info("Debe tener letras mayusculas, minusculas y numeros","Info");
            return false;
        }
        if(!cont){
            toastr.error("Contraseña no valida","Error");
            return false;
        }
    }
    //Nombre y Apellidos
    var nomval = /^[A-Za-z\s]+$/i;
    if(!nomval.test(name) || name.length >= 20){
        toastr.error("Nombre no valido","Error");
        toastr.info("Nombre debe ser menor a 21 caracteres","Info");
            return false;
    }else{
        if(!nomval.test(appat) || appat.length >= 20){
            toastr.error("Apellido Paterno no valido","Error");
            toastr.info("Apellido paterno debe ser menor a 21 caracteres","Info");
            return false;
        }else{
            if(!nomval.test(apmat) || apmat.length >= 20){
                toastr.error("Apellido materno no valido","Error");
                toastr.info("Apellido Materno debe ser menor a 21 caracteres","Info");
                return false;
            }
        }
    }
    //Direccion, telefono y Cedula
    
    
    var numeval = /^([0-9])+$/;
    var ced2val2 = /^[0-9]{4,5}$/;
    var letr = "";
    var n = "";
    if(tip == 1){
        if(ced.length > 8){
            return false;
        }else{
          if (numeval.test(ced)) {
            return true;
          }else {
              var numeval = /^([0-9])+$/;
    var ced2val2 = /^[0-9]{4,5}$/;
    var letr = "";
    var n = "";
    if(tip == 1){
        if(ced.length > 8){
            return false;
        }else{
          if (numeval.test(ced)) {
            return true;
          }else {
            toastr.error("Cedula no valida","Error");
            return false;
          }
          /*  if(ced.charAt(0) == "A" || ced.charAt(0) == "a"){
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
            }*/

        }
    }else{
        return true;
    }
            return false;
          }
          /*  if(ced.charAt(0) == "A" || ced.charAt(0) == "a"){
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
            }*/

        }
    }else{
        return true;
    }
}


$('#reg-form').submit(function(e){
    var vad = validar();
    console.log(vad);
    
    if(!vad){
        e.preventDefault();
    }
});