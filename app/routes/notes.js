const dbConnection = require('../../config/dbconnection');

var modulos =  require('./Metodos');

module.exports = app => {
    const connection = dbConnection();
    app.get('/', (req, res) => {
        modulos.obtener(req,res);
    });
    app.get('/index', (req, res) => {
        modulos.obtener(req,res);
    });
    app.get('/main-page', (req, res) => {
        modulos.obtener(req,res);
    });

    app.get('/Home',(req,res)=>{
        res.render("Home");
    })
    
    app.get('/login',(req,res)=>{
        if (req.session.user) {
            console.log("con sesion iniciada");
            res.render('Home');
            res.end();
        }else{
        res.render('login');
        }
    });

    app.post('/login',(req,res)=>{
        if (req.session.user) {
            console.log("con sesion iniciada");
            res.render('Home');
            res.end();
        }else{
            console.log("iniciar sesion ");
            modulos.login(req,res);
        }
    });
    
    app.get('/registro',(req,res)=>{
        if (req.session.user) {
            console.log("con sesion iniciada");
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
            console.log("con sesion iniciada");
            res.render('Home');
            res.end();
        }else{
            modulos.agregarUsuario(req,res);
        }
    });


}