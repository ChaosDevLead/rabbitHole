const express = require('express');
const app = express();
const router = express.Router();
const url = require('url');
const PORT = 3000;
const http = require('http');
const fs = require('fs');

app.use(express.json());

app.use('/', express.static('/assets' + '/'));
app.use('/', express.static('./views' + '/'));
app.use('/', express.static('./assets/images' + '/'));
app.use('/', express.static('/assets/js' + '/'));
app.use('/', express.static('/assets/css' + '/'));

app.listen(PORT, () => {
	console.log('app is listening at port 3000');
});


fs.readFile('./views/index.html', function (err, html) {
	if (err) {
		throw err;
	}
	http.createServer(function(request, response) {
		response.writeHeader(200, {"Content-Type": "text/html"});
		response.write(html);
		response.end();
	}).listen(8000);
});

// define function to get the data from storage if file already saved

window.onload = function(){
	front.send('get-data', app.getPath('userData'));
}

front.on('get-data-result', function(msg){
	if(msg != "@@"){
		let data = msg.split('@');
		document.getElementById('author').innerHTML = data[0];
		document.getElementById('title').innerHTML = data[1];
		document.getElementById('text').innerHTML = data[2];
	}
})

// here define some functions to save the data into storage and get them back

function save(){
	let author = document.getElementById('author').innerHTML;
	let title = document.getElementById('title').innerHTML;
	let text = document.getElementById('text').innerHTML;
	let msg = author + "@" + title + "@" + text;
	// let make a complete string of message separated by @
	// send this msg and path where to save file to back process to save in external storage of android
	front.send('save-data',app.getPath('userData'), msg)
}

