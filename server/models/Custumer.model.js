const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const custumerSchema = new Schema(
  {
    custumername: {
      type: String,
      unique: true,

    },
    phone:{
      type:String
    },
    email:{
      type:String
    },
    direction: {
        type: Object,
      },
    products:{
        type: Array
    },
    productrequestactive:{
        type: Array
    },

    productrequest:{
        type: Array
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Custumer = model("Custumer", custumerSchema);

module.exports = Custumer;
