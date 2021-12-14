const router = require('express').Router();
const {
    createProduct,
    getAllProducts
} = require("../Controllers/productcontrollers");


router.post("/new-product", createProduct);
router.get("/get-products", getAllProducts);

module.exports = router;