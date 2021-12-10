const router = require('express').Router();
const {
    createPackage,

} = require("../Controllers/packagecontrollers");


router.post("/new-package", createPackage);


module.exports = router;