const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const primeMateriaSchema = new Schema(
  {
    name: {
        type: String,
        unique: true
      },
    clave: {
        type: Number,
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
    qualityExams:{
        type: Array
    },
    author:{
      type: Schema.Types.ObjectId,
      ref: "User"
    } 
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const PrimeMateria = model("PrimeMateria", primeMateriaSchema);

module.exports = PrimeMateria;
