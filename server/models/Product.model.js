const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const productSchema = new Schema(
  {
    name: {
        type: String,
        unique: true
      },
    clave: {
        type: Number,
        unique: true
      },
    clients:{
        type: Array
    },
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
      type: Schema.Types.ObjectId,
      ref: "MP.model",
    }]
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Product = model("Product", productSchema);

module.exports = Product;
