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
                    console.log("Entro");
                    
                    req.session.pacientes = pac;
                    res.render("Home",{
                        user:userobj,
                        pacientes:req.session.pacientes
                    });
                });
            }else{
                pacientes.obtenerDoctores(userobj.id_usr,function(doctores){
                  req.session.doctor = doctores;
                  pacientes.obtenerRangos(userobj.id_usr,function(rangos){
                    req.session.rangos = rangos;
                    res.render("Home-Paciente",{
                        user:userobj,
                        doctores: req.session.doctor,
                        rangos: req.session.rangos
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
            res.redirect("Home");
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
            res.redirect("Home");
        }
    });


    //----------------------Sesiones------------------------
    app.get('/contacto',(req,res)=>{
        res.render("contacto");
    });

    app.get('/login',(req,res)=>{
        if (req.session.user!= null) {
            res.redirect('Home');
            res.end();
        }else{
            res.render('login');
        }
    });

    app.post('/login',(req,res)=>{
        if (req.session.user!= null) {
            res.render('Home');
            res.end();
        }else{
            modulos.login(req,res);
        }
    });

    app.get('/registro',(req,res)=>{
        if (req.session.user!= null) {
            res.render('Home');
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
            res.render('Home');
            res.end();
        }else{
            modulos.agregarUsuario(req,res);
        }
    });

    app.get('/salir',(req,res)=>{
        console.log("Salir");

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
                    pacientes: req.session.pacientes
                });   
            }else{
                res.redirect("/Home");
            }
        }else{
            res.writeHead(301,{'Location':'login'});
            res.end();
        }
    });

}
