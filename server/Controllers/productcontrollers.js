const Products = require("../models/Product.model");

exports.createProduct = async (req, res) => {
    const {
        name,
        clave,
        qualityExams,
        //MP
              } = req.body
            
              const Product = await Products.create({
                name:name,
                clave:clave,
                qualityExams:qualityExams,
                //MP:MP
              });
              res.status(201).json(Product)
  };

  exports.getAllProducts = async (req, res) => {
    const AllProducts = await Products.find()
    res.status(200).json({ AllProducts });
  };

  exports.getProduct = async (req, res) => {
    const { id } = req.params;
    const product = await Products.findById(id)
   res.status(200).json(product);
  };