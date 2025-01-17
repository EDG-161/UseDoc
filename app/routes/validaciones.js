const dbConnection = require('../../config/dbconnection');
const connection = dbConnection();

var normalize = (function() {
  var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
      to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
      mapping = {};

  for(var i = 0, j = from.length; i < j; i++ )
      mapping[ from.charAt( i ) ] = to.charAt( i );

  return function( str ) {
      var ret = [];
      for( var i = 0, j = str.length; i < j; i++ ) {
          var c = str.charAt( i );
          if( mapping.hasOwnProperty( str.charAt( i ) ) )
              ret.push( mapping[ c ] );
          else
              ret.push( c );
      }
      return ret.join( '' );
  }

})();

function validarAspectos(cadena){
    var nomval = /^[a-zA-Z0-9/s]/i;
  //()  var nomval = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/i;
    return nomval.test(cadena);

}

function validarFechas(cadena){
    var vadFech = /^(?:(?:(?:0?[1-9]|1\d|2[0-8])[-](?:0?[1-9]|1[0-2])|(?:29|30)[-](?:0?[13-9]|1[0-2])|31[-](?:0?[13578]|1[02]))[-](?:0{2,3}[1-9]|0{1,2}[1-9]\d|0?[1-9]\d{2}|[1-9]\d{3})|29[-]0?2[-](?:\d{1,2}(?:0[48]|[2468][048]|[13579][26])|(?:0?[48]|[13579][26]|[2468][048])00))$/;
    return vadFech.test(cadena);
}

function validarHoras(cadena){
    var hv = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    return hv.test(cadena);
}

function validarNumeros(cadena){
    var numeval = /^([0-9])+$/;
    return numeval.test(cadena);
}

function validarNombre1(name) {
  var nomval = /^[A-Za-z\s]+$/i;
  return nomval.test(name);
}

function validarNombre(name, appat, apmat) {
    var nomval = /^[A-Za-z\s]+$/i;
    var cont = true;
    if (!nomval.test(name) || name.length > 20) {
        console.log('name');
        cont = false;
    } else {
        if (!nomval.test(appat) || appat.length > 20) {
            console.log('name app');
            cont = false;
        } else {
            if (!nomval.test(apmat) || apmat.length > 20) {
                console.log('name apm');
                cont = false;
            }
        }
    }
    return cont;
}

function validarEmail(email) {
    var emailval = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (emailval.test(email) || email.length > 100) {
        console.log('email');
        return true;
    } else {
        console.log('email');
        return false;
    }
}

function validarPassword(pass, pass2) {
    let cont = true;
    var passval = /^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/;
    if (pass.length > 30) {
        console.log('contraseñas larga');
        return false;
    } else {
        if (passval.test(pass)) {
            if (pass == pass2) {
                console.log('contraseñas valido');
                cont = true;
            } else {
                console.log('contraseñas distintas');
                cont = false;
            }
        } else {
            console.log('contraseña no valida');
            cont = false;
        }

        if (!cont) {
            return false;
        } else {
            return true;
        }
    }
}

function validarCodigoP(cod) {
    var numeval = /^([0-9])+$/;
    if (!numeval.test(cod) || cod.length > 5) {
        console.log('codigo');
        return false;
    } else {
        console.log('codigo');
        return true;
    }
}

function validarTelefono(phone) {
    var numeval = /^([0-9])+$/;
    if (!numeval.test(phone) || phone.length > 10 || phone.length < 8) {
        console.log('telefono');
        return false;
    } else {
        console.log('telefono');
        return true;
    }
}

function validarCedula(ced, tip) {
    var ced1val = /^[AE]$/i;
    var ced1val2 = /^[0-9]{5,6}$/;
    var ced2val = /^[SSA]$/i;
    var numeval = /^([0-9])+$/;
    var ced2val2 = /^[0-9]{4,5}$/;
    var letr = "";
    var n = "";
    if (tip == 1) {
        if (ced.length > 8) {
            return false;
        } else {
            if (numeval.test(ced)) {
                return true;
            } else {
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
    } else {
        return true;
    }
}

function validarLogin(email, pass) {
    //aqui validaran inyecciones sql, longitud de cadenas, ya saben
    var emailcar = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    let cont = true;
    var sql = /^(?=.*")(?=.*')/;
    if (email.length > 100) {
        console.log("longitud mayor");
        cont = false;
    } else {
        if (sql.test(email)) {
            console.log("Contiene comillas");
            cont = false;
        } else {
            if (emailcar.test(email)) {
                console.log("Valido");
                cont = true;
            } else {
                console.log("No es email");
                cont = false;
            }
        }
    }

    var passval = /^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/;
    if (pass.length > 30) {
        console.log("Contraseña larga");
        return false;
    } else {
        if (!sql.test(pass)) {
            if (passval.test(pass)) {
                console.log("Valida");
                cont = true;
            } else {
                console.log("Contraseña no valida");
                cont = false;
            }
            if (!cont) {
                return false;
            } else {
                return true;
            }
        } else {
            console.log("contiene comillas");
            return false;
        }
    }
}

exports.validarNombre1 = validarNombre1;
exports.normalize = normalize;
exports.validarCedula = validarCedula;
exports.validarLogin = validarLogin;
exports.validarNombre = validarNombre;
exports.validarEmail = validarEmail;
exports.validarPassword = validarPassword;
exports.validarCodigoP = validarCodigoP;
exports.validarTelefono = validarTelefono;
exports.validarAspectos = validarAspectos;
exports.validarFechas = validarFechas;
exports.validarHoras = validarHoras;
exports.validarNumeros = validarNumeros;
