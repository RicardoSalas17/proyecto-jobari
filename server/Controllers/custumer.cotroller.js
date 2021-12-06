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