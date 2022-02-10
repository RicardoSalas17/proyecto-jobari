const Custumer = require("../models/Custumer.model");
const Session = require("../models/Session.model");


exports.createCustumer = async (req, res) => {
    const { 
        custumername,
        phone,
        email,
        direction
              } = req.body
            
              if (!req.headers.authorization) {
                return res.json(null);
              }
              const accessToken = req.headers.authorization;
             const custumer = await Custumer.create({
                custumername:custumername,
                phone:phone,
                email:email,
                direction:direction,
              });
              Session.findById(accessToken)
              .populate("user")
              .then((session) => {
                if (!session) {
                  return res.status(404).json({ errorMessage: "Session does not exist" });
                }
                res.status(201).json(session)
                //return 
              });
  };
  exports.getAllCustumers = async (req, res) => {
    const Custumers = await Custumer.find()
    res.status(200).json({Custumers});
  };