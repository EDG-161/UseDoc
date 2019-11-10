const socket = io();
const dbConnection = require('../../config/dbconnection');
const connection = dbConnection();
const json = require("../../routes/metodosJSON");
function guardar(req,res){
	let msg = document.getElementById("input").value;
	let tipo = req.session.user.id_tid;
	let id1,id2,idc;
	if(tipo == 1){
		id2 = req.session.user.id_usr;
		connection.query("SELECT id_pm WHERE id_med = "+id2+" AND id_pac="+id1+"", (err,result)=>{
			if(!err){
				idc = result;
			}else{
				console.log("Error: "+err);
			}
		});
		json.escribirJSON(id1,id2,idc,tipo,msg);
	}else{
		id1 = req.session.user.id_user;
		connection.query("SELECT id_pm WHERE id_med = "+id2+" AND id_pac="+id1+"", (err,result)=>{
			if(!err){
				idc = result;
			}else{
				console.log("Error: "+err);
			}
		});
		json.escribirJSON(id1,id2,idc,tipo,msg);
	}

}
function enviarmsg(pac,med,chat,tip,msg){
	socket.emit("chat-message", {
		//req.session.user.id_user
		idpac: pac,
		idmed: med,
		idchat: chat,
		tipuser: tip,
		mensaje: msg,
		id: socket.id
	});
}
socket.on("chat-message", function(data){
	data.usuario = data.usuario.replace('</', '');
	data.usuario = data.usuario.replace('>', '');
	data.usuario = data.usuario.replace('<', '');
	var sanitized = data.mensaje.replace('</', '');
	sanitized = sanitized.replace('>', '');
	sanitized = sanitized.replace('<', '');
	if (data.id == socket.id) {
		var msj = '<div class="local-message" disabled><strong>'+data.usuario+':</strong><p>'+sanitized+'</p><br><img src="images/save.png" class="imgmsg" style="align: right;" onclick="guardar()"></div>';
		document.getElementById("msgs").innerHTML += msj;
	} else {
		var msj = '<div class="remote-message" disabled><strong>'+data.usuario+':</strong><p>'+sanitized+'</p></div>';
		document.getElementById("msgs").innerHTML += msj;
	}
});