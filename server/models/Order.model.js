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
    product:{
        type: Array
    },

    lote:{
        type: String
    },
    monto:{
        type:Number
    },
    dateUP:{
        type:Number
    },
    autor:{
        type:String
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
