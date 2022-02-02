const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const routeSchema = new Schema(
  {
      orderNumbers:{
      type: Schema.Types.ObjectId,
      ref: "Custumer"
    },
    date:{
        type: String
    },
    dates:{
        type: String
    }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Route = model("Route", routeSchema);

module.exports = Route;