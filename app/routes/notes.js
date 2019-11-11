const dbConnection = require('../../config/dbconnection');
let pacientes = require('./pacientes');
let doctores = require('./doctores');
var modulos =  require('./Metodos');
const aes = require('./aes');

module.exports = app => {
    const connection = dbConnection();

    app.get('/', (req, res) => {
        if (req.session.user!= null) {
            res.writeHead(301,{'Location':'Home'});
            res.end();
        }else{
        res.render('index');
        }
    });

    app.get('/salir',(req,res)=>{
      console.log("----------------------------Salir------------------------------");
      req.session.user = null;
      res.redirect('index');
    });

    app.get('/index', (req, res) => {
        if (req.session.user!= null) {
            res.writeHead(301,{'Location':'Home'});
            res.end();
        }else{
        res.render('index');
        }
    });
    app.get('/main-page', (req, res) => {
        if (req.session.user!= null) {
            res.writeHead(301,{'Location':'Home'});
            res.end();
        }else{
        res.render('index');
        }
    });

    app.get('/Home',(req,res)=>{
        try {
          if (req.session.user!= null) {
              let userobj = req.session.user;

              let men = req.query.men;
              if (userobj.id_tid==1) {
                  doctores.obtenerPacientes(userobj.id_usr,function(pac){
                      req.session.pacientes = pac;
                      doctores.obtenerCitas(userobj.id_usr,function(citas){
                        req.session.citas = citas;
                        doctores.obtenerHorario(userobj.id_usr, function(h){
                          req.session.horario = h;
                          doctores.getGastos(userobj.id_usr,function(gastos){
                            req.session.gastos = gastos;
                            res.render("Home",{
                                user:userobj,
                                gastos,
                                pacientes:req.session.pacientes,
                                citas: req.session.citas,
                                horario: h,
                                mensaje:men
                            });
                          });
                        });
                      });
                  });
              }else{
                  pacientes.obtenerDoctores(userobj.id_usr,function(doctores){
                    req.session.doctor = doctores;
                    pacientes.obtenerRangos(userobj.id_usr,function(rangos){
                      req.session.rangos = rangos;
                      pacientes.obtenerCitas(userobj.id_usr, function(citas){
                        req.session.citas = citas;
                        res.render("Home-Paciente",{
                            user:userobj,
                            doctores: req.session.doctor,
                            rangos: req.session.rangos,
                            citas: req.session.citas,
                            mensaje:men
                        });
                      });
                    });
                  });
              }

          }else{
              res.writeHead(301,{'Location':'login'});
              res.end();
          }
        } catch (e) {
            console.log("-----------------------error Home ------------");
            console.log(e);
        }
    });

    app.get('/agregarMedico',(req,res)=>{
        try{
            if (req.session.user!= null) {
                userobj = req.session.user;
                if (userobj.id_tid==1) {
                    res.render("agregarPaciente",{
                        user:userobj
                    });
                }else{
                    if(typeof req.session.doctor[0] === "undefined"){
                        res.render("agregarMedico",{
                        user:userobj,
                        principal:1
                        });
                    }else{
                        res.render("agregarMedico",{
                        user:userobj,
                        principal:2
                        });
                    }
                }

            }else{
                res.writeHead(301,{'Location':'login'});
                res.end();
            }
        }catch(error){
            console.log("error agregar   "+ error);
            res.redirect("/Home");
        }
    });

    app.post('/agregarMedico',(req,res)=>{
        try{
            if (req.session.user!= null) {
                userobj = req.session.user;
                if (userobj.id_tid==2) {
                    modulos.setMedico(req,res);
                }else{
                    modulos.setPaciente(req,res);
                }

            }else{
                res.writeHead(301,{'Location':'login'});
                res.end();
            }
        }catch(error){
            console.log("error agregar post   "+ error);
            res.redirect("/Home");
        }
    });


    //----------------------Sesiones------------------------
    app.get('/contacto',(req,res)=>{
        res.render("contacto");
    });

    app.get('/login',(req,res)=>{
        if (req.session.user!= null) {
            res.redirect('/Home');
            res.end();
        }else{
            res.render('login');
        }
    });

    app.post('/login',(req,res)=>{
        if (req.session.user!= null) {
            res.redirect("/Home");
            res.end();
        }else{
            modulos.login(req,res);
        }
    });

    app.get('/registro',(req,res)=>{
        if (req.session.user!= null) {
            res.redirect("/Home");
            res.end();
        }else{
        connection.query('SELECT * FROM cestado',(err,result)=>{
            if(err){
                console.log(err);

            }
            res.render('registro',{estados:result});
        });
    }
    });

    app.post('/registro',(req,res)=>{
        if (req.session.user!= null) {
          res.redirect("/Home");
          res.end();
        }else{
            modulos.agregarUsuario(req,res);
        }
    });

    app.post('/imageProfile',(req,res)=>{
      if(req.session.user!=null){
        var userobj = req.session;
        console.log(userobj);

        let imgP = req.files.file;
        console.log("Tamaño de imagen " + imgP.size);
        var exte = imgP.name.split('.').pop();
        console.log("Extencion " + exte);
        if(imgP.size>15728640){
          res.redirect('/perfil?men=La imagen debe pesar 15 mb o menos');
        }else{
          if(exte == "png"||exte=="jpg"){
            var user = userobj.user;
            console.log("user es esto : " + user);

            var ruta = `${user.id_usr}profilePicture${user.name}.${exte}`;
            imgP.mv(`./app/public/images/profiles/${ruta}`,err => {
              if(err){
                console.log("error mv" + err);

                return res.redirect('/perfil?men=Algo ocurrio vuelve a intentar');
              }else{
                connection.query(`update musuarios set img_usr='${aes.cifrar(ruta)}' where id_usr=${user.id_usr}`,(er1,res1)=>{
                  if(!er1){
                    connection.query(`SELECT * FROM musuarios where id_usr=${user.id_usr}`,(errorq,ressq)=>{
                      if (!errorq) {
                        if (ressq.length>0) {
                          ressq[0].email_usr = aes.decifrar(ressq[0].email_usr);
                          ressq[0].img_usr = aes.decifrar(ressq[0].img_usr);
                          req.session.user = ressq[0];
                            return res.redirect('/perfil?men=Cambio de imagen exitoso');
                        }else{
                            return res.redirect('/login?men=Algo ocurrio, por favor inicia sesion');
                        }
                      }else{
                        return res.redirect('/login?men=Algo ocurrio, por favor inicia sesion');
                      }
                    });
                  }else{
                    console.log("error query" + er1);
                    return res.redirect('/perfil?men=Algo ocurrio vuelve a intentar');
                  }
                });
              }
            });
          }else{
            res.redirect('/perfil?men=La imagen debe ser formato PNG o JPG');
          }
        }
      }else{
        res.redirect('login?men=Inicia sesion')
      }
    });

    //----------------------Rutas medicos------------------------

    app.get('/Gastos',(req,res)=>{
      if (req.session.user!= null) {
        if (req.session.user.id_tid==1) {
          var tm = req.query.tm;
          if (tm==0||tm==1||tm==2||tm==3) {
            res.render('gastos',{
              user : req.session.user,
              gastos : req.session.gastos,
              tm
            });
          }else{
            res.render('gastos',{
              user : req.session.user,
              gastos : req.session.gastos,
              tm:0
            });
          }

        }else {
          res.redirect('/Home');
        }
      }else {
        res.redirect('login?men=Inicia sesion para poder continuar');
      }
    });

    app.post('/registrarHorario',(req,res)=>{
      if (req.session.user!=null) {
        if (req.session.user.id_tid==1) {
          doctores.registrarHorario(req,res);
        }else{
          res.redirect('/Home');
        }
      }else{
        res.redirect('/login');
        res.end();
      }
    });

    app.post('/editarHorario',(req,res)=>{
      if (req.session.user!=null) {
        if (req.session.user.id_tid==1) {
          doctores.editarHorario(req,res);
        }else{
          res.redirect('/Home');
        }
      }else{
        res.redirect('/login');
        res.end();
      }
    });

    app.get('/pacientes',(req,res)=>{
        if (req.session.user!= null) {
            let userobj = req.session.user;
            if (userobj.id_tid==1) {
                res.render("pacientes",{
                    user:userobj,
                    pacientes: req.session.pacientes,
                    citas: req.session.citas
                });
            }else{
                res.redirect("/Home");
            }
        }else{
            res.writeHead(301,{'Location':'login'});
            res.end();
        }
    });

    app.get('/paciente',(req,res)=>{
      if (req.session.user!= null) {
        if (req.session.user.id_tid==1) {
          let pac = req.query.p;
          let men = req.query.men;
          let cont = false;
          for (var i = 0; i < req.session.pacientes.length; i++) {
            if (req.session.pacientes[i].id_pac==parseInt(pac)){
              cont = true;
            }
          }
          if (cont) {
            doctores.obtenerPacienteById(pac,function(p){
              let paciente = p;
              doctores.obtenerCitas(req.session.user.id_usr,function(citas){
                req.session.citas = citas;
                paciente.push(req.session.citas);
                res.render("paciente",{
                  user:req.session.user,
                paciente : paciente,
                mensaje:men
                });
              });
            });
          }else{
              res.redirect("/pacientes");
              res.end();
          }
        }else {
          res.redirect("/Home");
          res.end();
        }
      }else{
        res.redirect("/login");
        res.end();
      }
    });

    app.get('/chat/:value', function (req,res){
      /*if(req.session.user!=null){
        if(req.session.user.id_tid==2){
          console.log(req.session.user);
          pacientes.obtenerPacienteById(req.session.user.id_usr,(respuesta)=>{
            //var id_pac = respuesta[0].id_pac;
            //var id_med = res.query.id_med;
            //if(typeof id_med ==! "undefined"){

            //}
          });
        }else{
          paci
        }
      }else{
        res.redirect("/login");
      }
        res.render('chat',{
          user : req.session.user
        });*/

    });

    app.get('/citas',(req,res)=>{
      if (req.session.user!= null) {
          let userobj = req.session.user;
          if (userobj.id_tid==1) {
              doctores.obtenerPacientes(userobj.id_usr,function(pac){
                  req.session.pacientes = pac;
                  doctores.obtenerCitas(userobj.id_usr,function(citas){
                    req.session.citas = citas;
                    res.render("citas",{
                        user:userobj,
                        pacientes:req.session.pacientes,
                        citas: req.session.citas
                    });
                  });
              });
          }else{
              res.redirect("/Home");
          }

      }else{
          res.writeHead(301,{'Location':'login'});
          res.end();
      }
    });

    app.get('/cita',(req,res)=>{
      var id = req.query.c;
      if (req.session.user!=null) {
        if (id.length>32 && id.length<210) {
          var c = id.substring(50);
          var citas = req.session.citas;
          var ct;
          var com = false;
          for (var i = 0; i < citas.length; i++) {
            if (citas[i].id_cit==c) {
              com = true;
              ct = citas[i];
            }
          }
          if (!com) {
            res.redirect("/citas");
          }else{
            res.render('cita',{
              user:req.session.user,
              cita : ct,
              pacientes:req.session.pacientes
            });
          }
        }else{
          console.log("my¿yt largo  " + id.length);
          res.redirect("/citas");
          res.end();
        }
      }else{
        res.redirect("/login");
        res.end();
      }
    });

    app.post('/agendarCita',(req,res)=>{
        if (req.session.user!= null) {
          if (req.session.user.id_tid==2) {
            const { id } = req.body;
            const { fe } = req.body;
            const { ho } = req.body;
            var num = /^([0-9])+$/;
            if (typeof id !== "undefined") {
              if(num.test(id)){
                var vadFech = /^(?:(?:(?:0?[1-9]|1\d|2[0-8])[-](?:0?[1-9]|1[0-2])|(?:29|30)[-](?:0?[13-9]|1[0-2])|31[-](?:0?[13578]|1[02]))[-](?:0{2,3}[1-9]|0{1,2}[1-9]\d|0?[1-9]\d{2}|[1-9]\d{3})|29[-]0?2[-](?:\d{1,2}(?:0[48]|[2468][048]|[13579][26])|(?:0?[48]|[13579][26]|[2468][048])00))$/;
                var fec = fe;
                let hv = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
                let hora = ho;
                var str = '';
                var ref = 'abcdefghijklmnñopqrstuvwxyz1234567890{}´+,-()!°|%¨*[]_:;';
                for (var i=0; i<550; i++){
                  str += ref.charAt(Math.floor(Math.random()*ref.length));
                }
                console.log(fe + "   "+ ho  );
                if (vadFech.test(fec)) {
                  if (hv.test(hora)) {
                    pacientes.obtenerMedicoById(id,(citas)=>{
                      var verificador = true;
                      for(var i = 0;i<citas[1].length;i++){
                        console.log( "cita   " + citas[1][i]);
                        var fecha1 = citas[1][i].dat_cit.split('-');
              					var fecha2 = fec.split('-');
              					if(hora==citas[1][i].hor_cit&&((new Date(fecha1[2],(fecha1[1]-1),fecha1[0])).getTime())==((new Date(fecha2[2],(fecha2[1]-1),fecha2[0])).getTime())) {
              						verificador = false;
              					}
                      }
                      if(verificador){
                        if ((new Date(fec).getTime)>= (new Date()).getTime) {
                          connection.query('SELECT * FROM mpacientes where id_usr='+req.session.user.id_usr,(err,result)=>{
                            if (!err) {
                              if (result.length>0) {
                                connection.query("INSERT INTO mcitas (id_pac, id_med, dat_cit, hor_cit, id_tip) values ("+result[0].id_pac+","+id+" , '"+aes.cifrar(fec)+"', '"+aes.cifrar(hora)+"', 2)",(er,ress)=>{
                                  if (!er) {
                                    res.redirect("agendarCita?i="+str+id+"&men=Cita registrada exitosamente");
                                    res.end();
                                  }else{
                                    res.redirect("agendarCita?i="+str+id+"&men=Algo ha ocurrido");
                                    res.end();
                                  }
                                });
                              }else{
                                res.redirect("/Home");
                                res.end();
                              }
                            }else{
                              res.redirect("/Home");
                              res.end();
                            }
                          });
                        }else {
                          res.redirect("agendarCita?i="+str+id+"&men=La fecha ya ha pasado");
                          res.end();
                        }
                      }else{
                        res.redirect("agendarCita?i="+str+id+"&men=El horario esta ocupado");
                        res.end();
                      }
                    });
                  }else{
                    res.redirect("agendarCita?i="+str+id+"&men=La fecha no es valida");
                    res.end();
                  }
                }else{
                  res.redirect("agendarCita?i="+str+id+"&men=La fecha no es valida");
                  res.end();
                }
              }else{
                console.log("Id no numero");
                res.redirect("/Home");
                res.end();
              }
            }else{
              console.log("no id");
              res.redirect("/Home");
              res.end();
            }
          }else {
            console.log("Es medico");
            res.redirect("/Home");
            res.end();
          }
        }else{
          res.redirect("/login");
          res.end();
        }

    });

    app.get('/agendarCita',(req,res)=>{
      if (req.session.user!=null) {
        if (req.session.user.id_tid==2) {
          if (typeof req.query.i!== "undefined") {
            var id_med = req.query.i.substring(req.query.i.length-1,req.query.i.length);
            pacientes.obtenerPacienteById(req.session.user.id_usr,function(paciente){
              pacientes.obtenerMedicoById(id_med,function(citas){
                pacientes.obtenerHorario(id_med,function(horario){
                  if (typeof req.query.s !== "undefined") {
                    if (parseInt(req.query.s)==2 || parseInt(req.query.s) == 3) {
                      res.render('agendarCita',{
                        user: req.session.user,
                        medico: citas[0],
                        citas: citas[1],
                        paciente: paciente[0],
                        horario,
                        se : parseInt(req.query.s),
                        mensaje : req.query.men
                      });
                    }else{
                      res.render('agendarCita',{
                        user: req.session.user,
                        medico: citas[0],
                        citas: citas[1],
                        paciente: paciente[0],
                        horario,
                        se : 1,
                        mensaje : req.query.men
                      });
                    }
                  }else{
                    res.render('agendarCita',{
                      user: req.session.user,
                      medico: citas[0],
                      citas: citas[1],
                      paciente: paciente[0],
                      horario,
                      se : 1,
                      mensaje : req.query.men
                    });
                  }
                });
              });
            });
          }else{
            console.log(req.query.i);
            res.redirect('Home');
            res.end();
          }
        }else{
          res.redirect('/Home');
        }
      }else {
        res.redirect('login');
      }
    });

    app.get('/perfil',(req,res)=>{
      if (req.session.user!= null) {
        var men = req.query.men;
        res.render('perfil',{
          user : req.session.user,
          mensaje : men
        });
      }else{
        res.redirect('login');
      }
    });

    app.get('/guardarHistoria',(req,res)=>{
      var str = req._parsedUrl.query;
      str =str.replace(/%22/gi, " ");
      str =str.replace(/_/gi, '"');
      var historia = JSON.parse(str);

      res.json({mensaje:'Funciono',tipo:'success'});
      res.end();
    });

}
