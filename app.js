const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
session = require('express-session');
app.use(session({
    secret: '2C44-4D44-WppQ38S',
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
const socket = require("socket.io"); 
const io = socket(server);
//websockets
var conexiones = [];
io.on("connection", (socket)=>{
    socket.on("conectado",(arreglo)=>{
        conexiones.push([socket.id,arreglo[0],arreglo[1]]);
    })

	socket.on("chat-message", (data)=>{
        for(var i = 0; conexiones.length;i++){
            if(conexiones[i][1]==data[0]&&conexiones[i][2]==data[1]){
                sd.agregar(idpac,idmed,mens);
                io.sockets.socket(conexiones[i][0]).emit("chat-message",sd.agregar(idpac,idmed,mens));
            }
        }
		io.sockets.emit("chat-message", data);
	});
});

