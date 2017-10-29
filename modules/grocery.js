
module.exports = function(app) {
  
  const knex = require("./database")(app);
  const joi = require("joi");

  app.route('/grocerylist/')
    .get((req, res) => {
      if (req.xhr) {
        knex.select().from('groceries')
          .then(function(data) {
            res.send({"success": true, "data": data})
          }).catch(function() {
            res.send({"success": false, "error": "database error"})
          });
      } else {
        res.render("index") 
      }
    })
    .put((req, res) => {
      var is_successful = true;
      // create a item (let the database sort out the id)
      const schema = joi.object()
        .keys({
          "product_name": joi.string().min(1),
          "amount": joi.number().integer().min(0),
          "shared": joi.boolean(),
          "last_good": joi.date().valid(null)
        });
      var result = joi.validate(req.body, schema);


      if ( result.error ) {
        res.send({"success": false, "error": "validation error"});
      } else {
        knex('groceries').insert(req.body)
        .then(function(id) {
          res.send({"success": true, "data": id});
        })
        .catch(function(err) {
          console.error(err)
          res.send({"success": false, "error": "database error"})
        });
      }
      
    })

    app.route('/grocerylist/:id').delete((req, res) => {
      const schema = joi.object()
        .keys({
          id: joi.number().integer() 
        })

      var params = {
        id: parseInt(req.params.id)
      }

      var result = joi.validate(params, schema);

      if ( result.error ) {
        res.send({ "success": false, "error": "parameter validation error" })  
      } else {
        knex('groceries').where('id', params.id).del()
          .then(function() {
            res.send({ "success": true })
          })
          .catch(function() {
            res.send({ "success": false, "error": "database error"})
          });
      }
    }); 


}



