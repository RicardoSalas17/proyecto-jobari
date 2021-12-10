const Products = require("../models/Product.model");

exports.createProduct = async (req, res) => {
    const {
        name,
        clave,
        qualityExams,
        MP
              } = req.body
            
              const Product = await Products.create({
                name:name,
                clave:clave,
                qualityExams:qualityExams,
                MP:MP
              });
              res.status(201).json(Product)
              console.log(req.body)
  };

  exports.getAllProducts = async (req, res) => {
    const AllProducts = await Products.find()
    res.status(200).json({ AllProducts });
  };