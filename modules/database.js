/*
	Given a app with the database field set returns a query builder connection (knex)
*/
module.exports = function(app) {

	const knex = require('knex')({
		client: 'sqlite3',
		useNullAsDefault: true,
		connection: {
			filename: app.get('database')
		}
	});

	// creates the grosseries table
	knex.schema.createTableIfNotExists('groceries', function(table) {
		table.increments();
		table.string('product_name');
		//table.string('bought_by');
		table.integer('amount');
		table.dateTime('last_good');
		table.boolean('shared');
		//table.decimal('prize_per_good');
		table.timestamps(); 
	})
	.then(() => {
		console.log("Database schema set")
	})
	.catch((err) => {
		console.error(err);
	});

	return knex;
};
