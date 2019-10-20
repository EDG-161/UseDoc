const dbConnection = require('../../config/dbconnection');
const valida = require('./validaciones');
const connection = dbConnection();

function login(req,res){
    try{
        var email =  req.body;
        var pass = req.body;
        var pass1= req.body;
        var freg = new Date();
        
        var name = req.body;
        var appat = req.body;
        var apmat = req.body;
        var sex = req.body;
        var calle = req.body;
        var nume = req.body;
        var numi = req.body;
        var col = req.body;
        var cod = req.body;
        var mun = req.body;
        var est = req.body;
        var tel = req.body;
        var tip = req.body;
        var ced;
        if(tip == 1){
            ced = req.body;
        }
        if(valida.validarNombre(nombre,appat,apmat)){
            console.log(email+"\n" +pass+"\n" +pass1+"\n" +freg+"\n" +nombre+"\n" +appat+"\n" +apmat+"\n" +genero+"\n" +calle+"\n" +nume+"\n" +numi+"\n" +col+"\n" +cod+"\n" +del+"\n" +est+"\n" +tel+"\n" +tip);
        }

    }catch(error){
        console.log("-------------------------------------"+error);
        res.render('Registro');
    }
}

function vadUsuario(email,pass,callback){
    const connection = dbConnection();
    var re = 0;
    connection.query("SELECT * FROM musuarios WHERE email_usr = '"+email+"' && pass_usr = '" + pass+"'", (err, result) => {
        if (!err){
            callback(null,result[0].id_usr);
        }
    });
    return re;
}

function agregarUsuario(req,res){
    try{
        const {email } =  req.body;
        const { pass } = req.body;
        const { pass1 }= req.body;
        var freg = new Date();
        var freg1 = freg.getDay()+"/"+freg.getMonth()+"/"+freg.getFullYear();
        var estados;
        const { name } = req.body;
        const { appat } = req.body;
        const { apmat } = req.body;
        const { sex } = req.body;
        const { calle } = req.body;
        const { nume } = req.body;
        const { numi } = req.body;
        const { col } = req.body;
        const { cod } = req.body;
        const { mun } = req.body;
        const { est } = req.body;
        const { tel } = req.body;
        const { tip } = req.body;
        const { ced } = req.body;
            
        if(valida.validarNombre(name,appat,apmat)&&valida.validarEmail(email)&&valida.validarPassword(pass,pass1)&&valida.validarCodigoP(cod)&&valida.validarTelefono(tel)){
            connection.query('INSERT INTO musuarios (email_usr, pass_usr, reg_usr) values("'+email+'","'+pass+'","'+freg1+'")',(err,result)=>{
                if (err){
                    console.log(err);
                    registrado = false;
                }else{
                    registrado = true;
                }
            });
            let id = 0;
                vadUsuario(email,pass,function(err,data){
                   id = data;
                    if (tip == 1){
                        connection.query('INSERT INTO mdoctores (name_med, appat_med, apmat_med, ced_med, id_usr) values("'+name+'","'+appat+'","'+apmat+'","'+ced+'",'+id+')',(err,result)=>{
                            if (err){
                                connection.query('SELECT * FROM cestado',(err,result1)=>{
                                   res.render('registro',{estados:result1,mensaje:"Algo ha ocurrido"});
                                });
                            }else{
                                res.render('login',{mensaje:"Ahora inicia sesion"});
                            }
                        });
                    }else if(tip ==2){
                        console.log("as.----------------------"+ id);
                        connection.query('INSERT INTO mpacientes (nom_pac, appat_pac, apmat_pac, id_usr) values("'+name+'","'+appat+'","'+apmat+'",'+id+')',(err,result)=>{
                            if (err){
                                connection.query('SELECT * FROM cestado',(err,result1)=>{
                                   res.render('registro',{estados:result1,mensaje:"Algo ha ocurrido"});
                                });
                            }else{
                                res.render('login',{mensaje:"Ahora inicia sesion"});
                            }
                        });
                    }
                });
            
        }else if(!valida.validarNombre){
            var mensaje =  "El nombre no es valido";
            res.render('Registro',{estados,mensaje});
        }else if(!valida.validarPassword){
            var mensaje =  "La contraseña no es valida";
            res.render('Registro',{estados,mensaje});
        }else if(!valida.validarCodigoP){
            var mensaje =  "El codigo postal no es valido";
            res.render('Registro',{estados,mensaje});
        }else if(!valida.validarTelefono){
            var mensaje =  "El telefono no es valido";
            res.render('Registro',{estados,mensaje});
        }else if(!valida.validarEmail){
            var mensaje =  "El correo ya esta en uso o no es valido";
            res.render('Registro',{estados,mensaje});
        }

    }catch(error){
        console.log("-------------------------------------"+error);
        res.render('Registro');
    }
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

exports.agregarUsuario = agregarUsuario;
exports.obtener =  obtener;
exports.editar =  editar;
exports.eliminar = eliminar;