const dbConnection = require('../../config/dbconnection');
const valida = require('./validaciones');
const connection = dbConnection();
const aes = require('./aes');
let pacientes = require('./pacientes');
var mail = require("nodemailer");

function login(req, res) {
    try {
        const { email } = req.body;
        const { pass } = req.body;

        if (valida.validarLogin(email, pass)) {

            connection.query("SELECT * FROM musuarios WHERE email_usr = '" + aes.cifrar(email) + "' && pass_usr = '" + aes.cifrar(pass) + "'", (err, result) => {
                if (!err) {
                    var user = result[0];
                    if (typeof user !== 'undefined') {
                        var user2 = user;
                        user2.email_usr = aes.decifrar(user2.email_usr);
                        if (user2.img_usr != null) {
                            user2.img_usr = aes.decifrar(user2.img_usr);
                        }
                        user2.reg_usr = aes.decifrar(user2.reg_usr);
                        req.session.user = user;
                        req.session.user2 = user2;
                        res.redirect('/Home');
                    } else {
                        res.render('login', { mensaje: "Contraseña o usuario incorrecto" })
                    }
                } else {
                    console.log("Error login    " + err);
                }
            });
        } else {
            res.render('login', { mensaje: "Correo o contraseña no validos" })
        }

    } catch (error) {
        console.log("-------------------------------------" + error);
        res.render('login');
    }
}

function vadUsuario(email, pass, callback) {
    const connection = dbConnection();
    var re = 0;
    console.log("SELECT * FROM musuarios WHERE email_usr = '" + aes.cifrar(email) + "' && pass_usr = '" + aes.cifrar(pass) + "'");
    connection.query("SELECT * FROM musuarios WHERE email_usr = '" + aes.cifrar(email) + "' && pass_usr = '" + aes.cifrar(pass) + "'", (err, result) => {
        if (!err) {
            console.log("cuif     " + result);
            callback(null, result[0].id_usr);
        } else {

        }
    });
    return re;
}

function agregarUsuario(req, res) {
    try {
        const { email } = req.body;
        const { pass } = req.body;
        const { pass1 } = req.body;
        var freg = new Date();
        var freg1 = freg.getDay() + "/" + freg.getMonth() + "/" + freg.getFullYear();
        var estados;
        const { name } = req.body;
        const { appat } = req.body;
        const { apmat } = req.body;
        const { cod } = req.body;
        const { tel } = req.body;
        const { tip } = req.body;
        const { ced } = req.body;

        if (valida.validarNombre(name, appat, apmat) && valida.validarEmail(email) && valida.validarPassword(pass, pass1) && valida.validarCedula(ced, tip)) {
            connection.query("SELECT * FROM musuarios WHERE email_usr = '" + aes.cifrar(email) + "'", (er1, res1) => {
                if (!er1) {
                    if (res1.length > 0) {
                        connection.query('SELECT * FROM cestado', (err, result) => {
                            var mensaje = "El correo ya esta en uso";
                            res.render('Registro', { estados: result, mensaje });
                        });
                    } else {
                        connection.query('INSERT INTO musuarios (email_usr, pass_usr, reg_usr,id_tid) values("' + aes.cifrar(email) + '","' + aes.cifrar(pass) + '","' + aes.cifrar(freg1) + '",' + tip + ')', (err, result) => {
                            if (err) {
                                console.log(err);
                                registrado = false;
                            } else {
                                registrado = true;
                            }
                        });
                        let id = 0;
                        vadUsuario(email, pass, function(err, data) {
                            id = data;
                            if (tip == 1) {
                                connection.query('INSERT INTO mdoctores (name_med, appat_med, apmat_med, ced_med, id_usr) values("' + aes.cifrar(name) + '","' + aes.cifrar(appat) + '","' + aes.cifrar(apmat) + '","' + aes.cifrar(ced) + '",' + id + ')', (err, result) => {
                                    if (err) {
                                        connection.query('SELECT * FROM cestado', (err, result1) => {
                                            console.log(err);
                                            res.render('registro', { estados: result1, mensaje: "Algo ha ocurrido" });
                                        });
                                    } else {
                                        /*connection.query('INSERT INTO mdatos (id_usr, id_sex, tel_dat, numext_dat, numint_dat, calle_dat, del_dat, id_sta, col_dat, codpost_dat) values('+id+', '+sex+', "'+aes.cifrar(tel)+'", "'+aes.cifrar(nume)+'", "'+aes.cifrar(numi)+'", "'+aes.cifrar(calle)+'", "'+aes.cifrar(mun)+'", "'+est+'","'+aes.cifrar(col)+'","'+aes.cifrar(cod)+'")',(err,result)=>{
                                          if (err){
                                            console.log(err);
                                              connection.query('SELECT * FROM cestado',(err,result1)=>{
                                                 res.render('registro',{estados:result1,mensaje:"Algo ha ocurrido"});
                                              });
                                          }else{*/
                                        res.render('login', { mensaje: "Ahora inicia sesion" });
                                        res.end();
                                        //}
                                        //});
                                    }
                                });

                            } else if (tip == 2) {
                                console.log("as.----------------------" + id);
                                connection.query('INSERT INTO mpacientes (nom_pac, appat_pac, apmat_pac, id_usr) values("' + aes.cifrar(name) + '","' + aes.cifrar(appat) + '","' + aes.cifrar(apmat) + '",' + id + ')', (err, result) => {
                                    if (err) {
                                        console.log(err);
                                        connection.query('SELECT * FROM cestado', (err, result1) => {
                                            res.render('registro', { estados: result1, mensaje: "Algo ha ocurrido" });
                                        });
                                    } else {
                                        /*connection.query('INSERT INTO mdatos (id_usr, id_sex, tel_dat, numext_dat, numint_dat, calle_dat, del_dat, id_sta, col_dat, codpost_dat) values('+id+', '+sex+', "'+aes.cifrar(tel)+'", "'+aes.cifrar(nume)+'", "'+aes.cifrar(numi)+'", "'+aes.cifrar(calle)+'", "'+aes.cifrar(mun)+'", "'+est+'","'+aes.cifrar(col)+'","'+aes.cifrar(cod)+'")',(err,result)=>{
                                          if (err){
                                            console.log(err);
                                              connection.query('SELECT * FROM cestado',(err,result1)=>{
                                                 res.render('registro',{estados:result1,mensaje:"Algo ha ocurrido"});
                                              });
                                          }else{*/
                                        res.render('login', { mensaje: "Ahora inicia sesion" });
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


        } else if (!valida.validarNombre(name, appat, apmat)) {
            connection.query('SELECT * FROM cestado', (err, result) => {
                var mensaje = "El nombre no es valido";
                res.render('Registro', { estados: result, mensaje });
            });
        } else if (!valida.validarPassword(pass, pass1)) {
            connection.query('SELECT * FROM cestado', (err, result) => {
                var mensaje = "La contraseña no es valida";
                res.render('Registro', { estados: result, mensaje });
            });
        } else if (!valida.validarEmail(email)) {
            connection.query('SELECT * FROM cestado', (err, result) => {
                var mensaje = "El correo no es valido";
                res.render('Registro', { estados: result, mensaje });
            });
        } else if (!valida.validarCedula(ced, tip)) {
            connection.query('SELECT * FROM cestado', (err, result) => {
                var mensaje = "La cedula no es valida";
                res.render('Registro', { estados: result, mensaje });
            });
        } else {
            connection.query('SELECT * FROM cestado', (err, result) => {
                var mensaje = "Datos erroneos";
                res.render('Registro', { estados: result, mensaje });
            });
        }


    } catch (error) {
        console.log("-------------------------------------" + error);
        res.render('Registro');
    }
}

function setMedico(req, res) { //Este metodo asina medicos a pacientes
    try {
        const { tip } = req.body;
        const { cod } = req.body;
        var id = req.session.user.id_usr;
        var numeval = /^([0-9])+$/;
        var idmed = (cod / 2) - 95158;
        var tipot;
        if (tip == 1) {
            tipot = "Medico principal agregado";
        } else {
            tipot = "Medico auxiliar agregado";
        }
        if (numeval.test(tip) && numeval.test(cod)) {
            connection.query('SELECT * FROM mdoctores where id_usr = ' + idmed, (ers, ress) => {
                if (ers) {
                    console.log(ers);
                } else {
                    if (typeof ress[0] !== "undefined") {
                        connection.query("select * FROM mpacientes where id_usr=" + id, (er1, re1) => {
                            var regP = false;
                            connection.query("SELECT * FROM mpaciente_medico where id_pac =" + re1[0].id_med + " && id_med=" + ress[0].id_med, (ers, resq) => {
                                if (!ers) {
                                    if (resq.length > 0) {
                                        regP = true;;
                                    }
                                }
                            });
                            if (!regP) {
                                connection.query('INSERT INTO mpaciente_medico (id_med, id_pac, id_ran) values (' + ress[0].id_med + ',' + re1[0].id_pac + ',' + tip + ')', (err, result) => {
                                    if (err) {
                                        console.log("Error insercion setMedico      " + err);
                                    } else {
                                        res.redirect("Home?men=" + tipot);
                                    }
                                });
                            } else {
                                res.redirect("Home?men=Ya has registrado a este medico en tu perfil");
                            }
                        });
                    } else {
                        res.redirect("Home?men=El codigo no existe");
                    }
                }
            })
        } else {
            res.redirect('Home');
        }
    } catch (Errors) {
        console.log("error ser Medico        " + Errors);

        res.redirect('Home');
    }
}

function setPaciente(req, res) { //Este metodo asigna pacientes a medicos

}

function obtenerDatos(id_usr,callback){
    connection.query(`SELECT * FROM mdatos where id_usr =${id_usr}`,(err,res)=>{
        if(!err){
            if(res.length>0){
                if(res[0].id_sex==1){
                    res[0].id_sex= "Masculino";
                }else if(res[0].id_sex==2){
                    res[0].id_sex="Femenino";
                }else{
                    res[0].id_sex="Otro";
                }
                if(res[0].numint_dat!= null){
                    res[0].numint_dat = aes.decifrar(res[0].numint_dat);
                }
                res[0].tel_dat = aes.decifrar(res[0].tel_dat);
                res[0].numext_dat = aes.decifrar(res[0].numext_dat);
                res[0].calle_dat = aes.decifrar(res[0].calle_dat);
                res[0].del_dat = aes.decifrar(res[0].del_dat);
                res[0].col_dat = aes.decifrar(res[0].col_dat);
                res[0].codpost_dat = aes.decifrar(res[0].codpost_dat);
                connection.query('SELECT * FROM cestado',(err,result1)=>{
                    for (var i = 0; i < result1.length; i++) {
                      if(result1[i].id_sta==res[0].id_sta){
                        res[0].id_sta = result1[i].name_sta;
                      }
                    }
                    callback([res[0],[]])
                });

            }else{
              connection.query('SELECT * FROM cestado',(err,result1)=>{
                  callback([null,result1]);
              });
            }
        }else{
          console.log(err);
            connection.query('SELECT * FROM cestado',(err,result1)=>{
                callback([null,result1]);
            });
        }
    });
}

function guardarDatos(req,res) {
  const { sex } = req.body;
  const { calle } = req.body;
  const { nume } = req.body;
  const { numi } = req.body;
  const { col } = req.body;
  const { cod } = req.body;
  const { mun } = req.body;
  const { est } = req.body;
  const { tel } = req.body;
  if (valida.validarNumeros(sex) && sex >0 && sex<4) {
    if (valida.validarAspectos(calle)) {
      if (valida.validarAspectos(nume)) {
        if (valida.validarAspectos(numi)||numi.length==0) {
          if (valida.validarAspectos(col)) {
            if (valida.validarNumeros(cod)) {
              if (valida.validarNombre1(mun)) {
                if (valida.validarNumeros(est)&& est >0 && est<33) {
                  if (valida.validarTelefono(tel)) {
                    connection.query(`SELECT * FROM mdatos WHERE id_usr=${req.session.user.id_usr}`,(err,res1)=>{
                      if (!err) {
                        if (res1.length==0) {
                          connection.query(`INSERT into mdatos (id_usr, id_sex, tel_dat, numext_dat, numint_dat, calle_dat, del_dat, id_sta, col_dat, codpost_dat)
                           values(${req.session.user.id_usr},${sex},'${aes.cifrar(tel)}','${aes.cifrar(nume)}','${aes.cifrar(numi)}','${aes.cifrar(calle)}','${aes.cifrar(mun)}',${aes.cifrar(est)},'${aes.cifrar(col)}','${aes.cifrar(cod)}')`,(er,re)=>{
                              if(!er){
                                res.redirect('/perfil?men=Datos guardados');
                              }else{
                                console.log(er);
                                res.redirect('/perfil?men=Algo salio mal');
                              }
                           });
                        }else{
                          connection.query(`UPDATE mdatos set tel_dat='${aes.cifrar(tel)}' , numext_dat='${aes.cifrar(nume)}', numint_dat='${aes.cifrar(numi)}',calle_dat='${aes.cifrar(calle)}',del_dat='${aes.cifrar(mun)}',id_sta=${est},col_dat='${aes.cifrar(col)}',codpost_dat='${aes.cifrar(cod)}',id_sex=${sex} where id_usr=${req.session.user.id_usr}`,(er,re)=>{
                            if (!er) {
                              res.redirect('/perfil?men=Datos actualizados');
                            }else{
                              console.log(er);
                              res.redirect('/perfil?men=Algo salio mal');
                            }
                          });
                        }
                      }else{
                        console.log(err);
                        res.redirect('/perfil?men=Algo salio mal');
                      }
                    });
                  }else{
                    res.redirect('/perfil?men=El telefono no es valido');
                  }
                }else{
                  res.redirect('/perfil?men=El nombre del estado no es valido');
                }
              }else{
                res.redirect('/perfil?men=El nombre del municipio no es valido');
              }
            }else{
              res.redirect('/perfil?men=El codigo no es valido');
            }
          }else{
            res.redirect('/perfil?men=El nombre de la colonia no es valido');
          }
        }else{
          res.redirect('/perfil?men=El numero interior no es valido');
        }
      }else{
        res.redirect('/perfil?men=El numero exterior no es valido');
      }
    }else{
      res.redirect('/perfil?men=El nombre de la calle no es valido');
    }
  }else{
    res.redirect('/perfil?men=El genero no es valido');
  }
}
function recuperar(req,res){
    let { email } = req.body;
    let password;
    if(valida.validarEmail(email)){
        connection.query("SELECT pass_usr FROM musuarios where email_usr = '"+aes.cifrar(email)+"';",(err,result)=>{
            if(!err){
                password = result[0].pass_usr;
        
                let transporter = mail.createTransport({
                    service:"Gmail",
                    auth:{
                        user: "spicysystems@gmail.com",
                        pass: "asd123ASd"
                    }
                });
                let mensaje = "La contraseña de su cuenta UseDoc es: \n\n"+aes.decifrar(password)+"\n\n"+
                "Le recomendamos guardar esta contraseña en un lugar seguro para evitar esta situacion nuevamente.\n"+
                "Ya puede ingresar a su cuenta nuevamente.\n Favor de no responder este correo.";
        
                let mailOptions = {
                    from: "spicysystems@gmail.com",
                    to: email,
                    subject: "Recuperacion de Contraseña UseDoc",
                    text: mensaje
                };
                transporter.sendMail(mailOptions,function(err,info){
                    if(err){
                        console.log(err);
                        res.redirect("/rec_contra?men=Error al enviar el correo");
                    }else{
                        console.log("Email enviado a: "+info.response);
                        res.redirect("/login?men=Email enviado correctamente, cheque sus correos nuevos");
                    }
                });
            }else{
                res.redirect("/rec_contra?men=Error con el correo ingresado, verifica que este correctamente escrito");
            }
        });
    }else{
        res.redirect('/rec_contra?men=El correo electronico no es valido');
    }
}

exports.guardarDatos = guardarDatos;
exports.agregarUsuario = agregarUsuario;
exports.obtenerDatos = obtenerDatos;
exports.login = login;
exports.setMedico = setMedico;
exports.setPaciente = setPaciente;
exports.recuperar = recuperar;

