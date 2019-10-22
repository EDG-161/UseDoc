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
        if (req.session.user) {
            let userobj = req.session.user;
            if (userobj.id_tip==1) {
                res.render("Home",{user:userobj});    
            }else{
                res.render("Home-Paciente",{user:userobj});
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