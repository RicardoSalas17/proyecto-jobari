const Custumer = require("../models/Custumer.model");
const Session = require("../models/Session.model");


exports.createCustumer = async (req, res) => {
    const { 
        custumername,
        phone,
        email,
        direction
              } = req.body

              await Session.findById(req.headers.authorization)
              .populate("user")
              .then((session) => {
                if (!session) {
                  return res.status(404).json({ errorMessage: "Session does not exist" });
                }
                if(custumername ===""||phone===""|| email===""){
                  return res.status(400).json({ errorMessage: "Por favor, llena todos los campos"});
                }
                if(direction ==="" &&custumername != ""&& phone!= ""&& email!= ""){
                  return res.status(400).json({errorMessage:"Asegurate de que en el map se muestre el marcador llenando solo el campo direccion"});
                }
                Custumer.findOne({ custumername }).then((found) => {
                  // If the custumer is found, send the message username is taken
                  if (found) {
                    return res.status(400).json({ errorMessage: "El nombre del cliete ya existe."});
                  }
                  // if custumer is not found, create a new user - start with hashing the password
                const custumer = Custumer.create({
                  custumername:custumername,
                  phone:phone,
                  email:email,
                  direction:direction,
                })
                .then((custumer) => {
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
              )
            }


  exports.getAllCustumers = async (req, res) => {
    const Custumers = await Custumer.find()
    res.status(200).json({Custumers});
  };