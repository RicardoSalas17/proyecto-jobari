const router = require('express').Router();
const {
    createProduct,

} = require("../Controllers/productcontrollers");


router.post("/new-product", createProduct);

module.exports = router;