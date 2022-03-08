const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const orderSchema = new Schema(
  {
  orderNumber: {
        type: Number,
        unique: true
      },
    client:{
      type: Schema.Types.ObjectId,
      ref: "Custumer"
    },
    products:[
     {claveProduct: {
      type: Schema.ObjectId,
      ref: "Product"
    },
    package: {
      type: Schema.ObjectId,
      ref: "Package"
    },
    cantidad:{
      type:Number
    },
    amount:{
      type:Number
    }}
  ],
    total:{
      type:Number
  },
  author:{
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    status:{
      type:String
  }
  },

  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Order = model("Order", orderSchema);

module.exports = Order;
