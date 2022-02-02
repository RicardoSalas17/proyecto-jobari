const Route = require("../models/Route.model");

exports.createRoute = async (req, res) => {
    const {
        orderNumbers,
        date,
        dates,
              } = req.body
            
              const Route = await Route.create({
                namorderNumberse:orderNumbers,
                date:date,
                dates:dates,
              });
              res.status(201).json(Route)
              console.log(req.body)
  };

  exports.getAllRoute = async (req, res) => {
    const AllRoutes = await Route.find()
    res.status(200).json({ AllRoutes });
  };

  exports.getRoute = async (req, res) => {
    const { id } = req.params;
    const route = await Route.findById(id)
   res.status(200).json(route);
  };