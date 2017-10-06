const express = require("express");

const app = express();

app.get('/', function(req, res) {
	res.send("hello there");
});


app.listen(8080, function() {
	console.log("Listen on port 80");
});

