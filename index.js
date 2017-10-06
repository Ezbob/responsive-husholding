const express = require("express");

const app = express();

app.get('/', function(req, res) {
	res.send("hello there");
});


app.listen(8080, function() {
	console.log("Listening on port 80");
});

