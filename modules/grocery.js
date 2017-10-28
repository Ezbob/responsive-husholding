
module.exports = function(app) {
	
	const knex = require("./database")(app);
	const joi = require("joi");

	app.route('/grocerylist/')
		.get((req, res) => {
			res.render("index")
		})
		.put((req, res) => {
			var is_successful = true;
			// create a item (let the database sort out the id)
			const schema = joi.array().items(
				joi.object().keys({
					"product_name": joi.string().min(1),
					"amount": joi.number().integer(),
					"shared": joi.boolean(),
					"last_good": joi.date().valid(null)
				})
			);
			var result = joi.validate(req.body, schema);
			 

			if ( result.error ) {
				is_successful = false;
			}

			
			res.send({"success": is_successful});
		});	

	app.route('/grocerylist/:itemId')
		.get((req, res) => {
			// get a specific item with id
		})
		.put((req, res) => {
			// update a specific item
		})
		.delete((req, res) => {
			// delete a specific item
		})

}



