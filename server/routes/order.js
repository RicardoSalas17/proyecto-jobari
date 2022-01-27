const router = require('express').Router();
const {
createOrder,
getAllOrders,
getOrder
} = require("../Controllers/ordercontrollers");


router.post("/new-order", createOrder);
router.get("/get-allorders", getAllOrders);
router.get("/order-detail/:id", getOrder);

module.exports = router;