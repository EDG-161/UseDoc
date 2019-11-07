var fs = require("fs");
const aes = require("./aes");
var path = require("path");
function crearJSON(idpac,idmed,idchat){
    let arch = "p"+idpac+"m"+idmed+"c"+idchat+".json";
    var obj = {
        table: []
    };
    obj.table.push({id_pac:aes.cifrar(idpac),id_med:aes.cifrar(idmed),id_ch:aes.cifrar(idchat)});
    var json = JSON.stringify(obj);
    fs.writeFile(arch,json,"utf-8",callback);
}
function escribirJSON(idpac,idmed,idchat,tipusr, msg){
    let arch = "p"+idpac+"m"+idmed+"c"+idchat+".json";
    if(!path.exists(arch)){
        crearJSON(idpac,idmed,idchat);
    }else{
        var obj = {
        table:[]
        };
        obj.table.push({tip_user:aes.cifrar(tipusr),msg:aes.cifrar(msg)});
        fs.writeFile(arch,json,"utf-8",callback);
    }
    
}
function verify(req,res){
    let tipo = req.session.user.id_tid;
	let id1,id2,idc;
	if(tipo == 1){
        document.get
		id2 = req.session.user.id_usr;
		connection.query("SELECT id_pm WHERE id_med = "+id2+" AND id_pac="+id1+"", (err,result)=>{
			if(!err){
				idc = result;
			}else{
				console.log("Error: "+err);
			}
        });
        let arch = "p"+id1+"m"+id2+"c"+idc+".json";
        if(!path.exists(arch)){
            crearJSON(id1,id2,idc);
            res.redirect("/chat");
        }else{
            res.redirect("/chat");
        }
		
	}else{
		id1 = req.session.user.id_user;
		connection.query("SELECT id_pm WHERE id_med = "+id2+" AND id_pac="+id1+"", (err,result)=>{
			if(!err){
				idc = result;
			}else{
				console.log("Error: "+err);
			}
		});
		enviarmsg(id1,id2,idc,tipo,msg);
	}

}
exports.crearJSON = crearJSON;
exports.escribirJSON = escribirJSON;

