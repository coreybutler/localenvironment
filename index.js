
var fs = require('fs');
var json = require('path').join(process.cwd(),'env.json'), preload = {};

if (fs.existsSync(json)){
  var env = require(json);
  Object.keys(env).forEach(function(key){
    preload[key] = env[key];
    process.env[key] = env[key];
  });
}

module.exports = preload;
