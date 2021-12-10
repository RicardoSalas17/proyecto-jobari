const Custumer = require("../models/Custumer.model");

exports.createCustumer = async (req, res) => {
    const { 
        custumername,
        direction
              } = req.body
            
              const custumer = await Custumer.create({
                custumername:custumername,
                direction:direction,
              });
              res.status(201).json(custumer)
  };
  exports.getAllCustumers = async (req, res) => {
    const Custumers = await Custumer.find()
    res.status(200).json({Custumers});
  };