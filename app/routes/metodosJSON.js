var fs = require("fs");
const dbConnection = require('../../config/dbconnection');
const connection = dbConnection();
const aes = require("./aes");
var path = require("path");
function crearJSON(idpac,idmed,idchat){
    let arch = "p"+idpac+"m"+idmed+"c"+idchat+".json";
    var obj = {
        table: []
    };
    obj.table.push({id_pac:aes.cifrar(idpac),id_med:aes.cifrar(idmed),id_ch:aes.cifrar(idchat)});
    var json = JSON.stringify(obj);
    fs.writeFile(arch,json,"utf-8",callback);
}
function escribirJSON(idpac,idmed,idchat,tipusr, msg){
    let arch = "p"+idpac+"m"+idmed+"c"+idchat+".json";
    if(!path.exists(arch)){
        crearJSON(idpac,idmed,idchat);
    }else{
        var obj = {
        table:[]
        };
        obj.table.push({tip_user:aes.cifrar(tipusr),msg:aes.cifrar(msg)});
        fs.writeFile(arch,json,"utf-8");
    }

}

function guardarHistorial(name, content,pass){
    var contenido = aes.cifrarP(content,pass)
    fs.writeFile('db/data/'+name,contenido,"utf-8",function(re){
    });

    return name;
  }

  function leerHistorial(name, pass,callback){
    if(fs.existsSync('db/data/'+name)){
      fs.readFile('db/data/'+name, 'utf-8', function (err, fileContents) {
        if (err) throw err;
        callback(JSON.parse(aes.decifrarP(fileContents,pass)));
      });
    }else {
        var historia = {
              enfermedadesParentales:[],
              vivienda: [],
              alergias :[],
              cirugias:[],
              id:0
          }
        callback(historia)
    }
  }

  function guardarCitas(name, content,pass){
    var contenido = aes.cifrarP(content,pass)
    fs.writeFile('db/citas/'+name,contenido,"utf-8",function(re){
      console.log(re);
    });

    return name;
  }

  function leerCitas(name, pass,callback){
    if(fs.existsSync('db/citas/'+name)){
      fs.readFile('db/citas/'+name, 'utf-8', function (err, fileContents) {
        if (err) throw err;
        callback(JSON.parse(aes.decifrarP(fileContents,pass)));
      });
    }else {
      var cita = {
        id_cit: 0,
        laboratorio : [false,[]],
        diagnostico: [],
        tratamiento:[],
        sintomas:[],
        medicamentos:[],
        notas:[]
      }
        callback(cita)
    }
  }

function guardarChat(name, content , pass){
  var contenido = aes.cifrarP(JSON.stringify(content),pass)
  fs.writeFile('db/chats/'+name,contenido,"utf-8",function(re){
    console.log(re);
  });
  return name;
}

function leerChat(name, pass ,dir, callback){
  if(fs.existsSync('db/chats/'+name)){
    fs.readFile('db/chats/'+name, 'utf-8', function (err, fileContents) {
      if (err) throw err;
      if (aes.decifrarP(fileContents,pass).length>0) {
          callback(JSON.parse(aes.decifrarP(fileContents,pass)));
      }else{
        callback([])
      }

    });
  }else {
      var chat = [];
      callback(chat)
  }
}

function guardarDatosMedicos(name, content,pass){
  var contenido = aes.cifrarP(content,pass)
  fs.writeFile('db/data/'+name,contenido,"utf-8",function(re){
    console.log(re);
  });

  return name;
}

function leerDatosMedicos(name, pass,callback){
  if(fs.existsSync('db/data/'+name)){
    fs.readFile('db/data/'+name, 'utf-8', function (err, fileContents) {
      if (err) throw err;
      callback(JSON.parse(aes.decifrarP(fileContents,pass)));
    });
  }else {
      var datos = {
    		enfermedadesParentales:[],
    		vivienda: [],
    		alergias :[],
    		cirugias:[],
    		id:0
    	}
      callback(historia)
  }
}

function leerJSON(req,res){
    let cadena = aes.decifrar(req.params.value);
    /*let idp, idm, idc;
    for(var i = 0; i < cadena.length; i++){
        if(cadena.charAt(i) = "p"){
            for(var o = i; cadena.charAt(i)= "m";o++){
                idp+=cadena.charAt(o);
            }
            idp = idp.replace("p","");
        }else if(cadena.charAt(i) = "m"){
            for(var p = i; cadena.charAt(i)= "c";p++){
                idm+=cadena.charAt(p);
            }
            idm = idm.replace("m","");
        }else if(cadena.charAt(i) = "c"){
            for(var q = i; i <cadena.length;q++){
                idc+=cadena.charAt(q);
            }
            idc = idc.replace("c","");
        }else{}
    }*/
    let datos = fs.readFileSync(cadena,"utf-8");
    let data = JSON.parse(datos);
    if (data.id == socket.id) {
		var msj = '<div class="local-message" disabled><strong>'+data.usuario+':</strong><p>'+sanitized+'</p><br><img src="images/save.png" class="imgmsg" style="align: right;" onclick="guardar()"></div>';
		document.getElementById("msgs").innerHTML += msj;
	} else {
		var msj = '<div class="remote-message" disabled><strong>'+data.usuario+':</strong><p>'+sanitized+'</p></div>';
		document.getElementById("msgs").innerHTML += msj;
	}

}
function verify(req,res){
    let tipo = req.session.user.id_tid;
	let id1,id2,idc;
	if(tipo == 1){
		id2 = req.session.user.id_usr;
		connection.query("SELECT id_pm FROM mpaciente_medico WHERE id_med = "+id2+" AND id_pac="+id1+"", (err,result)=>{
			if(!err){
				idc = result;
			}else{
				console.log("Error: "+err);
			}
        });
        let value;
        let arch = "p"+id1+"m"+id2+"c"+idc+".json";
        if(!path.exists(arch)){
            crearJSON(id1,id2,idc);
            value = aes.cifrar(arch);
            res.redirect("/chat"+value);
        }else{
            value = aes.cifrar(arch);
            res.redirect("/chat/"+value);
        }
	}else{
		id1 = req.session.user.id_usr;
		connection.query("SELECT id_pm FROM mpaciente_medico WHERE id_med = "+id2+" AND id_pac="+id1+"", (err,result)=>{
			if(!err){
				idc = result;
			}else{
				console.log("Error: "+err);
			}
        });
        let value;
        let arch = "p"+id1+"m"+id2+"c"+idc+".json";
        if(!path.exists(arch)){
            crearJSON(id1,id2,idc);
            value = aes.cifrar(arch);
            res.redirect("/chat"+value);
        }else{
            value = aes.cifrar(arch);
            res.redirect("/chat/"+value);
        }
	}

}

exports.guardarHistorial = guardarHistorial;
exports.crearJSON = crearJSON;
exports.guardarCitas = guardarCitas;
exports.leerCitas = leerCitas;
exports.escribirJSON = escribirJSON;
exports.verificarJSON = verify;
exports.leerJSON = leerJSON;
exports.leerHistorial = leerHistorial;
exports.leerChat = leerChat;
exports.guardarChat = guardarChat;
