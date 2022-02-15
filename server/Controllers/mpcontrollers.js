const PrimeMateria = require("../models/Mp.model");
const User = require("../models/User.model");

exports.createMP = async (req, res) => {
  const {
    name,
    clave,
    qualityExams,
    author
          } = req.body

  if(name ===""||clave===""){
    return res.status(400).json({ errorMessage: "Por favor, llena todos los campos"});
  }
  if(qualityExams.length === 0){
    return res.status(400).json({ errorMessage: "Por favor, selecciona las pruebas de calidad"});
  }

  PrimeMateria.findOne({ clave }).then((found) => {
    // If the custumer is found, send the message username is taken
    if (found) {
      return res.status(400).json({ errorMessage: "La clave ya existe."});
    }

  const Mp =PrimeMateria.create({
    name,
    clave,
    qualityExams,
    author
  })
  .then(async(Mp) => {
    const userUpdated = await User.findByIdAndUpdate(
      author,
      { $push: { mp: Mp._id } },
      { new: true }
    )
     return res.status(201).json({Mp});
        })
        .catch((error) => {
          if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({ errorMessage: error.message });
          }
          if (error.code === 11000) {
            return res.status(400).json({
              errorMessage:
                "Ya exise esta materia pima"
            });
          }
          return res.status(500).json({ errorMessage: error.message });
        });
      })
  }
              

  exports.getAllMP = async (req, res) => {
    const MP = await PrimeMateria.find()
    res.status(200).json({ MP });
  };

  exports.getMP = async (req, res) => {
    const { id } = req.params;
    const mp = await PrimeMateria.findById(id)
    /*.populate({
      path:"orders"}).populate({
        path:"products"}).populate({
          path:"rutes"})*/
   res.status(200).json(mp);
  };