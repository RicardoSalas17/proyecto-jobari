const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const custumerSchema = new Schema(
  {
    custumername: {
      type: String,
      unique: true,
    },
    phone:{
      type:String,
      unique: true
    },
    email:{
      type:String
    },
    direction: {
        type: Object,
      },
      cordinates: {
        type: Object,
      },
      orders:[{
        type: Schema.ObjectId,
        ref: "Order"
      }],
      products:[{
        type: Schema.ObjectId,
        ref: "Product"
      }],
      rutes:[{
        type: Schema.ObjectId,
        ref: "Route"
      }],
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

const Custumer = model("Custumer", custumerSchema);

module.exports = Custumer;
