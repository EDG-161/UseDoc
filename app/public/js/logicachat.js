var socket = io("http://localhost:3000");
var socket_id = "";
socket.on('conectado',(ids)=>{
	socket.emit('agregar',[id,ids]);
});

var destino = 0;

function camabiar(id){
	destino = id;
	
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
