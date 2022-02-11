const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      // unique: true -> Ideally, should be unique, but its up to you
    },
    ApellidoPat: {
      type: String,
      required: true 
    },
    ApellidoMat: {
        type: String,
        required: true 
      },
    Mail: {
        type: String,
        required: true
      },  
    password: String,
    role: {
      type: String,
      required: true,
      enum: ["Calidad","Mantenimiento","Gerencia","Administración", "Producción","Sistema","I&D", "Gestión de calidad", "Ventas", "Embarques", "Sistemas", "ADMIN-AP"],
    },
    Rutas:[{
      type: Schema.ObjectId,
      ref: "Route"
    }],
    Productos:[{
      type: Schema.ObjectId,
      ref: "Product"
    }],
    Ordenes:[{
      type: Schema.ObjectId,
      ref: "Order"
    }],
    Empaques:[{
      type: Schema.ObjectId,
      ref: "Package"
    }],
    Author:{
      type: Schema.Types.ObjectId,
      ref: "User"
    } 
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
