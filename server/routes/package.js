const router = require('express').Router();
const {
    createPackage,
    getAllPackages

} = require("../Controllers/packagecontrollers");


router.post("/new-package", createPackage);
router.get("/get-allpackages", getAllPackages);


module.exports = router;