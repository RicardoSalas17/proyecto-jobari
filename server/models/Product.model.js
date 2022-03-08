const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const productSchema = new Schema(
  {
    name: {
        type: String,
        unique: true
      },
    clave: {
        type: String,
        unique: true
      },
    clients:[{
      type: Schema.ObjectId,
      ref: "Custumer"
    }],
    amountStock:{
        type: Number,
    },

    lotes:{
        type: Array
    },
    qualityExams:{
        type: Array
    },
    MP:[{
      type: Schema.ObjectId,
      ref: "PrimeMateria"
    }],
    productMP:[{
      type: Schema.ObjectId,
      ref: "Product"
    }],
    orders:[{
      type: Schema.ObjectId,
      ref: "Order"
    }],
    author:{
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    MPfor:[{
      type: Schema.ObjectId,
      ref: "PrimeMateria"
    }],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Product = model("Product", productSchema);

module.exports = Product;
