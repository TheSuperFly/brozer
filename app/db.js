const cli = require('cli');
const mongoose = require('mongoose');

const dbURI = 'mongodb://localhost/yours';

mongoose.connect(dbURI); 
mongoose.Promise = global.Promise;

mongoose.connection.on('connected', function () {  
  cli.ok('Mongoose default connection open to ' + dbURI);
}); 

mongoose.connection.on('error',function (err) {  
  cli.error('Mongoose default connection error: ' + err);
});

process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    cli.info('Mongoose default connection disconnected through app termination'); 
    process.exit(0);
  }); 
}); 
