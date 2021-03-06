const { Pizza } = require('../models');

const pizzaController = {
    // get all pizzas
    getAllPizza(req, res) {
        Pizza.find({})
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    //get one Pizza by id
    getPizzaById({ params }, res) {
        Pizza.findOne({ _id: params.id })
          .then(dbPizzaData => {
            //send 404 for no id
            if(!dbPizzaData) {
                res.status(404).json({ message: 'no pizza found with this id'});
                return;
            }
            res.json(dbPizzaData);
          })
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
    },
    createPizza({ body }, res) {
      Pizza.create(body)
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => res.status(400).json(err));
    },
    updatePizza({ params, body }, res) {
      Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then(dbPizzaData => {
            if(!dbPizzaData) {
              res.status(404).json({ message: 'o pizza found with this id' });
              return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.status(400).json(err));
    },
    //delete pizza
    deletePizza({ params }, res) {
      Pizza.findOneAndDelete({ _id: params.id })
        .then(dbPizzaData => {
          if (!dbPizzaData) {
            res.status(404).json({ message: 'no pizza found with this id' });
            return;
          }
          res.json(dbPizzaData);
        })
        .catch(err => res.status(400).json(err));
    }
};

module.exports = pizzaController;