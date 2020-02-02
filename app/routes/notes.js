const dbConnection = require('../../config/dbconnection');
let pacientes = require('./pacientes');
let doctores = require('./doctores');
const mjson = require('./metodosJSON');
var modulos = require('./Metodos');
const aes = require('./aes');
const citas = require('./citas');

module.exports = app => {
    const connection = dbConnection();

    app.get('/', (req, res) => {
        if (req.session.user != null) {
            res.writeHead(301, { 'Location': 'Home' });
            res.end();
        } else {
            res.render('index');
        }
    });

    app.get('/salir', (req, res) => {
        console.log("----------------------------Salir------------------------------");
        req.session.user = null;
        res.redirect('index');
    });

    app.post('/enc',(req,res)=>{
        return aes.function cifrarP(req.query.text,req.query.pass);
    });

    app.post('/dec',(req,res)=>{
        return aes.function decifrarP(req.query.text,req.query.pass);
    });

    app.get('/index', (req, res) => {
        if (req.session.user != null) {
            res.writeHead(301, { 'Location': 'Home' });
            res.end();
        } else {
            res.render('index');
        }
    });

    app.get('/main-page', (req, res) => {
        if (req.session.user != null) {
            res.writeHead(301, { 'Location': 'Home' });
            res.end();
        } else {
            res.render('index');
        }
    });
    /////////////////////////////////sisi
    app.get('/aviso', (req, res) => {
        if (req.session.user != null) {
            res.writeHead(301, { 'Location': 'avisop' });
            res.end();
        } else {
            res.render('index');
        }
    });

    app.get('/Home', (req, res) => {
        try {
            if (req.session.user != null) {
                let userobj = req.session.user;

                let men = req.query.men;
                if (userobj.id_tid == 1) {
                    doctores.obtenerPacientes(userobj.id_usr, function(pac) {
                        req.session.pacientes = pac;
                        doctores.obtenerCitas(userobj.id_usr, function(citas) {
                            req.session.citas = citas;
                            doctores.obtenerHorario(userobj.id_usr, function(h) {
                                req.session.horario = h;
                                doctores.getGastos(userobj.id_usr, function(gastos) {
                                    req.session.gastos = gastos;
                                    pacientes.obtenerPerfilImg(function(img) {
                                        res.render("Home", {
                                            user: userobj,
                                            gastos,
                                            pacientes: req.session.pacientes,
                                            citas: req.session.citas,
                                            horario: h,
                                            mensaje: men,
                                            img
                                        });
                                    });
                                });
                            });
                        });
                    });
                } else {
                    pacientes.obtenerDoctores(userobj.id_usr, function(doctores) {
                        req.session.doctor = doctores;
                        pacientes.obtenerRangos(userobj.id_usr, function(rangos) {
                            req.session.rangos = rangos;
                            pacientes.obtenerCitas(userobj.id_usr, function(citas) {
                                req.session.citas = citas;
                                pacientes.obtenerPerfilImg(function(img) {
                                    res.render("Home-Paciente", {
                                        user: userobj,
                                        doctores: req.session.doctor,
                                        rangos: req.session.rangos,
                                        citas: req.session.citas,
                                        mensaje: men,
                                        img
                                    });
                                });
                            });
                        });
                    });
                }

            } else {
                res.writeHead(301, { 'Location': 'login' });
                res.end();
            }
        } catch (e) {
            console.log("-----------------------error Home ------------");
            console.log(e);
        }
    });

    app.get('/agregarMedico', (req, res) => {
        try {
            if (req.session.user != null) {
                userobj = req.session.user;
                if (userobj.id_tid == 1) {
                    res.render("agregarPaciente", {
                        user: userobj
                    });
                } else {
                    if (typeof req.session.doctor[0] === "undefined") {
                        res.render("agregarMedico", {
                            user: userobj,
                            principal: 1
                        });
                    } else {
                        res.render("agregarMedico", {
                            user: userobj,
                            principal: 2
                        });
                    }
                }

            } else {
                res.writeHead(301, { 'Location': 'login' });
                res.end();
            }
        } catch (error) {
            console.log("error agregar   " + error);
            res.redirect("/Home");
        }
    });

    app.post('/agregarMedico', (req, res) => {
        try {
            if (req.session.user != null) {
                userobj = req.session.user;
                if (userobj.id_tid == 2) {
                    modulos.setMedico(req, res);
                } else {
                    modulos.setPaciente(req, res);
                }

            } else {
                res.writeHead(301, { 'Location': 'login' });
                res.end();
            }
        } catch (error) {
            console.log("error agregar post   " + error);
            res.redirect("/Home");
        }
    });


    //----------------------Sesiones------------------------
    app.get('/contacto', (req, res) => {
        res.render("contacto");
    });

    app.get('/login', (req, res) => {
        if (req.session.user != null) {
            res.redirect('/Home');
            res.end();
        } else {
            res.render('login', {
                mensaje: req.query.men
            });
        }
    });

    app.post('/login', (req, res) => {
        if (req.session.user != null) {
            res.redirect("/Home");
            res.end();
        } else {
            modulos.login(req, res);
        }
    });

    app.get('/registro', (req, res) => {
        if (req.session.user != null) {
            res.redirect("/Home");
            res.end();
        } else {
            connection.query('SELECT * FROM cestado', (err, result) => {
                if (err) {
                    console.log(err);

                }
                res.render('registro', { estados: result });
            });
        }
    });

    app.post('/registro', (req, res) => {
        if (req.session.user != null) {
            res.redirect("/Home");
            res.end();
        } else {
            modulos.agregarUsuario(req, res);
        }
    });

    app.post('/imageProfile', (req, res) => {
        if (req.session.user != null) {
            var userobj = req.session;
            console.log(userobj);

            let imgP = req.files.file;
            console.log("Tamaño de imagen " + imgP.size);
            var exte = imgP.name.split('.').pop();
            console.log("Extencion " + exte);
            if (imgP.size > 15728640) {
                res.redirect('/perfil?men=La imagen debe pesar 15 mb o menos');
            } else {
                if (exte == "png" || exte == "jpg") {
                    var user = userobj.user;
                    console.log("user es esto : " + user);

                    var ruta = `${user.id_usr}profilePicture${user.name}.${exte}`;
                    imgP.mv(`./app/public/images/profiles/${ruta}`, err => {
                        if (err) {
                            console.log("error mv" + err);

                            return res.redirect('/perfil?men=Algo ocurrio vuelve a intentar');
                        } else {
                            connection.query(`update musuarios set img_usr='${aes.cifrar(ruta)}' where id_usr=${user.id_usr}`, (er1, res1) => {
                                if (!er1) {
                                    connection.query(`SELECT * FROM musuarios where id_usr=${user.id_usr}`, (errorq, ressq) => {
                                        if (!errorq) {
                                            if (ressq.length > 0) {
                                                ressq[0].email_usr = aes.decifrar(ressq[0].email_usr);
                                                ressq[0].img_usr = aes.decifrar(ressq[0].img_usr);
                                                req.session.user = ressq[0];
                                                return res.redirect('/perfil?men=Cambio de imagen exitoso');
                                            } else {
                                                return res.redirect('/login?men=Algo ocurrio, por favor inicia sesion');
                                            }
                                        } else {
                                            return res.redirect('/login?men=Algo ocurrio, por favor inicia sesion');
                                        }
                                    });
                                } else {
                                    console.log("error query" + er1);
                                    return res.redirect('/perfil?men=Algo ocurrio vuelve a intentar');
                                }
                            });
                        }
                    });
                } else {
                    res.redirect('/perfil?men=La imagen debe ser formato PNG o JPG');
                }
            }
        } else {
            res.redirect('login?men=Inicia sesion')
        }
    });

    //----------------------Rutas medicos------------------------

    app.get('/Gastos', (req, res) => {
        if (req.session.user != null) {
            if (req.session.user.id_tid == 1) {
                var tm = req.query.tm;
                if (tm == 0 || tm == 1 || tm == 2 || tm == 3) {
                    res.render('gastos', {
                        user: req.session.user,
                        gastos: req.session.gastos,
                        tm
                    });
                } else {
                    res.render('gastos', {
                        user: req.session.user,
                        gastos: req.session.gastos,
                        tm: 0
                    });
                }

            } else {
                res.redirect('/Home');
            }
        } else {
            res.redirect('login?men=Inicia sesion para poder continuar');
        }
    });

    app.post('/registrarHorario', (req, res) => {
        if (req.session.user != null) {
            if (req.session.user.id_tid == 1) {
                doctores.registrarHorario(req, res);
            } else {
                res.redirect('/Home');
            }
        } else {
            res.redirect('/login');
            res.end();
        }
    });

    app.post('/editarHorario', (req, res) => {
        if (req.session.user != null) {
            if (req.session.user.id_tid == 1) {
                doctores.editarHorario(req, res);
            } else {
                res.redirect('/Home');
            }
        } else {
            res.redirect('/login');
            res.end();
        }
    });

    app.get('/pacientes', (req, res) => {
        if (req.session.user != null) {
            let userobj = req.session.user;
            if (userobj.id_tid == 1) {
                res.render("pacientes", {
                    user: userobj,
                    pacientes: req.session.pacientes,
                    citas: req.session.citas
                });
            } else {
                res.redirect("/Home");
            }
        } else {
            res.writeHead(301, { 'Location': 'login' });
            res.end();
        }
    });

    app.get('/paciente', (req, res) => {
        if (req.session.user != null) {
            if (req.session.user.id_tid == 1) {
                let pac = req.query.p;
                let men = req.query.men;
                let cont = false;
                for (var i = 0; i < req.session.pacientes.length; i++) {
                    if (req.session.pacientes[i].id_pac == parseInt(pac)) {
                        cont = true;
                    }
                }
                if (cont) {
                    doctores.obtenerPacienteById(pac, function(p) {
                        let paciente = p;
                        doctores.obtenerCitas(req.session.user.id_usr, function(citas) {
                            req.session.citas = citas;
                            paciente.push(req.session.citas);
                            res.render("paciente", {
                                user: req.session.user,
                                paciente: paciente,
                                mensaje: men
                            });
                        });
                    });
                } else {
                    res.redirect("/pacientes");
                    res.end();
                }
            } else {
                res.redirect("/Home");
                res.end();
            }
        } else {
            res.redirect("/login");
            res.end();
        }
    });

    app.get('/chat', function(req, res) {
        if (req.session.user != null) {
            if (req.session.user.id_tid == 2) {
                pacientes.obtenerPacienteById(req.session.user.id_usr, (respuesta) => {
                    pacientes.obtenerDoctores(req.session.user.id_usr, (doctores) => {
                        pacientes.obtenerPerfilImg((img) => {
                            res.render('chat', {
                                user: req.session.user,
                                contactos: doctores,
                                img
                            });
                        });
                    });
                });
            } else {
                doctores.obtenerPacientes(req.session.user.id_usr, (respuesta) => {
                    pacientes.obtenerPerfilImg((img) => {
                        res.render('chat', {
                            user: req.session.user,
                            contactos: respuesta,
                            img
                        });
                    });
                });
            }
        } else {
            res.redirect("/login");
        }
    });

    app.get('/citas', (req, res) => {
        if (req.session.user != null) {
            let userobj = req.session.user;
            if (userobj.id_tid == 1) {
                doctores.obtenerPacientes(userobj.id_usr, function(pac) {
                    req.session.pacientes = pac;
                    doctores.obtenerCitas(userobj.id_usr, function(citas) {
                        req.session.citas = citas;
                        res.render("citas", {
                            user: userobj,
                            pacientes: req.session.pacientes,
                            citas: req.session.citas
                        });
                    });
                });
            } else {
                res.redirect("/Home");
            }

        } else {
            res.writeHead(301, { 'Location': 'login' });
            res.end();
        }
    });

    app.get('/cita', (req, res) => {
        var id = req.query.c;
        if (req.session.user != null) {
            if (req.session.user.id_tid == 1) {
                if (id.length > 32 && id.length < 210) {
                    var c = id.substring(50);
                    var citas = req.session.citas;
                    var ct;
                    var com = false;
                    for (var i = 0; i < citas.length; i++) {
                        if (citas[i].id_cit == c) {
                            com = true;
                            ct = citas[i];
                        }
                    }
                    if (!com) {
                        res.redirect("/citas");
                    } else {
                        var paciente;
                        for (var i = 0; i < req.session.pacientes.length; i++) {
                            if (req.session.pacientes[i].id_pac == ct.id_pac) {
                                paciente = req.session.pacientes[i];
                            }
                        }
                        var name = "hta_" + paciente.id_pac;
                        var pass = `${name}cas31${name}19562348451asdfbkhjb`;
                        mjson.leerHistorial(name, pass, function(historial) {
                            res.render('cita', {
                                user: req.session.user,
                                cita: ct,
                                pacientes: req.session.pacientes,
                                paciente: paciente,
                                historial
                            });
                        });
                    }
                } else {
                    console.log("my¿yt largo  " + id.length);
                    res.redirect("/citas");
                    res.end();
                }
            } else {
                if (id.length > 32 && id.length < 210) {
                    var c = id.substring(50);
                    var citas = req.session.citas;
                    var ct;
                    var com = false;
                    for (var i = 0; i < citas.length; i++) {
                        if (citas[i].id_cit == c) {
                            com = true;
                            ct = citas[i];
                        }
                    }
                    if (!com) {
                        res.redirect("/citas");
                    } else {
                        var paciente;
                        for (var i = 0; i < req.session.doctor.length; i++) {
                            if (req.session.doctor[i].id_med == ct.id_med) {
                                paciente = req.session.doctor[i];
                            }
                        }
                        var name = "hta_" + paciente.id_pac;
                        var pass = `${name}cas31${name}19562348451asdfbkhjb`;
                        mjson.leerHistorial(name, pass, function(historial) {
                            pacientes.obtenerPacienteById(req.session.user.id_usr, function(pac) {

                                res.render('cita_paciente', {
                                    user: req.session.user,
                                    cita: ct,
                                    pacientes: req.session.doctor,
                                    paciente: pac,
                                    historial
                                });
                            })
                        });
                    }
                } else {
                    console.log("my¿yt largo  " + id.length);
                    res.redirect("/citas");
                    res.end();
                }
            }
        } else {
            res.redirect("/login");
            res.end();
        }
    });

    app.post('/agendarCita', (req, res) => {
        if (req.session.user != null) {
            if (req.session.user.id_tid == 2) {
                const { id } = req.body;
                const { fe } = req.body;
                const { ho } = req.body;
                var num = /^([0-9])+$/;
                if (typeof id !== "undefined") {
                    if (num.test(id)) {
                        var vadFech = /^(?:(?:(?:0?[1-9]|1\d|2[0-8])[-](?:0?[1-9]|1[0-2])|(?:29|30)[-](?:0?[13-9]|1[0-2])|31[-](?:0?[13578]|1[02]))[-](?:0{2,3}[1-9]|0{1,2}[1-9]\d|0?[1-9]\d{2}|[1-9]\d{3})|29[-]0?2[-](?:\d{1,2}(?:0[48]|[2468][048]|[13579][26])|(?:0?[48]|[13579][26]|[2468][048])00))$/;
                        var fec = fe;
                        let hv = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
                        let hora = ho;
                        var str = '';
                        var ref = 'abcdefghijklmnñopqrstuvwxyz1234567890{}´+,-()!°|%¨*[]_:;';
                        for (var i = 0; i < 550; i++) {
                            str += ref.charAt(Math.floor(Math.random() * ref.length));
                        }
                        console.log(fe + "   " + ho);
                        if (vadFech.test(fec)) {
                            if (hv.test(hora)) {
                                pacientes.obtenerMedicoById(id, (citas) => {
                                    var verificador = true;
                                    for (var i = 0; i < citas[1].length; i++) {
                                        console.log("cita   " + citas[1][i]);
                                        var fecha1 = citas[1][i].dat_cit.split('-');
                                        var fecha2 = fec.split('-');
                                        if (hora == citas[1][i].hor_cit && ((new Date(fecha1[2], (fecha1[1] - 1), fecha1[0])).getTime()) == ((new Date(fecha2[2], (fecha2[1] - 1), fecha2[0])).getTime())) {
                                            verificador = false;
                                        }
                                    }
                                    if (verificador) {
                                        if ((new Date(fec).getTime) >= (new Date()).getTime) {
                                            connection.query('SELECT * FROM mpacientes where id_usr=' + req.session.user.id_usr, (err, result) => {
                                                if (!err) {
                                                    if (result.length > 0) {
                                                        connection.query("INSERT INTO mcitas (id_pac, id_med, dat_cit, hor_cit, id_tip) values (" + result[0].id_pac + "," + id + " , '" + aes.cifrar(fec) + "', '" + aes.cifrar(hora) + "', 2)", (er, ress) => {
                                                            if (!er) {
                                                                res.redirect("agendarCita?i=" + str + id + "&men=Cita registrada exitosamente");
                                                                res.end();
                                                            } else {
                                                                res.redirect("agendarCita?i=" + str + id + "&men=Algo ha ocurrido");
                                                                res.end();
                                                            }
                                                        });
                                                    } else {
                                                        res.redirect("/Home");
                                                        res.end();
                                                    }
                                                } else {
                                                    res.redirect("/Home");
                                                    res.end();
                                                }
                                            });
                                        } else {
                                            res.redirect("agendarCita?i=" + str + id + "&men=La fecha ya ha pasado");
                                            res.end();
                                        }
                                    } else {
                                        res.redirect("agendarCita?i=" + str + id + "&men=El horario esta ocupado");
                                        res.end();
                                    }
                                });
                            } else {
                                res.redirect("agendarCita?i=" + str + id + "&men=La fecha no es valida");
                                res.end();
                            }
                        } else {
                            res.redirect("agendarCita?i=" + str + id + "&men=La fecha no es valida");
                            res.end();
                        }
                    } else {
                        console.log("Id no numero");
                        res.redirect("/Home");
                        res.end();
                    }
                } else {
                    console.log("no id");
                    res.redirect("/Home");
                    res.end();
                }
            } else {
                console.log("Es medico");
                res.redirect("/Home");
                res.end();
            }
        } else {
            res.redirect("/login");
            res.end();
        }

    });
    app.get('/rec_contra', (req, res) => {
        if (req.session.user!= null) {
            res.writeHead(301,{'Location':'Home'});
            res.end();
        }else{
        res.render('rec_contra');
        }
      });
      app.post('/rec_contra',(req,res)=>{
        if (req.session.user!=null) {
          res.redirect('/Home');
        }else{
          modulos.recuperar(req,res);
        }
      });

    app.get('/agendarCita', (req, res) => {
        if (req.session.user != null) {
            if (req.session.user.id_tid == 2) {
                if (typeof req.query.i !== "undefined") {
                    var id_med = req.query.i.substring(req.query.i.length - 1, req.query.i.length);
                    pacientes.obtenerPacienteById(req.session.user.id_usr, function(paciente) {
                        pacientes.obtenerMedicoById(id_med, function(citas) {
                            pacientes.obtenerHorario(id_med, function(horario) {
                                if (typeof req.query.s !== "undefined") {
                                    if (parseInt(req.query.s) == 2 || parseInt(req.query.s) == 3) {
                                        res.render('agendarCita', {
                                            user: req.session.user,
                                            medico: citas[0],
                                            citas: citas[1],
                                            paciente: paciente[0],
                                            horario,
                                            se: parseInt(req.query.s),
                                            mensaje: req.query.men
                                        });
                                    } else {
                                        res.render('agendarCita', {
                                            user: req.session.user,
                                            medico: citas[0],
                                            citas: citas[1],
                                            paciente: paciente[0],
                                            horario,
                                            se: 1,
                                            mensaje: req.query.men
                                        });
                                    }
                                } else {
                                    res.render('agendarCita', {
                                        user: req.session.user,
                                        medico: citas[0],
                                        citas: citas[1],
                                        paciente: paciente[0],
                                        horario,
                                        se: 1,
                                        mensaje: req.query.men
                                    });
                                }
                            });
                        });
                    });
                } else {
                    console.log(req.query.i);
                    res.redirect('Home');
                    res.end();
                }
            } else {
                res.redirect('/Home');
            }
        } else {
            res.redirect('login');
        }
    });

    app.get('/perfil', (req, res) => {
        if (req.session.user != null) {
            var men = req.query.men;
            modulos.obtenerDatos(req.session.user.id_usr, (datos) => {

                res.render('perfil', {
                    user: req.session.user,
                    mensaje: men,
                    datos
                });
            });
        } else {
            res.redirect('login');
        }
    });

    app.post('/guardarDatos', (req, res) => {
        if (req.session.user != null) {
            modulos.guardarDatos(req, res);
        } else {
            res.redirect('/login?men =Tu sesion ha caducado')
        }
    });

    app.get('/guardarHistoria', (req, res) => {
        if (req.session.user != null) {
            var str = req._parsedUrl.query;
            str = str.replace(/%22/gi, " ");
            str = str.replace(/%20/gi, " ");
            str = str.replace(/`/gi, '"');
            console.log(str);
            var historia = JSON.parse(str);

            citas.guardarHistorial(historia, req, function(mensaje, tm) {
                res.json({ mensaje: mensaje, tipo: tm });
                res.end();
            });
        } else {
            res.json({ mensaje: "Tu sesion a caducado recarga la pagina", tipo: "Error" });
            res.end();
        }
    });

    app.get('/HistorialMedico', (req, res) => {
        if (req.session.user != null) {
            if (req.session.user.id_tid == 2) {
                pacientes.obtenerPacienteById(req.session.user.id_usr, function(pac) {
                    var name = "hta_" + pac[0].id_pac;
                    var pass = `${name}cas31${name}19562348451asdfbkhjb`
                    mjson.leerHistorial(name, pass, function(historia) {
                        res.render('Historialmedico', {
                            user: req.session.user,
                            paciente: pac[0],
                            historia
                        });
                    });
                });
            } else {
                res.redirect('/Home');
            }
        } else {
            res.redirect('login?men=Tu sesion ha caducado, inicia sesion')
        }
    });

}