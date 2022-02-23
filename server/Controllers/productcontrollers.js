const Products = require("../models/Product.model");
const User = require("../models/User.model");
const PrimeMateria = require("../models/Mp.model");
const mongoose = require("mongoose");

exports.createProduct = async (req, res) => {
  //console.log(req.body)
  const {
      name,
      clave,
      qualityExams,
      MP,
      productMP,
      author
              } = req.body

              if(name===""||!clave||qualityExams.length===0)
              { return res.status(400).json({ errorMessage: "Por favor, llena todos los campos."});}
              const gettingIDs=(setData)=> {if(setData.length > 1){
                const listID=setData.map((data, indx) =>
                {
                  if((data.clave===0)&&(data.porcentaje==="0" || data.porcentaje === 0))
                  { return res.status(400).json({ errorMessage: "Por favor, llena todos los campos de las materia primas."});}
                  if(data.clave===0)
                  {  return res.status(400).json({ errorMessage: "Por favor, llena las claves de las materias primas."});}
                  if(data.porcentaje === "0"  || data.porcentaje === 0)
                  { return res.status(400).json({ errorMessage: "Por favor, llena los porcentajes de las materias primas."});}
                  return data.id
                 })
                 return listID
               }
               return [setData[0].id]
             }
              
              //MP
              if(MP.length === 1 &&( MP[0].porcentaje === "0"  || MP[0].porcentaje === 0))
              { return res.status(400).json({ errorMessage: "Por favor, llena los campos de materia prima."});}
              if(MP.length === 1 && MP[0].clave===0)
              { return res.status(400).json({ errorMessage: "Por favor, llena la clave de la MP."});}
              if(MP.length === 1 &&( MP[0].porcentaje === "0"  || MP[0].porcentaje === 0))
              { return res.status(400).json({ errorMessage: "Por favor, llena el porcentajes de la MP."});}
              const MPID=gettingIDs(MP)

              
              //PRODUCT
              let productID = ""
              if(productMP.length === 1 && productMP[0].clave===0&&productMP[0].porcentaje === 0) {
                productID=[]
              }
              else {
                if(productMP.length === 1 && productMP[0].clave===0&&productMP[0].porcentaje > 0)
                { return res.status(400).json({ errorMessage: "Por favor, llena la clave del productos MP."});}
                if(productMP.length === 1 &&( productMP[0].porcentaje === "0"  || productMP[0].porcentaje === 0)&& productMP[0].clave!=0)
                { return res.status(400).json({ errorMessage: "Por favor, llena el porcentajes del producto MP."});}
                productID=gettingIDs(productMP)
              }
              
              Products.findOne({ clave, name }).then((found) => {
              // If the custumer is found, send the message custumer is taken
              if (found) {
                return res.status(400).json({ errorMessage: "Esta clave ya existe."});
              }
            // if product is not found, create a new custumer
          const product =Products.create({
            name:name,
            clave:clave,
            qualityExams:qualityExams,
            MP:MPID,
            productMP:productID,
            author:author
          })
          .then(async (product) => {

            console.log("PRODUCT",product)
            //MP updated        
                 product.MP.map(async (data, indx) => {
                  await PrimeMateria.findByIdAndUpdate(
                    MPID[indx],
                  { $push: { products:[ product._id] } },
                  { new: true }
                )
                });


            //Product updates
          
                if(product.productMP.length>0){
            product.productMP.map(async (data, indx) => {
              await Products.findByIdAndUpdate(
                productID[indx],
              { $push: { MPfor:[ product._id] } },
              { new: true }
            )
            });
          }

            //USER updated
            const userUpdated = await User.findByIdAndUpdate(
              author,
              { $push: { productos: product._id } },
              { new: true }
            )
            
            return res.status(201).json({product});
                }).catch((error) => {
                if (error instanceof mongoose.Error.ValidationError) {
                  return res.status(400).json({ errorMessage: error.message });
                }
                if (error.code === 11000) {
                  return res.status(400).json({
                    errorMessage:
                      "El producto ya existe"
                  });
                }
                return res.status(500).json({ errorMessage: error.message });
              });
            });
          }
  exports.getAllProducts = async (req, res) => {
    const AllProducts = await Products.find()
    res.status(200).json({ AllProducts });
  };

  exports.getProduct = async (req, res) => {
    const { id } = req.params;
    const product = await Products.findById(id)
   res.status(200).json(product);
  };