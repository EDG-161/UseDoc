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
    app.get('/add-note', (req, res) => {
        res.render('add-note');
    });
    app.get('/edit-note/:id_pac', (req, res) => {
        const { id_pac } = req.params;
        connection.query('SELECT * FROM Paciente WHERE ?', { id_pac: id_pac }, (err, result) => {
            res.render('edit-note', { result });
        });
    });

    app.post('/add-note', (req, res) => {
        
        modulos.agregar(req,res);
    });
    app.post('/edit-note/:id_pac', (req, res) => {
        const { id_pac } = req.params;
        
        modulos.editar(req,res,id_pac);
    });
    app.post('/delete-note', (req, res) => {
        modulos.eliminar(req,res);
    });
    app.get('/login',(req,res)=>{
        res.render('login');
    });
    
    app.get('/registro',(req,res)=>{
        connection.query('SELECT * FROM cestado',(err,result)=>{
            res.render('registro',{result});
        });
    });
    
    app.post('/registro',(req,res)=>{
        modulos.agregarUsuario(req,res);
    });


}