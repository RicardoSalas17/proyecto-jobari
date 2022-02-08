const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const routeSchema = new Schema(
  {
      orderNumbers:{
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
  }]
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Route = model("Route", routeSchema);

module.exports = Route;