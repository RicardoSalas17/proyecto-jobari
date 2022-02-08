const Routes = require("../models/Route.model");

exports.createRoute = async (req, res) => {
    const {
        orderNumbers,
        date,
        clients
              } = req.body
             const Route = await Routes.create({
                namorderNumberse:orderNumbers,
                date:date,
                clients:clients
              });
              res.status(201).json(Route)
  };

  exports.getAllRoute = async (req, res) => {
    const AllRoutes = await Routes.find().populate({
      path:"clients"})
    res.status(200).json({ AllRoutes });
  };

  exports.getRoute = async (req, res) => {
    const { id } = req.params;
    const route = await Routes.findById(id)
   res.status(200).json(route);
  };