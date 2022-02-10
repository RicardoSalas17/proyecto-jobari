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
              const accessTokens = req.headers.authorization;
             const custumer = await Custumer.create({
                custumername:custumername,
                phone:phone,
                email:email,
                direction:direction,
              });
              Session.findById(accessTokens)
              .populate("user")
              .then((user) => {
                if (!user) {
                  return res.status(404).json({ errorMessage: "user does not exist" });
                }
                res.status(201).json({user, accessToken : accessTokens})
              });
  };
  exports.getAllCustumers = async (req, res) => {
    const Custumers = await Custumer.find()
    res.status(200).json({Custumers});
  };