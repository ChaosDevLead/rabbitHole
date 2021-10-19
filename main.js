import { back } from './assets/androidjs';
import { writeFile, readFile } from 'fs';
import { join } from 'path';


// define signal save-data to listen from front process
var back = require('./assets/androidjs').back;

back.on('save-data', function(filepath, msg){
	writeFile(join(filepath, 'data.txt'), msg, function(err){
		if(err) throw err;
		console.log('file saved')
	})
})

back.on('get-data', function(filepath){
	readFile(join(filepath, 'data.txt'), 'utf-8', function(err, data){
		if(err) back.send('get-data-result', '@@');
		else back.send('get-data-result', data);
	})
})

