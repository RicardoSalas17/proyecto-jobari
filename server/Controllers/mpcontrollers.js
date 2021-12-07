const PrimeMateria = require("../models/Mp.model");

exports.createMP = async (req, res) => {
    const {
        name,
        clave,
        qualityExams
              } = req.body

              const MP = await PrimeMateria.create({
                name:name,
                clave:clave,
                qualityExams:qualityExams,
              });
              res.status(201).json(MP)
  };

  exports.getAllMP = async (req, res) => {
    const MP = await PrimeMateria.find()
    res.status(200).json({ MP });
  };