const Order = require("../models/Order.model")

exports.createOrder = async (req, res) => {
    const {
        orderNumber,
        client,
        product,
        monto,
        dateUP
              } = req.body

              const ORDER = await Order.create({
                orderNumber:orderNumber,
                client:client,
                product:product,
                monto:monto,
                dateUP:dateUP,
                status:"open"
              });
              res.status(201).json(ORDER)
  };

  exports.getAllOrders = async (req, res) => {
    const ORDERS = await Order.find()
    .populate({
      path:"client"})
      
    res.status(200).json({ ORDERS });
  };

  exports.getOrder = async (req, res) => {
    const { id } = req.params;
   // console.log(id)
    const order = await Order.findById(id).populate("client")
    /* const match = await Match.findById(id).populate("owner").populate("players").populate("teams")
    .populate({
    path:"comments",
    populate:{ 
    path: "owner",
    model:"User",
    }})*/
    
    res.status(200).json(order);
  };