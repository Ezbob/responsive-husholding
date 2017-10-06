const express = require("express");
var fs = require('fs');

const app = express();

app.get('/', function(req, res) {
	if (req.method === 'GET') {
        fs.readFile("index.html", function( err, data ) {
            res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                res.end();
        });
    } else {
    	console.log("I'm not implemented.");
    }
});



app.listen(8080, function() {
	console.log("Listening on port 8080");
});

