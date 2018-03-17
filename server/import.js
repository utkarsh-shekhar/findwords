const mongoose = require('mongoose');
const utils = require("./utils");

var dbURI = 'mongodb://localhost/findwords'; 
var connection = mongoose.connect(dbURI);

const onConnection = async function () {  
	const grid = mongoose.model('Grid', { grid: Object, word_list: Object, count: String });
	for (let i = 0; i < 10000; i++)  {
		const g = new grid(utils.generateGrid());
		await g.save();
	}
	mongoose.connection.close();
}
mongoose.connection.on('connected', onConnection); 

mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 

mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});