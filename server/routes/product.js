const router = require('express').Router();
const {
    createProduct,
    getAllProducts,
    getProduct
} = require("../Controllers/productcontrollers");
const isLoggedIn = require("../middleware/isLoggedIn");


router.post("/new-product",isLoggedIn,createProduct);
router.get("/get-products",isLoggedIn,getAllProducts);
router.get("/product-detail/:id",isLoggedIn,getProduct);


module.exports = router;