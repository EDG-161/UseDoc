var socket = io("http://localhost:3000");
var socket_id = "";
socket.on('conectado',(ids)=>{
	socket.emit('agregar',[id,ids]);
});
var destino = 0;
//chat [mensaje,id,estado]
socket.on("chat",(chat)=>{
$('#bod-chat').html("");
let pertenece = false;
if (tid==1&& chat.length>0) {
	if (chat[chat.length-1][3][0]==destino) {
		pertenece = true;
	}
}else if(chat.length>0){
	if (chat[chat.length-1][3][1]==destino) {
		pertenece = true;
	}
}
if (pertenece) {
		for(var i =0;i<chat.length;i++){
			if(chat[i][1]==id){
				$('#bod-chat').append('<div class="req-chat"><span></span></div>');
				$('#bod-chat').find('.req-chat:last-child').each(function(){
					$(this).find('span').text(chat[i][0])
				});
			}else{
				$('#bod-chat').append('<div class="res-chat"><span></span></div>');
				$('#bod-chat').find('.res-chat:last-child').each(function(){
					$(this).find('span').text(chat[i][0])
				});
			}
		}
		$('#bod-chat').animate({
			scrollTop:$('#bod-chat')[0].scrollHeight
		},500);
	}else{

	}
});



$('#btn-send').click(function(){
	var mensaje = $('#text-chat').val();
	$('#text-chat').val("");
	socket.emit('men-chat',[[destino,tid],[mensaje,id,0]]);
});

$('#text-chat').keypress(function(e){
	if (e.which==13) {
		$('#btn-send').click();
	}
});

socket.on('message-as',function(chat){
	$('#bod-chat').html("");
	var pertenece = false;
	if (tid==1) {
		if (chat[chat.length-1][3][0]==destino) {
			pertenece = true;
		}
	}else{
		if (chat[chat.length-1][3][1]==destino) {
			pertenece = true;
		}
	}
	if (pertenece) {
		for(var i =0;i<chat.length;i++){
			if(chat[i][1]==id){
				$('#bod-chat').append('<div class="req-chat"><span></span></div>');
				$('#bod-chat').find('.req-chat:last-child').each(function(){
					$(this).find('span').text(chat[i][0])
				});
			}else{
				$('#bod-chat').append('<div class="res-chat"><span></span></div>');
				$('#bod-chat').find('.res-chat:last-child').each(function(){
					$(this).find('span').text(chat[i][0])
				});
			}
		}
		$('#bod-chat').animate({
			scrollTop:$('#bod-chat')[0].scrollHeight
		},500);
	}

});

function cambiar(name,img,idd){
	destino = idd;
	$('#cav-chat').find('strong').each(function(){
		$(this).text(name);
	});
	$('#cav-chat').find('img').each(function(){
		$(this).attr("src","images/"+img);
	});
	document.getElementById('sen-chat').style.display = "flex";
	socket.emit('obt-chat',[destino,tid]);

}
