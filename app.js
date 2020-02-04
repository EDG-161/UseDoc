const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const json = require("./app/routes/metodosJSON");
const fileUpload = require('express-fileupload');

const app = express();
session = require('express-session');
app.use(session({
    secret: '2C44-4D44-Wasdwedf8S',
    resave: true,
    saveUninitialized: true
}));
// Settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'app/views'));
// Middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());

require('./app/routes/notes')(app);
app.use(express.static(__dirname + '/app/public'));
//app.use(express.static(path.join(__dirname, 'app/public')));
app.use(function(req, res, next) {
      return res.status(404).render('404');
});

// 500 - Any server error
//app.use(function(err, req, res, next) {
//  return res.status(500).render('404');
//});
// Start server
const server = app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});

//Sockets para el chat
const io = require("socket.io")(server);
//websockets
var conexiones = [];
io.on("connection", (socket)=>{

  io.to(socket.id).emit('conectado',socket.id);
  socket.on('agregar',(ag)=>{
    conexiones.push(ag);
  });

  socket.on('obt-chat',(da)=>{
    let arch ="";
    if(da[1]==1){
      for(var i = 0; i<conexiones.length;i++){
        if(conexiones[i][1]==socket.id){
          arch = "p"+da[0]+"m"+conexiones[i][0]+"";
          var pass = `cont${arch}chat${arch}`;
          json.leerChat(arch,pass,socket.id,(chat)=>{
            io.to(socket.id).emit("chat",chat);
            for(var c = 0;c<conexiones.length;c++){
              if(conexiones[c][0]==da[0]){
                io.to(conexiones[c][1]).emit("chat",chat);
              }
            }

          });

        }
      }
    }else{
      for(var i = 0; i<conexiones.length;i++){
        if(conexiones[i][1]==socket.id){
          arch = "p"+conexiones[i][0]+"m"+da[0]+"";
          var pass = `cont${arch}chat${arch}`;
          json.leerChat(arch,pass,socket.id,(chat)=>{
            io.to(socket.id).emit("chat",chat);
            for(var c = 0;c<conexiones.length;c++){
              if(conexiones[c][0]==da[0]){
                io.to(conexiones[c][1]).emit("chat",chat);
              }
            }

          });
        }
      }
    }
  });

  socket.on('men-chat',(mensaje)=>{
    if (typeof mensaje !== "undefined") {
      if (mensaje!= null) {
        if (mensaje.length>0) {
          if (mensaje[0].length>0) {
            if (mensaje[1].length>0) {
              if (mensaje[1][0].length>0 && (mensaje[1][0]!= " "||mensaje[1][0]!= "  "||mensaje[1][0]!= "   ")) {
                if (mensaje[0][1]==1) {
                  arch = "p"+mensaje[0][0]+"m"+mensaje[1][1]+"";
                  var pass = `cont${arch}chat${arch}`;
                  for (let i = 0; i < conexiones.length; i++) {
                    if (conexiones[i][0]==mensaje[1][1]||conexiones[i][0]==mensaje[0][0]) {
                      json.leerChat(arch,pass,conexiones[i][1],(chat)=>{
                        for (var j = 0; j < chat.length; j++) {
                          if (chat[j][1]!=mensaje[1][1]&&i==chat.length-1) {
                            chat[j][2]=1;
                          }else{
                            chat[j][2]=1;
                          }
                        }
                        mensaje[1].push([mensaje[0][0],mensaje[1][1]]);
                        chat.push(mensaje[1]);
                        io.to(conexiones[i][1]).emit('message-as',chat);
                        json.guardarChat(arch,chat,pass);
                      });
                    }
                  }
                }else{
                  arch = "p"+mensaje[1][1]+"m"+mensaje[0][0]+"";
                  var pass = `cont${arch}chat${arch}`;
                  for (let i = 0; i < conexiones.length; i++) {
                    if (conexiones[i][0]==mensaje[1][1]||conexiones[i][0]==mensaje[0][0]) {
                      json.leerChat(arch,pass,conexiones[i][1],(chat)=>{
                        mensaje[1].push([mensaje[1][1],mensaje[0][0]]);
                        chat.push(mensaje[1]);
                        io.to(conexiones[i][1]).emit('message-as',chat);
                        json.guardarChat(arch,chat,pass);
                      });
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  });

	socket.on("chat-message", (data)=>{
        let arch = "p"+data.idpac+"m"+data.idmed+"c"+data.idchat+".json"
        for(var i = 0; conexiones.length;i++){
            if(conexiones[i][1]==data.idpac&&conexiones[i][2]==data.idmed){
                io.to(conexiones[i][0]).emit("chat-message",json.leerJSON(arch,data.tipuser));
            }
        }
		io.sockets.emit("chat-message", data);
	});

  socket.on('disconnect', function(data) {
        for (var i = 0; i < conexiones.length; i++) {
          if (conexiones[i][1]==socket.id) {
            conexiones.splice(i,1);
          }
        }
    });
});
