const express = require("express");
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// setting paths and variable available from the app 
app.set('root_path', path.resolve(__dirname));
app.set('views_path', path.join(app.get('root_path'), 'views'));
app.set('database', path.join(app.get('root_path'), 'database.sqlite'));

// use the pug template engine to render views
app.set('views', app.get('views_path'));
app.set('view engine', 'pug'); 

// a Knex instance hooked up to the database
//const database = require("./modules/database.js")(app);

app.use('/static', express.static('assets'));
app.use('/static/semantic', express.static(path.join(app.get('root_path'), 'semantic')));
app.use('/static/npm', express.static(path.join(app.get('root_path'), 'node_modules')));

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const grocery = require("./modules/grocery.js")(app);

app.get('/', (req, res) => {
	res.redirect('/grocerylist');
});

app.use((req, res, next) => {
	// handles 404
	console.error("NOT FOUND " + req.method + " " + req.protocol + " " + req.url);
	res.status(404).send("<p>Not found</p>");
})

app.use((err, req, res, next) => {
	// handles 500
	console.error(err.stack);
	res.status(500).send("<h1>Sweet burn!!</h1>");
});

app.listen(8080, function() {
	console.log("Listening on port 8080");
});

