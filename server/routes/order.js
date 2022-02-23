const router = require('express').Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const {
createOrder,
getAllOrders,
getOrder
} = require("../Controllers/ordercontrollers");


router.post("/new-order",isLoggedIn, createOrder);
router.get("/get-allorders",isLoggedIn, getAllOrders);
router.get("/order-detail/:id",isLoggedIn, getOrder);

module.exports = router;