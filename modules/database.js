
module.exports = function(app) {

	const knex = require('knex')({
		client: 'sqlite3',
		connection: {
			filename: app.get('database')
		}
	});

	// creates the grosseries table
	knex.schema.createTableIfNotExists('grosseries', function(table) {
		table.increments();
		table.string('product_name');
		table.string('bought_by');
		table.integer('quantity_bought');
		table.dateTime('expires');
		table.decimal('prize_per_good');
		table.timestamps(); 
	}).catch((err) => {
		console.error(err);
	});

	return knex;
};
