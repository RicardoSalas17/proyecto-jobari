const Product = require("../models/Product.model");

exports.createProduct = async (req, res) => {
    const {
        name,
        clave,
        qualityExams,
        MP:MP
              } = req.body
            
              const Product = await Product.create({
                name:name,
                clave:clave,
                qualityExams:qualityExams,
                MP:MP
              });
              res.status(201).json(Product)
  };