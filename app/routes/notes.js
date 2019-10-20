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
    
    app.get('/login',(req,res)=>{
        res.render('login');
    });
    
    app.get('/registro',(req,res)=>{
        connection.query('SELECT * FROM cestado',(err,result)=>{
            res.render('registro',{estados:result});
        });
    });
    
    app.post('/registro',(req,res)=>{
        console.log('--------------Registro------------------')
        modulos.agregarUsuario(req,res);
    });


}