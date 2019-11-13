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
app.use(bodyParser.urlencoded({extended:false}));
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
    console.log(conexiones);
  });

  socket.on('obt-chat',(da)=>{
    console.log(socket.id + da)
    console.log(conexiones)
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
        console.log(conexiones);
    });
});
