const Products = require("../models/Product.model");
const PrimeMateria = require("../models/Mp.model");

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
              //console.log("porc",MP[0].porcentaje)
              //console.log("name",MP[0].claveMP)
             // console.log("vacioMP",MP.length === 1 && MP[0].claveMP===0&&MP[0].porcentaje===0)
             // console.log("vacioClave",MP.length === 1 && MP[0].claveMP===0)
              //console.log("vacioPorcentaje",MP.length === 1 && MP[0].porcentaje===0)

              const gettingIDs=(setData)=> {if(setData.length > 1){
                const listID=setData.map((data, indx) =>
                {
                  if((data.clave===0)&&(data.porcentaje==="0" || data.porcentaje === 0))
                  { return res.status(400).json({ errorMessage: "Por favor, llena todos los campos de las materia prima"});}
                  if(data.clave===0)
                  {  return res.status(400).json({ errorMessage: "Por favor, llena las claves de las ssssetData"});}
                  if(data.porcentaje === "0"  || data.porcentaje === 0)
                  { return res.status(400).json({ errorMessage: "Por favor, llena los porcentajes de las setwwwData"});}
                  return data.id
                 })
                 return listID
               }
               return setData[0].id
             }
              
              
              if(MP.length === 1 &&( MP[0].porcentaje === "0"  || MP[0].porcentaje === 0))
              { return res.status(400).json({ errorMessage: "Por favor, llena los campos de materia prima"});}
              if(MP.length === 1 && MP[0].clave===0)
              { return res.status(400).json({ errorMessage: "Por favor, llena la clave de la MP"});}
              if(MP.length === 1 &&( MP[0].porcentaje === "0"  || MP[0].porcentaje === 0))
              { return res.status(400).json({ errorMessage: "Por favor, llena el porcentajes de la MP"});}
              
              const MPID=gettingIDs(MP)



              console.log('MPID: ', MPID);
              const productID=gettingIDs(productMP)
              console.log('productID: ', productID);

              //PRODUCT
              if(productMP.length === 1 && productMP[0].claveMP===0)
              { return res.status(400).json({ errorMessage: "Por favor, llena la clave del productos MP"});}
              if(productMP.length === 1 &&( productMP[0].porcentaje === "0"  || productMP[0].porcentaje === 0))
              { return res.status(400).json({ errorMessage: "Por favor, llena el porcentajes del producto MP"});}






 
            /*
              const Product = await Products.create({
                name:name,
                clave:clave,
                qualityExams:qualityExams,
                //MP:MP
              });
              res.status(201).json(Product)*/
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