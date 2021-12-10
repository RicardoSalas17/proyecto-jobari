const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const packageSchema = new Schema(
  {
    name: {
        type: String,
        unique: true
      },
    clave: {
        type: String,
        unique: true
      },
    providers:{
        type: Array
    },
    amountStock:{
        type: Number,
    },

    lotes:{
        type: Array
    },

    capacity:{
        type:Number
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Package = model("Package", packageSchema);

module.exports = Package;
