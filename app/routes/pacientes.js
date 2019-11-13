const dbConnection = require('../../config/dbconnection');
const valida = require('./validaciones');
const connection = dbConnection();
const aes = require('./aes');

function obtenerRangos(id,callback){
	connection.query('Select * from mpacientes where id_usr= '+ id,(er1,re1)=>{
		if(!er1){
			if(re1.length>0){
				connection.query('select * from mpaciente_medico where id_pac='+re1[0].id_pac,(err,res)=>{
					if(!err){
						if(res.length>0){
							callback(res);
						}else{
							callback([]);
						}
					}else{
						console.log(err);
					}
				});
			}else{
				callback([]);
			}
		}else{
			callback([]);
		}
	});
}

function obtenerDoctores(id,callback){
	try{
		connection.query("SELECT * FROM mpacientes where id_usr = "+id,(er1,re1)=>{
			if(!er1){
				if(re1.length>0){
					connection.query('SELECT * FROM mpaciente_medico where id_pac='+re1[0].id_pac,(err,result)=>{
						if (!err) {
							let doctores = [];
							let cad = "SELECT * FROM mdoctores where ";
							for (var i = 0; i < result.length; i++) {
								if(i == (result.length-1)){
									cad += "id_med = "+ result[i].id_med;
								}else{
									cad += "id_med = "+ result[i].id_med + " && ";
								}
							}
							if (result.length<1) {
								cad += "id_med = 0";
							}
							connection.query(cad,(er,res)=>{
								if(er){
									callback([]);
									console.log("error " + er);
								}else{

									for(var c = 0; c < res.length;c++){
										res[c].name_med = aes.decifrar(res[c].name_med);
										res[c].appat_med = aes.decifrar(res[c].appat_med);
										res[c].apmat_med = aes.decifrar(res[c].apmat_med);
										res[c].ced_med = aes.decifrar(res[c].ced_med);
									}
									callback(res);
								}
							});
						}else{
							console.log("error en obtener doctores:  " +err);
						}
					});
				}else{
					callback([]);
				}
			}else{
				callback([]);
			}
		});

	}catch(error){
		console.log("Error obtener doctores");
	}
}

function obtenerDatos(id,callback){
	try{
		connection.query('SELECT * FROM mpaciente_medico where id_pac='+id,(err,result)=>{
			if (!err) {
				let datos = [];
				let cad = "SELECT * FROM mdatos where ";
				for (var i = 0; i < result.length; i++) {
					if(i == (result.length-1)){
						cad += "id_pac = "+ result[i].id_dat;
					}else{
						cad += "id_pac = "+ result[i].id_dat + " && ";
					}
				}
				console.log(cad);
				connection.query(cad,(er,res)=>{
					if(er){
						console.log("error " + er);
					}else{
						for(var c = 0; c < res.length;c++){
							res[c].id_sex = aes.decifrar(res[c].id_sex);
							res[c].tel_dat = aes.decifrar(res[c].tel_dat);
							res[c].numext_dat = aes.decifrar(res[c].numext_dat);
							res[c].numint_dat = aes.decifrar(res[c].numint_dat);
							res[c].calle_dat = aes.decifrar(res[c].calle_dat);
							res[c].del_dat = aes.decifrar(res[c].del_dat);
							res[c].id_sta = aes.decifrar(res[c].id_sta);
							res[c].col_dat = aes.decifrar(res[c].col_dat);
							res[c].codpost_dat = aes.decifrar(res[c].codpost_dat);
						}
						console.log(res);
						callback(res);
					}
				});
			}else{
				console.log("error en obtener datos:  " +err);
			}
		});
	}catch(error){
		console.log("Error obtener datos");
	}
}
function obtenerContacto(id,callback){
	try{
		connection.query('SELECT * FROM mpaciente_medico where id_pac='+id,(err,result)=>{
			if (!err) {
				let contacto = [];
				let cad = "SELECT * FROM contacto where ";
				for (var i = 0; i < result.length; i++) {
					if(i == (result.length-1)){
						cad += "id_pac = "+ result[i].id_pac;
					}else{
						cad += "id_pac = "+ result[i].id_pac + " && ";
					}
				}
				console.log(cad);
				connection.query(cad,(er,res)=>{
					if(er){
						console.log("error " + er);
					}else{
						for(var c = 0; c < res.length;c++){
							res[c].rut_con = aes.decifrar(res[c].rut_con);
						}
						console.log(res);
						callback(res);
					}
				});
			}else{
				console.log("error en obtener contacto:  " +err);
			}
		});
	}catch(error){
		console.log("Error obtener contacto");
	}
}

function obtenerCitas(id,callback){
	try{
		connection.query("SELECT * FROM mpacientes WHERE id_usr= "+id,(er1,re1)=>{
			if(!er1){
				if(re1.length>0){
					connection.query('SELECT * FROM mcitas where id_pac='+re1[0].id_pac,(err,result)=>{
						if (!err) {
							if (result.length>0) {
								for (var i = 0; i < result.length; i++) {
									if (result[i].des_cit!="Sin descripcion") {
										result[i].des_cit = aes.decifrar(result[i].des_cit);
									}
									result[i].dat_cit = aes.decifrar(result[i].dat_cit);
									result[i].hor_cit = aes.decifrar(result[i].hor_cit);
									result[i].dat_cit = aes.decifrar(result[i].dat_cit);
									result[i].id_med = result[i].id_med;
									result[i].des_ = result[i].des_cit;

								}
							}
							callback(result);
						}else{
							callback([]);
							console.log("error en obtener citas:  " +err);
						}
					});
				}else{
					callback([]);
				}
			}else{
				callback([]);
			}
		});
	}catch(error){
		console.log("Error obtener datos");
	}
}

function obtenerHistoriales(id,callback){
	try{
		connection.query('SELECT * FROM mpaciente_medico where id_pac='+id,(err,result)=>{
			if (!err) {
				let historiales = [];
				let cad = "SELECT * FROM mhistoriales where ";
				for (var i = 0; i < result.length; i++) {
					if(i == (result.length-1)){
						cad += "id_pac = "+ result[i].id_pac;
					}else{
						cad += "id_pac = "+ result[i].id_pac + " && ";
					}
				}
				console.log(cad);
				connection.query(cad,(er,res)=>{
					if(er){
						console.log("error " + er);
					}else{
						for(var c = 0; c < res.length;c++){

							res[c].rut_his = aes.decifrar(res[c].rut_his);
							res[c].fec_his = aes.decifrar(res[c].fec_his);

						}
						console.log(res);
						callback(res);
					}
				});
			}else{
				console.log("error en obtener historiales:  " +err);
			}
		});
	}catch(error){
		console.log("Error obtener historiales");
	}
}

function obtenerMedicoById (id,callback){
	connection.query('SELECT * from mdoctores where id_med='+id,(err,res)=>{
		if (!err) {
			connection.query('SELECT * from mcitas where id_med = '+res[0].id_med,(er,re)=>{
				if (!er) {
					for (var i = 0; i < re.length; i++) {
						if (re[i].des_cit!="Sin descripcion") {
							re[i].des_cit = aes.decifrar(re[i].des_cit);
						}
						re[i].dat_cit = aes.decifrar(re[i].dat_cit);
						re[i].hor_cit = aes.decifrar(re[i].hor_cit);
					}
					res[0].name_med = aes.decifrar(res[0].name_med);
					res[0].appat_med = aes.decifrar(res[0].appat_med);
					res[0].apmat_med = aes.decifrar(res[0].apmat_med);
					res[0].ced_med = aes.decifrar(res[0].ced_med);
					callback([res[0],re]);
				}else{
					console.log("Error obtenerMedicoById1  " + er);
					callback([]);
				}
			});
		}else{
			console.log("Error obtenerMedicoById  " + err);
			callback([]);
		}
	})
}

function obtenerPacienteById(id, callback){
  connection.query('Select * from mpacientes where id_usr=' + id,(err,res)=>{
    if (!err) {
      if (typeof res[0].nom_pac!=="undefined") {
        res[0].nom_pac = aes.decifrar(res[0].nom_pac);
        res[0].appat_pac = aes.decifrar(res[0].appat_pac);
        res[0].apmat_pac = aes.decifrar(res[0].apmat_pac);
        connection.query('SELECT * FROM mdatos where id_usr = '+res[0].id_usr,(e,r)=>{
          if (!e) {
            if (r.length>0) {
            	if (typeof r[0].id_usr !== "undefined") {
		              r[0].tel_dat = aes.decifrar(r[0].tel_dat);
		              r[0].numext_dat = aes.decifrar(r[0].numext_dat);
		              r[0].numint_dat = aes.decifrar(r[0].numint_dat);
		              r[0].calle_dat = aes.decifrar(r[0].calle_dat)  ;
		              r[0].del_dat = aes.decifrar(r[0].del_dat);
		              r[0].col_dat = aes.decifrar(r[0].col_dat);
		              r[0].codpost_dat = aes.decifrar(r[0].codpost_dat);
		              let respuesta = [res[0],r[0]];
		              callback(respuesta);
		            }else{
		              callback([]);
		            }
            }else{
				console.log("No mayor a 0 	" + r )
		              callback([res[0],null]);
		            }
          }else{
			console.log("error  	" + e )
            callback([]);
          }
        });
      }else{
		console.log("no definido	" + res )
        callback([]);
      }
    }else{
		console.log(err);
		callback([]);
	}
  });
}

function obtenerHorario(id,callback){
  connection.query('SELECT * FROM mhorario_medico WHERE id_med='+id,(er,resu)=>{
    if (!er) {
      if (resu.length>0) {

        resu[0].hi_hor = aes.decifrar(resu[0].hi_hor);
        resu[0].hf_hor = aes.decifrar(resu[0].hf_hor);
        resu[0].tiem_hor = aes.decifrar(resu[0].tiem_hor);
        resu[0].di_hor = aes.decifrar(resu[0].di_hor);
        callback(resu);
      }else{
        callback(resu);
      }
    }else {
      console.log("Error obtenerHorariopaci1   "+ er);
    }
  });
}

function obtenerPerfilImg(callback){
	connection.query('Select id_usr,img_usr from musuarios',(err,res)=>{
		if(!err){
			if(res.length>0){
				for(var i = 0;i< res.length;i++){
					res[i].img_usr = aes.decifrar(res[i].img_usr);
				}
				callback(res);
			}else{
				callback([]);
			}
		}else{
			callback([]);
		}
	});
}

function obtenerMensajes(req,callback){
	if (req.session.user.id_tid==1) {
		connection.query(`SELECT * FROM mdoctores where id_usr=${req.session.user.id_usr}`,(err,res)=>{
			if (!err) {
				if (true) {

				}
			}else{
				callback([]);
			}
		})
	}else{

	}
}

exports.obtenerPerfilImg = obtenerPerfilImg;
exports.obtenerHorario = obtenerHorario;
exports.obtenerPacienteById = obtenerPacienteById;
exports.obtenerMedicoById = obtenerMedicoById;
exports.obtenerDoctores = obtenerDoctores;
exports.obtenerRangos = obtenerRangos;
exports.obtenerDatos = obtenerDatos;
exports.obtenerContacto = obtenerContacto;
exports.obtenerHistoriales = obtenerHistoriales;
exports.obtenerCitas = obtenerCitas;
