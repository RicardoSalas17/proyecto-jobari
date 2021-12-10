const Package = require("../models/Package.model");

exports.createPackage = async (req, res) => {
    const {
        name,
        clave,
        capacity,
        
              } = req.body
            
              const Packages = await Package.create({
                name:name,
                clave:clave,
                capacity:capacity
              });
              res.status(201).json(Packages)
              console.log(req.body)
  };

  exports.getAllPackages = async (req, res) => {
    const Packages = await Package.find()
    res.status(200).json({ Packages });
  };