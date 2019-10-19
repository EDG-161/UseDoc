const dbConnection = require('../../config/dbconnection');
const valida = require('notes');
const connection = dbConnection();

function login(req,res){
    try{
        var nombre = req.body;
        var appat = req.body;
        var apmat = req.body;

    }catch(error){
        res.render('404');
    }
}

function agregarUsuario(req,res){

}

function obtenerUsuario(req,res,id){

}



function obtener(req, res){
	
	connection.query('SELECT * FROM Paciente', (err, result) => {
        console.log(result);
        res.render('index', { result });
    });
}

function agregar(req,res){
	const connection = dbConnection();
	const { nombre } = req.body;
    const { appat } = req.body;
    const { apmat } = req.body;
    const { tel } = req.body;
    const { enf_pac } = req.body;
     if (nombre.length == 0 || nombre.length < 3 || nombre.length > 28 || appat.length > 28 || apmat.length > 28 || tel.length != 10 || enf_pac.length > 58) { 
        res.redirect('/');
    }else{
        connection.query('INSERT INTO Paciente (nombre, appat, apmat, tel, enf_pac) VALUES ("'+nombre+'", "'+appat+'", "'+apmat+'", "'+tel+'", "'+enf_pac+'")',  (err, result) => {
            res.redirect('/');
        });  
    }
}

function eliminar(req,res){
	const connection = dbConnection();
	const { id_pac } = req.body;
    connection.query('DELETE FROM Paciente WHERE ?', { id_pac: id_pac }, (err, result) => {
        res.redirect('/');
    });
}

function editar(req,res,id_pac){
	const connection = dbConnection();
    const { nombre } = req.body;
    const { appat } = req.body;
    const { apmat } = req.body;
    const { tel } = req.body;
    const { enf_pac } = req.body;
    if (nombre.length == 0 || nombre.length < 3 || nombre.length > 28 || appat.length > 28 || apmat.length > 28 || tel.length != 10 || enf_pac.length > 58) { 
        res.redirect('/');
    }else{
        connection.query('UPDATE Paciente SET nombre = "'+nombre+'" ,  appat = "'+appat+'",  apmat = "'+apmat+'",  tel = "'+tel+'" , enf_pac = "'+enf_pac+'" WHERE id_pac = '+id_pac+'', (err, result) => {
            res.redirect('/');
        });
    }	
}

exports.agregar = agregar;
exports.obtener =  obtener;
exports.editar =  editar;
exports.eliminar = eliminar;