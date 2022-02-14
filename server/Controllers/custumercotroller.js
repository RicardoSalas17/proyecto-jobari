const Custumer = require("../models/Custumer.model");
const mongoose = require("mongoose");
const User = require("../models/User.model");

exports.createCustumer = async (req, res) => {
  const { 
    custumername,
    phone,
    email,
    direction,
    cordinates,
    author
          } = req.body
  if(custumername ===""||phone===""|| email===""){
    return res.status(400).json({ errorMessage: "Por favor, llena todos los campos"});
  }
  if(cordinates ==="" &&custumername != ""&& phone!= ""&& email!= ""){
    return res.status(400).json({errorMessage:"Asegurate de que en el mapa se muestre el marcador llenando solo el campo direccion"});
  }
  Custumer.findOne({ custumername }).then((found) => {
    // If the custumer is found, send the message username is taken
    if (found) {
      return res.status(400).json({ errorMessage: "El nombre del cliete ya existe."});
    }
    Custumer.findOne({ email }).then((found) => {
      // If the custumer is found, send the message custumer is taken
      if (found) {
        return res.status(400).json({ errorMessage: "El correo del cliete ya existe."});
      }
    // if custumer is not found, create a new custumer
  const custumer =Custumer.create({
    custumername:custumername,
    phone:phone,
    email:email,
    direction:direction,
    cordinates:cordinates,
    author
  })
  .then(async(custumer) => {
    const userUpdated = await User.findByIdAndUpdate(
      author,
      { $push: { clientes: custumer._id } },
      { new: true }
    )
     return res.status(201).json({custumer});
        });
      })
      .catch((error) => {
        if (error instanceof mongoose.Error.ValidationError) {
          return res.status(400).json({ errorMessage: error.message });
        }
        if (error.code === 11000) {
          return res.status(400).json({
            errorMessage:
              "El cliente existe"
          });
        }
        return res.status(500).json({ errorMessage: error.message });
      });
  }
              )}
            
  exports.getAllCustumers = async (req, res) => {
    const Custumers = await Custumer.find()
    res.status(200).json({Custumers});
  };