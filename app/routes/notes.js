const dbConnection = require('../../config/dbconnection');
let pacientes = require('./pacientes');
var modulos =  require('./Metodos');

module.exports = app => {
    const connection = dbConnection();

    app.get('/', (req, res) => {
        if (req.session.user) {
            res.writeHead(301,{'Location':'Home'});
            res.end();
        }else{
        res.render('index');
        }
    });
    app.get('/index', (req, res) => {
        if (req.session.user) {
            res.writeHead(301,{'Location':'Home'});
            res.end();
        }else{
        res.render('index');
        }
    });
    app.get('/main-page', (req, res) => {
        if (req.session.user) {
            res.writeHead(301,{'Location':'Home'});
            res.end();
        }else{
        res.render('index');
        }
    });

    app.get('/Home',(req,res)=>{
        if (req.session.user) {
            let userobj = req.session.user;
            console.log(userobj);
            if (userobj.id_tid==1) {
                res.render("Home",{user:userobj});
            }else{
                pacientes.obtenerDoctores(userobj.id_user,function(doctores){
                  req.session.doctor = doctores;
                });
                res.render("Home-Paciente",{
                  user:userobj,
                  doctores: req.session.doctor
                });
            }

        }else{
            res.writeHead(301,{'Location':'login'});
            res.end();
        }
    })

    app.get('/login',(req,res)=>{
        if (req.session.user) {
            res.render('Home');
            res.end();
        }else{
        res.render('login');
        }
    });

    app.post('/login',(req,res)=>{
        if (req.session.user) {
            res.render('Home');
            res.end();
        }else{
            modulos.login(req,res);
        }
    });

    app.get('/registro',(req,res)=>{
        if (req.session.user) {
            res.render('Home');
            res.end();
        }else{
        connection.query('SELECT * FROM cestado',(err,result)=>{
            res.render('registro',{estados:result});
        });
    }
    });

    app.post('/registro',(req,res)=>{
        if (req.session.user) {
            res.render('Home');
            res.end();
        }else{
            modulos.agregarUsuario(req,res);
        }
    });


}
