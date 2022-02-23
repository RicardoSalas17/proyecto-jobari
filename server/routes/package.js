const router = require('express').Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const {
    createPackage,
    getAllPackages,
    getPackage
} = require("../Controllers/packagecontrollers");


router.post("/new-package",isLoggedIn,createPackage);
router.get("/get-allpackages",isLoggedIn,getAllPackages);
router.get("/package-detail/:id",isLoggedIn,getPackage);


module.exports = router;