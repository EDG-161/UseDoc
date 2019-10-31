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
exports.crearJSON = crearJSON;
exports.escribirJSON = escribirJSON;

