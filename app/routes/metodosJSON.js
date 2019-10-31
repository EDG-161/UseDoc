var fs = require("fs");
const aes = require('./aes');
function metJSON(idpac,idmed,idchat,msg){
    let arch = "p"+idpac+"m"+idmed+"c"+idchat+".json";
    var obj = {
        table: []
    };
    obj.table.push({id_pac:aes.cifrar(idpac),id_med:aes.cifrar(idmed),id_ch:aes.cifrar(idchat),msg:aes.cifrar(msg)});
    var json = JSON.stringify(obj);
    fs.writeFile(arch,json,"utf-8",callback);
}

