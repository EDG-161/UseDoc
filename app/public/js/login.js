function validaLogin(email,pass){
    var emailcar = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    let cont = true;
    var sql = /^(?=.*")(?=.*')/;
    if(email.length >100){
        toastr.error("Email muy largo","Error");
        return false;
    }else{
        if(sql.test(email)){
            toastr.error("Email no valido","Error");
            return false;
        }else{
            if(emailcar.test(email)){
                cont = true;
            }else{
                toastr.error("Email no valido","Error");
                return false;
            }
        }
    }

    var passval = /^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/;
    if(pass.length > 30){
        toastr.error("Contraseña no valida","Error");
        return false;
    }else{
        if(!sql.test(pass)){
            if(passval.test(pass)){
                cont = true;
            }else{
                toastr.error("Contraseña no valida","Error");
                cont = false;
            }
            if(!cont){
                return false;
            }else{
                return true;
            }
        }else{
            toastr.error("Contraseña no valida","Error");
            return false;
        }
    }
}

$('#login-f').submit(function (e){
    var email = $('#email').val();
    var pass = $('#pass').val();
    var vad = validaLogin(email,pass);
    if(!vad){
        e.preventDefault();
    }
});