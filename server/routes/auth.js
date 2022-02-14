const router = require("express").Router();

// ℹ️ Handles password encryption
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

// How many rounds should bcrypt run the salt (default [10 - 12 rounds])
const saltRounds = 10;

// Require the User model in order to interact with the database
const User = require("../models/User.model");
const Session = require("../models/Session.model");

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/session", (req, res) => {
  // we dont want to throw an error, and just maintain the user as null
  if (!req.headers.authorization) {
    return res.json(null);
  }

  // accessToken is being sent on every request in the headers
  const accessToken = req.headers.authorization;
//console.log("token",accessToken)
  Session.findById(accessToken)
    .populate("user")
    .then((session) => {
      if (!session) {
        return res.status(404).json({ errorMessage: "Session does not exist" });
      }
      return res.status(200).json(session);
    });
});

router.post("/signup", isLoggedOut, (req, res) => {
  const { 
    username, 
    password ,
    apellidoPat,
    apellidoMat,
    mail,
    role,
    author } = req.body;

  if (!username || !password || !apellidoMat || !apellidoPat || !mail || !role ) {
    return res
      .status(400)
      .json({ errorMessage: "Por favor complea todos los campos." });
  }
/*
  if (password.length < 8) {
    return res.status(400).json({
      errorMessage: "Your password needs to be at least 8 characters long.",
    });
  }*/

  //   ! This use case is using a regular expression to control for special characters and min length
  
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

  if (!regex.test(password)) {
    return res.status(400).json( {
      errorMessage:
        "La contseña necesita tener 8 caracteres y debe contener por lo menos un numero, una minuscula y una mayuscula.",
    });
  }


  // Search the database for a user with the username submitted in the form
  User.findOne({ mail }).then((found) => {
    // If the user is found, send the message username is taken
    if (found) {
      return res.status(400).json({ errorMessage: `El correo : ${mail} ya existe` });
    }

    // if user is not found, create a new user - start with hashing the password
    return bcrypt
      .genSalt(saltRounds)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hashedPassword) => {
        // Create a user and save it in the database
        return User.create({
          username,
          password: hashedPassword,
          apellidoPat,
          apellidoMat,
          mail,
          role
          //author
        });
      })
      .then((user) => {
        Session.create({
          user: user._id,
          createdAt: Date.now(),
        }).then((session) => {
          res.status(201).json({ user, accessToken: session._id });
        });
      })
      .catch((error) => {
        if (error instanceof mongoose.Error.ValidationError) {
          return res.status(400).json({ errorMessage: error.message });
        }
        if (error.code === 11000) {
          return res.status(400).json({
            errorMessage:
              "El correo debe de ser unico. Este coreo ya existe.",
          });
        }
        return res.status(500).json({ errorMessage: error.message });
      });
  });
});

router.post("/login", isLoggedOut, (req, res, next) => {
  const { mail, password } = req.body;
  if (!mail) {
    return res
      .status(400)
      .json({ errorMessage: "Por favor, introduce tu e-mail" });
  }
  // Here we use the same logic as above
  // - either length based parameters or we check the strength of a password
  if (password.length < 8) {
    return res.status(400).json({
      errorMessage: "La contraseña debe de tener minimo 8 caracteres.",
    });
  }

  // Search the database for a user with the username submitted in the form
  User.findOne({mail})
    .then((user) => {
      // If the user isn't found, send the message that user provided wrong credentials
      if (!mail) {
        return res.status(400).json({ errorMessage: "Por favor introduce el E-mail" });
      }
      // If user is found based on the username, check if the in putted password matches the one saved in the database
      bcrypt.compare(password, user.password).then((isSamePassword) => {
        if (!isSamePassword) {
          console.log("password",isSamePassword)
          console.log("usrpass", user.password)
          return res.status(400).json({ errorMessage: "Contraseña incorrecta." });
        }
        Session.create({ user: user._id, createdAt: Date.now() }).then(
          (session) => {
            return(
            res.json({ user, accessToken: session._id })
            )
          }
        );
      });
    }
    )
    .catch((err) => {
      User.findOne({mail})
      .then((user) => {
        user ===null && res.status(400).json({ errorMessage: "E-mail no existe" }); })
      // in this case we are sending the error handling to the error handling middleware that is defined in the error handling file
      // you can just as easily run the res.status that is commented out below
      .catch((err)=>{
      next(err);
      return res.status(500).render("login", { errorMessage: err.message });
      })
    });
});



router.delete("/logout", isLoggedIn, (req, res) => {
  Session.findByIdAndDelete(req.headers.authorization)
    .then(() => {
      res.status(200).json({ message: "User was logged out" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ errorMessage: err.message });
    });
});

module.exports = router;
