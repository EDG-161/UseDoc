const dbConnection = require('../../config/dbconnection');
let pacientes = require('./pacientes');
let doctores = require('./doctores');
var modulos =  require('./Metodos');

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
              if (userobj.id_tid==1) {
                  doctores.obtenerPacientes(userobj.id_usr,function(pac){
                      req.session.pacientes = pac;
                      doctores.obtenerCitas(userobj.id_usr,function(citas){
                        req.session.citas = citas;
                        res.render("Home",{
                            user:userobj,
                            pacientes:req.session.pacientes,
                            citas: req.session.citas
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
                            citas: req.session.citas
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
    })

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

    app.get('/salir',(req,res)=>{
      req.session.destroy();

      res.writeHead(301,{'Location':'index'});
      res.end();
    });


    //----------------------Rutas medicos------------------------

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

    app.get('/chat',(req,res)=>{
        res.render('chat');
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
        if (id.length>32&&id.length<210) {
          var c = id.substring(16,17);
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

    app.post('/agregarCita',(req,res)=>{
        if (req.session.user!= null) {
          if (req.session.user.id_tid==1) {
            const { id } = req.body;
            const { dat } = req.body;
            const { des } = req.body;
            const { hor } = req.body;
            var num = /^([0-9])+$/;
            console.log(id + "    " + des);
            if(num.test(id) && des.length<=300){
                var fecha = new Date(dat);
                var descripcion = des;
                console.log("entro");
                doctores.agendarCita(req,res,id,dat,des,hor);
            }else if(num.test(id) && des>300){
                res.redirect('/paciente?p='+id + '&men=La descripcion debe ser de 300 caracteres de largo o menos');
            }else{
              console.log("No entro");
                res.redirect('/pacientes');
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

    app.get('/agendarCita',(req,res)=>{
      if (req.session.user!=null) {
        if (req.session.user.id_tid==2) {
          if (typeof req.query.i!== "undefined") {
            var id_med = req.query.i.substring(req.query.i.length-1,req.query.i.length);
            pacientes.obtenerPacienteById(req.session.user.id_usr,function(paciente){
              pacientes.obtenerMedicoById(id_med,function(citas){
                res.render('agendarCita',{
                  medico: citas[0],
                  citas: citas[1],
                  paciente: paciente[0]
                });
              });
            });
          }else{
            console.log(req.query.i);
            req.end();
          }
        }else{
          res.redirect('/Home');
        }
      }else {
        res.redirect('login');
      }
    });

}
