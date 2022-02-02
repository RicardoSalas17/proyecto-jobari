const router = require('express').Router();
const {
    createProduct,
    getAllProducts,
    getProduct
} = require("../Controllers/productcontrollers");


router.post("/new-product", createProduct);
router.get("/get-products", getAllProducts);
router.get("/product-detail/:id", getProduct);


module.exports = router;