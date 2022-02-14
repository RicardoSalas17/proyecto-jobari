const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      // unique: true -> Ideally, should be unique, but its up to you
    },
    apellidoPat: {
      type: String,
      required: true 
    },
    apellidoMat: {
        type: String,
        required: true 
      },
    mail: {
        type: String,
        required: true,
        unique: true,
        active: true
      },  
    password: String,
    role: {
      type: String,
      required: true,
      enum: ["Calidad","Mantenimiento","Gerencia","Administración", "Producción","Sistema","I&D", "Gestión de calidad", "Ventas", "Embarques", "Sistemas", "ADMIN-AP"],
    },
    clientes:[{
      type: Schema.ObjectId,
      ref: "Custumer"
    }],
    rutas:[{
      type: Schema.ObjectId,
      ref: "Route"
    }],
    productos:[{
      type: Schema.ObjectId,
      ref: "Product"
    }],
    ordenes:[{
      type: Schema.ObjectId,
      ref: "Order"
    }],
    empaques:[{
      type: Schema.ObjectId,
      ref: "Package"
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

const User = model("User", userSchema);

module.exports = User;
