const dbConnection = require('../../config/dbconnection');
let pacientes = require('./pacientes');
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
                res.render("Home",{user:userobj});
            }else{
                pacientes.obtenerDoctores(userobj.id_usr,function(doctores){
                  req.session.doctor = doctores;
                  res.render("Home-Paciente",{
                    user:userobj,
                    doctores: req.session.doctor
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
                    res.render("agregarMedico",{
                    user:userobj
                    });
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

}
