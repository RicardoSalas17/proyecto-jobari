const Order = require("../models/Order.model")
const Products = require("../models/Product.model");
const User = require("../models/User.model");
const Package = require("../models/Package.model");
const Custumer =require("../models/Custumer.model");
const mongoose = require("mongoose");


exports.createOrder = async (req, res) => {
    const {
        orderNumber,
        client,
        products,
        author
              } = req.body
if(orderNumber===""||client===""|| products[0].claveProduct=== 0 || products[0].cantidad === 0 ||products[0].package=== 0|| products[0].amount===0 )
{ cont = false
  return res.status(400).json({ errorMessage: "Por favor, llena todos los campos."});}

const gettingIDs=(setData)=> {
  if(setData.length > 1){
  const listID=setData.map((data, indx) =>
  { 
    if(data.claveProduct===0&& data.cantidad === 0&&data.package === ""&&data.amount === 0)
    { cont = false
      return res.status(400).json({ errorMessage: "Por favor, llena todos los campos de los productos."});}   
    else if(data.claveProduct===0&& data.cantidad > 0&&data.package !== ""&&data.amount > 0)
    { cont = false
      return res.status(400).json({ errorMessage: "Por favor, llena todos las claves de los productos."});}
    else if(data.claveProduct!==0&& data.cantidad === 0 &&data.package !== ""&&data.amount > 0)
    { cont = false
      return res.status(400).json({ errorMessage: "Por favor, llena todas las cantidades de los productos."});}
     else if(data.claveProduct!==0 && data.cantidad > 0&&data.package === ""&&data.amount > 0)
    { cont = false
      return res.status(400).json({ errorMessage: "Por favor, llena todos los empaques de los productos."});}
     else if(data.claveProduct!==0 && data.cantidad > 0&&data.package !== ""&&data.amount === 0)
    { cont = false
      return res.status(400).json({ errorMessage: "Por favor, llena todos los montos de los productos."});}
     else if(data.claveProduct===0 || data.cantidad === 0|| data.package === ""||data.amount === 0)
    { cont = false
      return res.status(400).json({ errorMessage: "Por favor, llena todos los campos de los productos solicitados."});}
     total += data.amount
     return data
    })
   return listID
 }
  total = setData[0].amount
 return [setData[0]]
}

let cont = true
let productID = ""
let total = 0
if(products.length === 1 && products[0].claveProduct===0&&products[0].cantidad === 0&&products[0].package === ""&&products[0].amount === 0) {
  cont = false
  return res.status(400).json({ errorMessage: "Por favor, llena todos los campos de los productos."});
}
else {
  if(products.length === 1 && products[0].claveProduct===0&& products[0].cantidad > 0&&products[0].package !== ""&&products[0].amount > 0)
  { cont = false
    return res.status(400).json({ errorMessage: "Por favor, llena la clave del producto."});}
  else if(products.length === 1 && products[0].claveProduct !== 0  &&products[0].cantidad === 0&&products[0].package !== ""&&products[0].amount > 0)
  { cont = false
    return res.status(400).json({ errorMessage: "Por favor, llena la cantidad del producto ."});}
  else if(products.length === 1 && products[0].claveProduct !== 0  && products[0].cantidad > 0&&products[0].package === ""&&products[0].amount > 0)
  { cont = false
    return res.status(400).json({ errorMessage: "Por favor, llena el empáque del producto."});}
  else if(products.length === 1 && products[0].claveProduct !== 0  && products[0].cantidad > 0&&products[0].package !== ""&&products[0].amount ===0)
  { cont = false
    return res.status(400).json({ errorMessage: "Por favor, llena el monto del producto."});}
 else { productID=gettingIDs(products)
}
}

if(cont){
Order.findOne({ orderNumber }).then((found) => {
// If the custumer is found, send the message custumer is taken
if (found) {
  return res.status(400).json({ errorMessage: "Este numero ya existe."});
}
//console.log("productID",productID)
// if product is not found, create a new custumer
const order =Order.create({
  orderNumber:orderNumber,
  client:client,
  products:productID,
  total:total,
  author:author,
  status:"Open"
})
.then(async (order) => {
//Product updated        
   order.products.map(async (data, indx) => {
    await Products.findByIdAndUpdate(
      order.products[indx].claveProduct,
    { $push: { orders:[ order._id] } },
    { new: true }
  )
  });


//Package updates
order.products.map(async (data, indx) => {
  //console.log("data",data)
  await Package.findByIdAndUpdate(
    order.products[indx].package,
  { $push: { orders:[ order._id] } },
  { new: true }
)
});

//Custummer updates

const custumerUpdated = async()=> await Custumer.findByIdAndUpdate(
  client,
  { $push: { orders: order._id } },
  { new: true }
  )
  custumerUpdated()

//USER updated
const userUpdated = await User.findByIdAndUpdate(
author,
{ $push: { orders: order._id } },
{ new: true }
)

return res.status(201).json({order});
  }).catch((error) => {
  if (error instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({ errorMessage: error.message });
  }
  if (error.code === 11000) {
    return res.status(400).json({
      errorMessage:
        "Este numero de orden ya existe"
    });
  }
  return res.status(500).json({ errorMessage: error.message });
});
});
 }

  };

  exports.getAllOrders = async (req, res) => {
    const ORDERS = await Order.find()
    .populate({
      path:"client"}).populate([        { 
        path: 'products',
        populate: 
       [  { path: 'claveProduct',
          model: 'Product'}]
         
     }])
      
    res.status(200).json({ ORDERS });
  };

  exports.getOrder = async (req, res) => {
    const { id } = req.params;
    const order = await Order.findById(id).populate("client").populate([{ 
      path: 'products',
      populate: 
     [  { path: 'claveProduct',
        model: 'Product'}]
   }])
   .populate([{ 
    path: 'products',
    populate: 
   [  { path: 'package',
      model: 'Package'}]
 }])
    res.status(200).json(order);
  };