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
          let cont = false;
          for (var i = 0; i < req.session.pacientes.length; i++) {
            if (req.session.pacientes[i].id_pac==parseInt(pac)){
              cont = true;
            }
          }
          if (cont) {
            doctores.obtenerPacienteById(pac,function(p){
              let paciente = p;
              paciente.push(req.session.citas);
              console.log(paciente);
              res.render("paciente",{
              paciente : p
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

}
