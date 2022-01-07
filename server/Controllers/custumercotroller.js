const Custumer = require("../models/Custumer.model");

exports.createCustumer = async (req, res) => {
    const { 
        custumername,
        phone,
        email,
        direction
              } = req.body
            
              const custumer = await Custumer.create({
                custumername:custumername,
                phone:phone,
                email:email,
                direction:direction,
              });
              res.status(201).json(custumer)
  };
  exports.getAllCustumers = async (req, res) => {
    const Custumers = await Custumer.find()
    res.status(200).json({Custumers});
  };