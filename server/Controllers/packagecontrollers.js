const Package = require("../models/Package.model");
const mongoose = require("mongoose");
const User = require("../models/User.model");

exports.createPackage = async (req, res) => {
    const {
        name,
        clave,
        capacity,
        author
              } = req.body
            
              if(name===""||clave===""||capacity===0)
              { return res.status(400).json({ errorMessage: "Por favor, llena todos los campos."});}


           Package.findOne({ clave, name }).then((found) => {
                // If the custumer is found, send the message custumer is taken
                if (found) {
                  return res.status(400).json({ errorMessage: "Esta clave ya existe."});
                }
              // if product is not found, create a new custumer
              const Packages =  Package.create({
                name:name,
                clave:clave,
                capacity:capacity,
                author:author
              })
            .then(async (packages) => {
  
              //USER updated
              const userUpdated = await User.findByIdAndUpdate(
                author,
                { $push: { productos: packages._id } },
                { new: true }
              )
              
              res.status(201).json(packages)
                  }).catch((error) => {
                  if (error instanceof mongoose.Error.ValidationError) {
                    return res.status(400).json({ errorMessage: error.message });
                  }
                  if (error.code === 11000) {
                    return res.status(400).json({
                      errorMessage:
                        "El empaque ya existe"
                    });
                  }
                  return res.status(500).json({ errorMessage: error.message });
                });
              });
  };

  exports.getAllPackages = async (req, res) => {
    const Packages = await Package.find()
    res.status(200).json({ Packages });
  };

  exports.getPackage = async (req, res) => {
    const { id } = req.params;
    const package = await Package.findById(id)
   res.status(200).json(package);
  };