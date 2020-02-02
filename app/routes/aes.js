var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeqn0m3l0c3';

const { generateKeyPair } = require('crypto');


function genPairKey(text,call){
  let pair = []
  generateKeyPair('rsa', {
  modulusLength: 512,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
    cipher: 'aes-256-cbc',
    passphrase: text
  }
  }, (err, publicKey, privateKey) => {
    call([publicKey,privateKey])
  });
}


function cifrar(text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}

function decifrar(text){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

function cifrarP(text,pass){
  var cipher = crypto.createCipher(algorithm,pass)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}

function decifrarP(text,pass){
  var decipher = crypto.createDecipher(algorithm,pass)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

exports.cifrar = cifrar;
exports.decifrar = decifrar;
exports.cifrarP = cifrarP;
exports.decifrarP = decifrarP;
exports.genPairKey = genPairKey;
