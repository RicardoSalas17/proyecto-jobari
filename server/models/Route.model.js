const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const routeSchema = new Schema(
  {
      locations:{
     type: Array,
    },
    date:{
        type: String,
        unique: true
    },
    clients: [    {
      type: Schema.ObjectId,
     // require: true,
      ref: "Custumer"
  }],
  orders:[    {
    type: Schema.ObjectId,
   // require: true,
    ref: "Order"
}],
  },

  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Route = model("Route", routeSchema);

module.exports = Route;