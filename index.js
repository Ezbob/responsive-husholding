const express = require("express");
var fs = require('fs');

const app = express();


app.use('/static', express.static('assets'));


app.get('/', function(req, res) {
	fs.readFile("views/index.html", function( err, data ) {
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(data);
		res.end();
	});
});



app.listen(8080, function() {
	console.log("Listening on port 8080");
});

