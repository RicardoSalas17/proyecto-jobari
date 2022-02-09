const Routes = require("../models/Route.model");

exports.createRoute = async (req, res) => {
    const {
        locations,
        date,
        clients,
        orders,
              } = req.body
             const Route = await Routes.create({
                locations:locations,
                date:date,
                clients:clients,
                orders:orders
              });
              res.status(201).json(Route)
  };

  exports.getAllRoute = async (req, res) => {
    const AllRoutes = await Routes.find().populate({
      path:"clients"}).populate({
        path:"orders"})
    res.status(200).json({ AllRoutes });
  };

  exports.getRoute = async (req, res) => {
    const { id } = req.params;
    const route = await Routes.findById(id).populate({
      path:"clients"}).populate({
        path:"orders"})
   res.status(200).json(route);
  };