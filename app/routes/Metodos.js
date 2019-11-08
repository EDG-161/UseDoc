const dbConnection = require('../../config/dbconnection');
const valida = require('./validaciones');
const connection = dbConnection();
const aes = require('./aes');
let pacientes = require('./pacientes');

function login(req,res){
    try{
        const {email } =  req.body;
        const { pass } = req.body;

        if (valida.validarLogin(email,pass)) {
        
            connection.query("SELECT * FROM musuarios WHERE email_usr = '"+ aes.cifrar(email) + "' && pass_usr = '"+ aes.cifrar(pass) + "'",(err,result)=>{
                if (!err) {
                    var user = result[0];
                    if (typeof user !== 'undefined') {
                        var user2 = user;
                        user2.email_usr = aes.decifrar(user2.email_usr);
                        if (user2.img_usr) {
                          user2.img_usr = aes.decifrar(user2.img_usr);
                        }
                        user2.reg_usr = aes.decifrar(user2.reg_usr);
                        req.session.user = user;
                        req.session.user2 = user2;
                        res.redirect('/Home');
                    }else{
                        res.render('login',{mensaje:"Contraseña o usuario incorrecto"})
                    }
                }else{
                    console.log("Error login    " + err);
                }
            });
        }else{
            res.render('login',{mensaje:"Correo o contraseña no validos"})
        }

    }catch(error){
        console.log("-------------------------------------"+error);
        res.render('login');
    }
}

function vadUsuario(email,pass,callback){
    const connection = dbConnection();
    var re = 0;
    console.log("SELECT * FROM musuarios WHERE email_usr = '"+aes.cifrar(email)+"' && pass_usr = '" + aes.cifrar(pass)+"'");
    connection.query("SELECT * FROM musuarios WHERE email_usr = '"+aes.cifrar(email)+"' && pass_usr = '" + aes.cifrar(pass)+"'", (err, result) => {
        if (!err){
          console.log("cuif     "+result);
            callback(null,result[0].id_usr);
        }else {

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
        const { cod } = req.body;
        const { tel } = req.body;
        const { tip } = req.body;
        const { ced } = req.body;

        if(valida.validarNombre(name,appat,apmat)&&valida.validarEmail(email)&&valida.validarPassword(pass,pass1)&&valida.validarCedula(ced,tip)){
            connection.query("SELECT * FROM musuarios WHERE email_usr = '" + aes.cifrar(email)+"'",(er1,res1)=>{
              if (!er1) {
                if (res1.length>0) {
                  connection.query('SELECT * FROM cestado',(err,result)=>{
                      var mensaje =  "El correo ya esta en uso";
                      res.render('Registro',{estados:result,mensaje});
                  });
                }else{
                  connection.query('INSERT INTO musuarios (email_usr, pass_usr, reg_usr,id_tid) values("'+aes.cifrar(email)+'","'+aes.cifrar(pass)+'","'+aes.cifrar(freg1)+'",'+tip+')',(err,result)=>{
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
                              connection.query('INSERT INTO mdoctores (name_med, appat_med, apmat_med, ced_med, id_usr) values("'+aes.cifrar(name)+'","'+aes.cifrar(appat)+'","'+aes.cifrar(apmat)+'","'+aes.cifrar(ced)+'",'+id+')',(err,result)=>{
                                  if (err){
                                      connection.query('SELECT * FROM cestado',(err,result1)=>{
                                        console.log(err);
                                         res.render('registro',{estados:result1,mensaje:"Algo ha ocurrido"});
                                      });
                                  }else{
                                    /*connection.query('INSERT INTO mdatos (id_usr, id_sex, tel_dat, numext_dat, numint_dat, calle_dat, del_dat, id_sta, col_dat, codpost_dat) values('+id+', '+sex+', "'+aes.cifrar(tel)+'", "'+aes.cifrar(nume)+'", "'+aes.cifrar(numi)+'", "'+aes.cifrar(calle)+'", "'+aes.cifrar(mun)+'", "'+est+'","'+aes.cifrar(col)+'","'+aes.cifrar(cod)+'")',(err,result)=>{
                                      if (err){
                                        console.log(err);
                                          connection.query('SELECT * FROM cestado',(err,result1)=>{
                                             res.render('registro',{estados:result1,mensaje:"Algo ha ocurrido"});
                                          });
                                      }else{*/
                                          res.render('login',{mensaje:"Ahora inicia sesion"});
                                          res.end();
                                      //}
                                  //});
                                  }
                              });

                          }else if(tip ==2){
                              console.log("as.----------------------"+ id);
                              connection.query('INSERT INTO mpacientes (nom_pac, appat_pac, apmat_pac, id_usr) values("'+aes.cifrar(name)+'","'+aes.cifrar(appat)+'","'+aes.cifrar(apmat)+'",'+id+')',(err,result)=>{
                                  if (err){
                                    console.log(err);
                                      connection.query('SELECT * FROM cestado',(err,result1)=>{
                                         res.render('registro',{estados:result1,mensaje:"Algo ha ocurrido"});
                                      });
                                  }else{
                                    /*connection.query('INSERT INTO mdatos (id_usr, id_sex, tel_dat, numext_dat, numint_dat, calle_dat, del_dat, id_sta, col_dat, codpost_dat) values('+id+', '+sex+', "'+aes.cifrar(tel)+'", "'+aes.cifrar(nume)+'", "'+aes.cifrar(numi)+'", "'+aes.cifrar(calle)+'", "'+aes.cifrar(mun)+'", "'+est+'","'+aes.cifrar(col)+'","'+aes.cifrar(cod)+'")',(err,result)=>{
                                      if (err){
                                        console.log(err);
                                          connection.query('SELECT * FROM cestado',(err,result1)=>{
                                             res.render('registro',{estados:result1,mensaje:"Algo ha ocurrido"});
                                          });
                                      }else{*/
                                          res.render('login',{mensaje:"Ahora inicia sesion"});
                                          res.end();
                                      //}
                                    //});
                                  }
                              });

                          }
                      });
                }
              }
            });


        }else if(!valida.validarNombre(name,appat,apmat)){
            connection.query('SELECT * FROM cestado',(err,result)=>{
                var mensaje =  "El nombre no es valido";
                res.render('Registro',{estados:result,mensaje});
            });
        }else if(!valida.validarPassword(pass,pass1)){
            connection.query('SELECT * FROM cestado',(err,result)=>{
                var mensaje =  "La contraseña no es valida";
                res.render('Registro',{estados:result,mensaje});
            });
        }else if(!valida.validarEmail(email)){
            connection.query('SELECT * FROM cestado',(err,result)=>{
                var mensaje =  "El correo no es valido";
                res.render('Registro',{estados:result,mensaje});
            });
        }else if(!valida.validarCedula(ced,tip)){
            connection.query('SELECT * FROM cestado',(err,result)=>{
                var mensaje =  "La cedula no es valida";
                res.render('Registro',{estados:result,mensaje});
            });
        }else {
          connection.query('SELECT * FROM cestado',(err,result)=>{
              var mensaje =  "Datos erroneos";
              res.render('Registro',{estados:result,mensaje});
          });
        }


    }catch(error){
        console.log("-------------------------------------"+error);
        res.render('Registro');
    }
}

function setMedico(req,res){//Este metodo asina medicos a pacientes
    try{
        const { tip } = req.body;
        const { cod } = req.body;
        var id = req.session.user.id_usr;
        var numeval = /^([0-9])+$/;
        var idmed = (cod/2)-95158;
        var tipot;
        if(tip ==1){
            tipot = "Medico principal agregado";
        }else{
            tipot = "Medico auxiliar agregado";
        }
        if(numeval.test(tip) && numeval.test(cod)){
            connection.query('SELECT * FROM mdoctores where id_usr = ' + idmed,(ers,ress)=>{
                if(ers){
                    console.log(ers);

                }else{
                    if( typeof ress[0] !== "undefined"){
                        connection.query("select * FROM mpacientes where id_usr="+id,(er1,re1)=>{
                          connection.query('INSERT INTO mpaciente_medico (id_med, id_pac, id_ran) values ('+ress[0].id_med+','+re1[0].id_pac+','+tip+')',(err,result)=>{
                              if(err){
                                  console.log("Error insercion setMedico      " + err);
                              }else{
                                  pacientes.obtenerDoctores(userobj.id_usr,function(doctores){
                                      req.session.doctor = doctores;
                                      res.render("Home-Paciente",{
                                        user:userobj,
                                        doctores: req.session.doctor,
                                        rangos: req.session.rangos,
                                        citas: req.session.citas,
                                        mensaje: tipot
                                      });
                                  });
                              }
                          });
                        });
                    }else{
                        pacientes.obtenerDoctores(userobj.id_usr,function(doctores){
                            req.session.doctor = doctores;
                            res.render("Home-Paciente",{
                              user:userobj,
                              doctores: req.session.doctor,
                              rangos: req.session.rangos,
                              citas: req.session.citas,
                              mensaje: "El codigo no existe"
                            });
                        });
                    }
                }
            })
        }else{
            res.redirect('Home');
        }
    }catch(Errors){
        console.log("error ser Medico        " + Errors );

        res.redirect('Home');
    }
}

function setPaciente(req,res){//Este metodo asigna pacientes a medicos

}

exports.agregarUsuario = agregarUsuario;
exports.login = login;
exports.setMedico = setMedico;
exports.setPaciente = setPaciente;
