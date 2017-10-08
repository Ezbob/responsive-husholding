const express = require("express");
const fs = require('fs');
const path = require('path');

const app = express();

// setting paths and variable available from the app 
app.set('root_path', path.resolve(__dirname));
app.set('views_path', path.join(app.get('root_path'), 'views'));
app.set('database', path.join(app.get('root_path'), 'database.sqlite'));

// use the pug template engine to render views
app.set('views', app.get('views_path'));
app.set('view engine', 'pug'); 

// a Knex instance hooked up to the database
const database = require("./modules/database.js")(app);

app.use('/static', express.static('assets'));


app.get('/', (req, res) => {

	res.sendFile(path.join( app.get('views_path'), 'index.html'));
});

app.route('/grosslist/')
	.get((req, res) => {
		// get the whole list
	})
	.post((req, res) => {
		// create a item (let the database sort out the id)
	});

app.route('/grosslist/:itemId')
	.get((req, res) => {
		// get a specific item with id
	})
	.put((req, res) => {
		// update a specific item
	})
	.delete((req, res) => {
		// delete a specific item
	})


app.use((req, res, next) => {
	console.error("NOT FOUND " + req.method + " " + req.protocol + " " + req.url);
	res.status(404).send("<p>Not found</p>");
})

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("<h1>Sweet burn!!</h1>");
});

app.listen(8080, function() {
	console.log("Listening on port 8080");
});

