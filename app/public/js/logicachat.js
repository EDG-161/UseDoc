const socket = io();
function enviarmsg(){
	socket.emit("chat-message", {
		mensaje: document.getElementById("input").value,
		id: socket.id
	});
}
socket.on("chat-message", function(data){
	data.usuario = "Prueba Chat";
	//data.usuario = data.usuario.replace('</', '');
	var sanitized = data.mensaje.replace('</', '');
	sanitized = sanitized.replace('>', '');
	sanitized = sanitized.replace('<', '');
	if (data.id == socket.id) {
		var msj = '<div class="local-message"><strong>'+data.usuario+':</strong><p>'+sanitized+'</p></div>';
		document.getElementById("msgs").innerHTML += msj;
	} else {
		var msj = '<div class="remote-message"><strong>'+data.usuario+':</strong><p>'+sanitized+'</p></div>';
		document.getElementById("msgs").innerHTML += msj;
	}
});