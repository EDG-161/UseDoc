var socket = io("http://localhost:3000");
var socket_id = "";
socket.on('conectado',(ids)=>{
	socket.emit('agregar',[id,ids]);
});
//chat [mensaje,estado,id]
socket.on("chat",(chat)=>{
	console.log(chat);
	
	for(var i =0;i<chat.length;i++){
		if(chat[i][2]==id){
			var str = `<div class="req-chat"><span>${chat[i][0]}</span></div>`;
			$('#bod-chat').append(str);
		}else{
			var str = `<div class="res-chat"><span>${chat[i][0]}</span></div>`;
			$('#bod-chat').append(str);
		}
	}
});

var destino = 0;

function cambiar(name,img,idd){
	destino = idd;
	$('#cav-chat').find('strong').each(function(){
		$(this).text(name);
	});
	$('#cav-chat').find('img').each(function(){
		$(this).attr("src","images/"+img);	
	});
	
	socket.emit('obt-chat',[destino,tid]);

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
