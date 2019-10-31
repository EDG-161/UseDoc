const dbConnection = require('../../config/dbconnection');
const valida = require('./validaciones');
const connection = dbConnection();
const aes = require('./aes');

function obtenerRangos(id,callback){
	connection.query('Select * from mpacientes where id_usr= '+ id,(er1,re1)=>{
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
	});
}

function obtenerDoctores(id,callback){
	try{
		connection.query("SELECT * FROM mpacientes where id_usr = "+id,(er1,re1)=>{
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
							console.log(res);
							callback(res);
						}
					});
				}else{
					console.log("error en obtener doctores:  " +err);
				}
			});
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
			console.log(re1);
			connection.query('SELECT * FROM mcitas where id_pac='+re1[0].id_pac,(err,result)=>{
				if (!err) {
					console.log('SELECT * FROM mcitas where id_pac='+id);
					for (var i = 0; i < result.length; i++) {
						result[i].des_cit = aes.decifrar(result[i].des_cit);
						result[i].dat_cit = aes.decifrar(result[i].dat_cit);
						result[i].hor_cit = aes.decifrar(result[i].hor_cit);
					}
					console.log(result);
					callback(result);
				}else{
					callback([]);
					console.log("error en obtener citas:  " +err);
				}
			});
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
						re[i].des_cit = aes.decifrar(re[i].des_cit);
						re[i].dat_cit = aes.decifrar(re[i].dat_cit);
						re[i].hor_cit = aes.decifrar(re[i].hor_cit);
					}
					res[0].name_med = aes.decifrar(res[0].name_med);
					res[0].appat_med = aes.decifrar(res[0].appat_med);
					res[0].apmat_med = aes.decifrar(res[0].apmat_med);
					res[0].ced_med = aes.decifrar(res[0].ced_med);
					callback([res[0].re]);
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
          if (!err) {
            if (typeof r[0].id_usr !== "undefined") {
              r[0].tel_dat = aes.decifrar(r[0].tel_dat);
              r[0].numext_dat = aes.decifrar(r[0].numext_dat);
              r[0].numint_dat = aes.decifrar(r[0].numint_dat);
              r[0].calle_dat = aes.decifrar(r[0].calle_dat)  ;
              r[0].del_dat = aes.decifrar(r[0].del_dat);
              r[0].col_dat = aes.decifrar(r[0].col_dat);
              r[0].codpost_dat = aes.decifrar(r[0].codpost_dat);
              let respuesta = [res[0],r[0]];
              console.log(respuesta);
              callback(respuesta);
            }else{
              callback([]);
            }
          }else{
            callback([]);
          }
        });
      }else{
        callback([]);
      }
    }
  });
}

exports.obtenerPacienteById = obtenerPacienteById;
exports.obtenerMedicoById = obtenerMedicoById;
exports.obtenerDoctores = obtenerDoctores;
exports.obtenerRangos = obtenerRangos;
exports.obtenerDatos = obtenerDatos;
exports.obtenerContacto = obtenerContacto;
exports.obtenerHistoriales = obtenerHistoriales;
exports.obtenerCitas = obtenerCitas;
