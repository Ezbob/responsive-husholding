const express = require("express");
var fs = require('fs');
var path = require('path');

const app = express();

app.set('root_path', path.resolve(__dirname));
app.set('views_path', path.join(app.get('root_path'), 'views'));
app.use('/static', express.static('assets'));


app.get('/', function(req, res) {

	res.sendFile(path.join( app.get('views_path'), 'index.html'));
});

app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500).send("<h1>Sweet burn!!</h1>");
});

app.listen(8080, function() {
	console.log("Listening on port 8080");
});

